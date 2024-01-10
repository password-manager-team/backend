import "dotenv/config";

type Env = {
  NODE_ENV: string;
  REDIS_URL?: string;
};

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

const config = sanitizeConfig({
  NODE_ENV: "development",
  REDIS_URL: process.env.REDIS_URL
});

export default config;
