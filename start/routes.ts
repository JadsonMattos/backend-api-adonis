/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
// import User from '#models/user'

router.get('/', async () => {
  return { hello: 'world' }
})

// router.post('login', async ({ request, auth }) => {
//   const { email, password } = request.all()
//   const data = await User.verifyCredentials(email, password)
//   return await (auth.use('api') as any).generate(data)
// })

// router
//   .get('/', async ({ auth }) => {
//     return auth.getUserOrFail()
//   })
//   .use(middleware.auth())
router.post('/signup', 'UserController.signup')
router.post('/login', 'UserController.login')

router
  .group(() => {
    router.resource('clients', 'ClientController').apiOnly()
    router.resource('products', 'ProductController').apiOnly()
    router.resource('sales', 'SaleController').only(['store'])
  })
  .use(middleware.auth())
