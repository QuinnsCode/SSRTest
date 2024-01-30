import Redis, { RedisOptions } from 'ioredis'

type RedisConfig = RedisOptions & {
  username: string
  tls?: boolean | import('tls').ConnectionOptions // Adjust the type for 'tls'
}

export const redis = new Redis({
  port: process.env.REDIS_PORT || 6379,
  host: process.env.REDIS_HOST || '127.0.0.1',
  username: process.env.REDIS_SERVICE_NAME || '',
  password: process.env.REDIS_PASSWORD || '',
  tls: true,
} as RedisConfig)

// export const redis = new Redis({
//   port: 6379, // Redis port
//   host: '127.0.0.1', // Redis host
//   username: 'default', // needs Redis >= 6
//   password: 'my-top-secret',
//   db: 0, // Defaults to 0
// })
