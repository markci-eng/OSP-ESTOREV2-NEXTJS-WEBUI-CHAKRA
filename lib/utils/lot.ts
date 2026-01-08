export async function fetchLot(lotCode: string) {
  // Use HTTP locally, HTTPS in production
  const isDev = process.env.NODE_ENV === "development";
  const protocol = isDev ? "http" : "https";
  const host = "localhost:5116"; // change if your prod host differs

  const url = `${protocol}://${host}/api/Lots/${lotCode}`;
  console.log(`[fetchLot] Fetching: ${url}`);

  // Dev-only: allow self-signed certificates
  if (isDev) {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  }

  const res = await fetch(url, {
    method: "GET",
    cache: "no-store", // server-side fetch, no caching
  });

  console.log(`[fetchLot] Response status: ${res.status}`);

  if (res.status === 404) {
    throw new Error("NOT_FOUND");
  }

  if (!res.ok) {
    throw new Error(`Failed to fetch product (${res.status})`);
  }

  const data = await res.json();
  console.log("[fetchLot] Fetched lot:", data);
  return data;
}
