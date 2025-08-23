import type { Request, Response, NextFunction } from "express";
import { jwtVerify } from "jose";
import env from '../../env.js';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    name: string;
    role: string; // add role
  };
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

    req.user = {
      id: (payload as any).id,
      email: (payload as any).email,
      name: (payload as any).name,
      role: (payload as any).role, 
    };

    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: "Invalid Token" });
  }
};

