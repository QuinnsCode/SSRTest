import { useResponseCache } from '@envelop/response-cache'
import { createRedisCache } from '@envelop/response-cache-redis'

import { authDecoder } from '@redwoodjs/auth-supabase-api'
import { createGraphQLHandler } from '@redwoodjs/graphql-server'

import directives from 'src/directives/**/*.{js,ts}'
import sdls from 'src/graphql/**/*.sdl.{js,ts}'
import services from 'src/services/**/*.{js,ts}'

import { getCurrentUser } from 'src/lib/auth'
import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'
import { redis } from 'src/lib/redis'

export const handler = createGraphQLHandler({
  authDecoder,
  getCurrentUser,
  loggerConfig: { logger, options: {} },
  directives,
  sdls,
  services,
  cors: {
    origin: 'https://ssrtest-web-server.onrender.com',
    credentials: true,
  },
  extraPlugins: [
    // this here needs to be added for the redis cache
    useResponseCache({
      cache: createRedisCache({ redis }),
      ttl: 0, // 1 minute
      includeExtensionMetadata: true,
      ttlPerSchemaCoordinate: {
        // there's more ways to control this but here's my first stab at it
        'Query.PublicFeeds': 1000 * 60 * 5, // 5 minutes in ms
        'Query.searchPublicItems': 1000 * 60 * 5, // 5 minute in ms
      },
    }),
  ],
  onException: () => {
    // Disconnect from your database with an unhandled exception.
    db.$disconnect()
  },
})
