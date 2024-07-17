import { defineConfig } from '@adonisjs/auth'
// import { tokensGuard, tokensUserProvider } from '@adonisjs/auth/access_tokens'
import type { InferAuthEvents, Authenticators } from '@adonisjs/auth/types'
import { JwtGuard } from '../app/auth/guards/jwt.js'
import env from '#start/env'
import { sessionUserProvider } from '@adonisjs/auth/session'

const jwtConfig = {
  secret: env.get('APP_KEY'),
}
const userProvider = sessionUserProvider({
  model: () => import('#models/user'),
})

const authConfig = defineConfig({
  default: 'jwt',
  guards: {
    jwt: (ctx) => {
      return new JwtGuard(ctx, userProvider, jwtConfig)
    },
  },
})

// const authConfig = defineConfig({
//   default: 'api',
//   guards: {
//     api: tokensGuard({
//       provider: tokensUserProvider({
//         tokens: 'accessTokens',
//         model: () => import('#models/user'),
//       }),
//     }),
//   },
// })

export default authConfig

/**
 * Inferring types from the configured auth
 * guards.
 */
declare module '@adonisjs/auth/types' {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  interface Authenticators extends InferAuthenticators<typeof authConfig> {}
}
declare module '@adonisjs/core/types' {
  interface EventsList extends InferAuthEvents<Authenticators> {}
}
