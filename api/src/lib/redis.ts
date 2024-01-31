import Redis, { RedisOptions } from 'ioredis'

type RedisConfig = RedisOptions & {
  username: string
  tls?: boolean | import('tls').ConnectionOptions // Adjust the type for 'tls'
}

export const redis = new Redis({
  port: process.env.REDIS_PORT || 6379,
  host: process.env.REDIS_HOST,
  username: process.env.REDIS_SERVICE_NAME,
  password: process.env.REDIS_PASSWORD,
  tls: true,
} as RedisConfig)
