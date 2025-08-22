export default async function fetcher<TResponse, TRequest = undefined>(
  url: string,
  data?: TRequest
): Promise<TResponse> {
  const backendUrl = "http://localhost:3001";
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const res = await fetch(`${backendUrl}${url}`, {
    method: data ? "POST" : "GET",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: data ? JSON.stringify(data) : undefined,
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.error || "Network response was not ok");
  }

  return res.json() as Promise<TResponse>;
}
