
export async function fetchTerms(lotCode: string, phase: number) {
  const url = `https://localhost:7274/api/Terms/${lotCode}/${phase}`;
  console.log("Fetching:", url);

  const res = await fetch(url, {
    method: 'GET',
  });

  if (!res.ok) throw new Error("Failed to fetch product");

  const data = await res.json();
  return data;
}