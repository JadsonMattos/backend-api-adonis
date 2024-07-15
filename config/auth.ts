import { defineConfig } from '@adonisjs/auth'
import { sessionUserProvider } from '@adonisjs/auth/session'
import env from '#start/env'
import { JwtGuard } from '../app/auth/guards/jwt.js'

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

export default authConfig

// import { Env } from '@adonisjs/core/env'

// export default {
//   guard: 'api',
//   list: {
//     api: {
//       driver: 'jwt',
//       tokenProvider: {
//         type: 'api',
//         driver: 'database',
//         secret: Env.get('APP_KEY'),
//       },
//       provider: {
//         driver: 'lucid',
//         identifierKey: 'id',
//         uids: ['email'],
//         model: () => import('#models/user'),
//       },
//     },
//   },
// }
