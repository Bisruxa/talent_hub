import type { Response } from "express";
import type { AuthRequest } from "../middleware/auth.js";
export declare const applyForJob: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getMyApplications: (req: AuthRequest, res: Response) => Promise<void>;
