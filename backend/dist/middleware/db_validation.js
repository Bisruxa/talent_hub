import { z } from "zod";
// user
export const createUserSchema = z.object({
    name: z.string().min(2).max(50),
    email: z.string().email(),
    password: z.string().min(8),
    role: z.enum(["employer", "applicant", "admin"]).default("applicant"),
});
// job
export const createJobSchema = z.object({
    title: z.string().min(2).max(100),
    description: z.string().max(1000),
    // createBy: z.string().uuid(), 
});
// application
export const createApplicationSchema = z.object({
    jobId: z.string().uuid(),
    userId: z.string().uuid(),
    status: z.enum(["applied", "shortlisted", "rejected"]).default("applied"),
});
export const loginSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(1, "Password is required"),
});
//# sourceMappingURL=db_validation.js.map