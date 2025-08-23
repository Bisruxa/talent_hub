import { z } from "zod";
export declare const createUserSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
    role: z.ZodDefault<z.ZodEnum<{
        employer: "employer";
        applicant: "applicant";
        admin: "admin";
    }>>;
}, z.core.$strip>;
export declare const createJobSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
}, z.core.$strip>;
export declare const createApplicationSchema: z.ZodObject<{
    jobId: z.ZodString;
    userId: z.ZodString;
    status: z.ZodDefault<z.ZodEnum<{
        applied: "applied";
        shortlisted: "shortlisted";
        rejected: "rejected";
    }>>;
}, z.core.$strip>;
export declare const loginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
