const CACHE_NAME = "OSP-ESTORE-CACHE-v1";
const DB_NAME = "OSP-ESTORE-DB";
const DB_VERSION = 1;
const DB_STORE_NAME = "OSP-ESTORE-STORE";

let requestQueueSyncing = false;
let requestQueueProcessed = false;

async function cacheCoreAssets() {
  const cache = await caches.open(CACHE_NAME);
  return await cache.addAll([
    "/",
    "/login",
    "/video/hero-bg-video.mp4",
    "/images/chapel1.jpg",
    "/images/chapel2.jpg",
    "/images/chapel3.jpg",
    "/images/chapel4.jpg",
    "/images/memorial-park-1.jpg",
    "/images/memorial-park-2.jpg",
    "/images/claim-benefits.jpg",
    "/images/request-service.jpg",
  ]);
}

self.addEventListener("install", (event) => {
  event.waitUntil(cacheCoreAssets());
  self.skipWaiting();
});

async function clearOldCaches() {
  const cacheNames = await caches.keys();
  return await Promise.all(
    cacheNames
      .filter((name) => name !== CACHE_NAME)
      .map((name_1) => caches.delete(name_1))
  );
}

self.addEventListener("activate", async (event) => {
  event.waitUntil(clearOldCaches());
  self.clients.claim();
});

function openDb() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      db.createObjectStore(DB_STORE_NAME, { keyPath: "url" });
    };
  });
}

async function addData(url, jsonData) {
  const db = await openDb();
  const transaction = db.transaction(DB_STORE_NAME, "readwrite");
  const store = transaction.objectStore(DB_STORE_NAME);

  const data = {
    url,
    response: JSON.stringify(jsonData),
  };

  const request = store.put(data);
  await new Promise((resolve, reject) => {
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

async function getData(url) {
  try {
    const db = await openDb();
    const transaction = db.transaction(DB_STORE_NAME, "readonly");
    const store = transaction.objectStore(DB_STORE_NAME);

    const request = store.get(url);

    const result = await new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });

    if (result && result.response) {
      return JSON.parse(result.response);
    }

    return null;
  } catch (error) {
    console.error("Error retrieving from IndexedDB:", error);
    return null;
  }
}

async function cacheFirstStrategy(request) {
  try {
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(request);

    if (cachedResponse) {
      return cachedResponse;
    }

    const networkResponse = await fetch(request);
    const responseClone = networkResponse.clone();
    await cache.put(request, responseClone);
    return networkResponse;
  } catch (error) {
    console.error("Cache first strategy failed:", error);
    return caches.match("/offline");
  }
}

async function networkFirstStrategy(request) {
  const clonedRequest = request.clone();
  let requestData;
  const requestBody = await clonedRequest.text();
  
  try {
    if (!requestQueueProcessed) {
      if(!requestQueueSyncing) {
        await processRequestQueue();
      }
      console.log("User is online, processing request queue");
      requestQueueProcessed = true;
    }
    const networkResponse = await fetch(request);

    if (networkResponse.ok) {
      const responseClone = networkResponse.clone();
      const responseData = await responseClone.json();
      await addData(request.url, responseData);
      return networkResponse;
    }

    throw new Error("Network response was not ok");
  } catch (error) {
    console.error("Network first strategy failed:", error);

    // Fallback to cached data if available
    requestQueueProcessed = false; // Reset the flag to allow re-processing when back online
    const cachedResponse = await getData(request.url);

    if (cachedResponse) {
      console.log("Using cached response:", cachedResponse);

      if (request.method === 'POST') {
        requestData = JSON.parse(requestBody);
        requestData.id = Date.now().toString();
        console.log("Adding new data to cache:", requestData);
        cachedResponse.push(requestData);
        await addData(request.url, cachedResponse);
        enqueueRequest({
          url: request.url,
          method: 'POST',
          body: JSON.stringify(requestData)
        });
        return new Response(JSON.stringify(requestData), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      } else if (request.method === 'PUT') {
        requestData = JSON.parse(requestBody);
        const index = cachedResponse.findIndex(item => item.id === requestData.id);
        if (index !== -1) {
          cachedResponse[index] = requestData;
          await addData(request.url, cachedResponse);
          enqueueRequest({
            url: request.url,
            method: 'PUT',
            body: JSON.stringify(requestData)
          });
          return new Response(JSON.stringify(requestData), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        }
      } else if (request.method === 'DELETE') {
        requestData = JSON.parse(requestBody);
        const filteredResponse  = cachedResponse.filter(item => item.id !== requestData.id);
        await addData(request.url, filteredResponse);
        enqueueRequest({
          url: request.url,
          method: 'DELETE',
          body: JSON.stringify(requestData)
        });
        return new Response(JSON.stringify(requestData), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }

      console.log("Returning cached response:", cachedResponse);
      return new Response(JSON.stringify(cachedResponse), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Return empty response if no cache is available
    return new Response("[]", { status: 200 });
  }
}


async function dynamicCaching(request) {
  const cache = await caches.open(CACHE_NAME);

  try {
    const response = await fetch(request);
    const responseClone = response.clone();
    await cache.put(request, responseClone);
    return response;
  } catch (error) {
    console.error("Dynamic caching failed:", error);
    console.log("Dynamic caching for:", request.url);
    console.log("Request method:", request);
    return caches.match(request);
  }
}

const enqueueRequest = async (request) => {
  const queue = await getData("request-queue") || [];
  queue.push(request);
  console.log("Enqueued request:", request);
  await addData("request-queue", queue);
};

const processRequestQueue = async () => {
  requestQueueSyncing = true;
  const queue = await getData("request-queue") || [];

  while (queue.length > 0) {
    const request = queue[0];
    console.log("Processing request:", request);
    try {
      await fetch(request.url, {
        method: request.method,
        headers: { "Content-Type": "application/json" },
        body: request.body,
      });
      queue.shift();
      await addData("request-queue", queue);
      console.log("Processed request:", request);
    } catch (error) {
      console.error("Failed to process request:", request, error);
      break;
    }
  }
  requestQueueSyncing = false;
}

self.addEventListener("online", async() => {
  console.log("Service worker detected online event");
  if (!requestQueueProcessed) {
    console.log("User is online, processing request queue");
    await processRequestQueue();
    requestQueueProcessed = true; // Set the flag to true so it doesn't run again
  }
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (url.pathname.startsWith("/api/")) {
    event.respondWith(networkFirstStrategy(request));
  } else if (event.request.mode === "navigate") {
    event.respondWith(cacheFirstStrategy(request));
  } else {
    event.respondWith(dynamicCaching(request));
  }
});