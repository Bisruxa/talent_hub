import type { Response } from "express";
import type { AuthRequest } from "../middleware/auth.ts";
export declare const createJob: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getJobs: (req: AuthRequest, res: Response) => Promise<void>;
export declare const deletJob: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
