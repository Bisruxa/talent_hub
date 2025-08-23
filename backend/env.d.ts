import { z } from "zod";
declare const envSchema: z.ZodObject<{
    NODE_ENV: z.ZodDefault<z.ZodEnum<{
        production: "production";
        test: "test";
        development: "development";
    }>>;
    APP_STAGE: z.ZodDefault<z.ZodEnum<{
        dev: "dev";
        production: "production";
        test: "test";
    }>>;
    PORT: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    HOST: z.ZodDefault<z.ZodString>;
    DATABASE_URL: z.ZodString;
    JWT_SECRET: z.ZodString;
    JWT_EXPIRES_IN: z.ZodDefault<z.ZodString>;
    BCRYPT_ROUNDS: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
}, z.core.$strip>;
export type Env = z.infer<typeof envSchema>;
declare let env: Env;
export declare const isProd: () => boolean;
export declare const isDev: () => boolean;
export declare const isTestEnv: () => boolean;
export { env };
export default env;
