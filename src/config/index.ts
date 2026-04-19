import dotenv from "dotenv";
import { z } from "zod";
dotenv.config();

const envSchema = z.object({
  PORT: z.string(),

  password: z.string(),
  database: z.string(),
  host: z.string(),
  dialect: z.string(),
  username: z.string(),
});

const LoadEnv = (env_Variables: NodeJS.ProcessEnv) => {
  const safeParse = envSchema.safeParse(env_Variables);
  if (!safeParse.success) {
    throw new Error("Failed To parse Env");
  }

  return safeParse.data;
};

export const ENV = LoadEnv(process.env);
