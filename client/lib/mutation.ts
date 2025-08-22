import fetcher from "./fetcher";

export const auth = (
  mode: "signin" | "signup",
  body: {
    email: string;
    password: string;
    name?: string;
    role?: string;
  }
) => {
  const url = mode === "signin" ? "/auth/login" : "/auth/register";
  return fetcher(url, body);
};
