import { createClient, type RedisClientOptions, type RedisClientType, type RedisModules } from "redis"

class Redis {
  private client: RedisClientType
  constructor(options?: RedisClientOptions<RedisModules, Record<string, never>, Record<string, never>> | undefined) {
    this.client = createClient(options)
  }

  connect() {
    return this.client.connect()
  }
}

export default Redis