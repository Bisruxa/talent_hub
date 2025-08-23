import { SignJWT, type JWTPayload } from "jose";
import { createSecretKey } from "crypto";
import env from "../../env.js";

// Extend jose's JWTPayload with your custom fields
export interface MyJWTPayload extends JWTPayload {
  id: string;
  email: string;
  name: string;
  role: string;
}

export const generateToken = (payload: MyJWTPayload): Promise<string> => {
  const secret = env.JWT_SECRET;
  const secretKey = createSecretKey(secret, "utf-8");

  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(env.JWT_EXPIRES_IN || "7d")
    .sign(secretKey);
};
