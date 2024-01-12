import "dotenv/config";

// Remove the undefined from each key
type Config = {
  [K in keyof Env]-?: Env[K];
};

/**
 * Asserts that every env variable is defined.
 * Throws an error if any field is undefined.
 */
function sanitizeConfig(env: Env): Config {
  for (const [key, value] of Object.entries(env)) {
    if (value === undefined) {
      throw new Error(`Missing field ${key} in .env`);
    }
  }
  return env as Config;
}

type Env = {
  NODE_ENV: string;
  REDIS_URL?: string;
  POSTGRES_USER?: string;
  POSTGRES_PASSWORD?: string;
  POSTGRES_DB?: string;
  POSTGRES_HOST?: string;
  POSTGRES_PORT?: string;
};

const config = sanitizeConfig({
  NODE_ENV: "development",
  REDIS_URL: process.env.REDIS_URL,
  POSTGRES_USER: process.env.POSTGRES_USER,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
  POSTGRES_DB: process.env.POSTGRES_DB,
  POSTGRES_HOST: process.env.POSTGRES_HOST,
  POSTGRES_PORT: process.env.POSTGRES_PORT
});

export default config;
