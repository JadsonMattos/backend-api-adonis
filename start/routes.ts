/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const AuthController = () => import('#controllers/auth_controller')

router.post('signup', [AuthController, 'signup'])
router.post('login', [AuthController, 'login'])

router
  .get('/', async ({ auth }) => {
    return auth.getUserOrFail()
  })
  .use(middleware.auth())

router
  .group(() => {
    router.resource('clients', 'ClientsController').apiOnly()
    router.resource('products', 'ProductsController').apiOnly()
    router.resource('sales', 'SalesController').apiOnly()
  })
  .use(middleware.auth())
