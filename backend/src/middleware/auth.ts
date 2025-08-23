import type { Request, Response, NextFunction } from "express";
import { jwtVerify, type JWTPayload } from "jose";
import env from "../env.js";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

// Define your custom payload type
interface MyJWTPayload extends JWTPayload {
  id: string;
  email: string;
  name: string;
  role: string;
}

export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("Auth middleware running, headers:", req.headers.authorization);
    const authHeader = req.headers.authorization;
    if (!authHeader)
      return res.status(401).json({ error: "Authorization header missing" });

    const token = authHeader.split(" ")[1];
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(env.JWT_SECRET)
    );

    // Type assertion with your custom interface
    const myPayload = payload as MyJWTPayload;

    req.user = {
      id: myPayload.id,
      email: myPayload.email,
      name: myPayload.name,
      role: myPayload.role,
    };

    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: "Invalid Token" });
  }
};
