export default async function fetcher<TResponse, TRequest = undefined>(
  url: string,
  data?: TRequest,
  method: string = data ? "POST" : "GET"
): Promise<TResponse> {
  const backendUrl = "http://localhost:3001";
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const config: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  };
  if (data && method !== "GET" && method !== "HEAD" && method !== "DELETE") {
    config.body = JSON.stringify(data);
  }

  const res = await fetch(`${backendUrl}${url}`, config);

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.error || "Network response was not ok");
  }

  return res.json() as Promise<TResponse>;
}
