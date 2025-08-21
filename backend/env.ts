import { env as loadEnv } from "custom-env";
// zod is used to check tupes at run time
import { z } from "zod";
process.env.APP_STAGE = process.env.APP_STAGE || "dev";

const isProduction = process.env.APP_STAGE === "production";
const isDevelopment = process.env.APP_STAGE === "dev";
const isTest = process.env.APP_STAGE === "test";
if (isDevelopment) {
  loadEnv();
} else if (isTest) {
  loadEnv("test");
}


const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  APP_STAGE: z.enum(["dev", "production", "test"]).default("dev"),
  PORT: z.coerce.number().positive().default(3000),
  HOST: z.string().default("localhost"),


  DATABASE_URL: z.string().startsWith("postgresql://"),

  JWT_SECRET: z.string().min(6, "JWT_SECRET must be at least 6 characters"),
  JWT_EXPIRES_IN: z.string().default("7d"),

  BCRYPT_ROUNDS: z.coerce.number().min(10).max(20).default(12),
});
export type Env = z.infer<typeof envSchema>;
let env: Env;
try {
  env = envSchema.parse(process.env);
} catch (error) {
  if (error instanceof z.ZodError) {
    console.error(" Invalid environment variables:");
    console.error(JSON.stringify(error.flatten().fieldErrors, null, 2));

  
    error.issues.forEach((err) => {
      const path = err.path.join(".");
      console.error(`  ${path}: ${err.message}`);
    });

    process.exit(1); 
  }
  throw error;
}


export const isProd = () => env.NODE_ENV === "production";
export const isDev = () => env.NODE_ENV === "development";
export const isTestEnv = () => env.NODE_ENV === "test";


export { env };
export default env;
