import type { HttpContext } from '@adonisjs/core/http'
import { loginValidator, signupValidator } from '#validators/auth'
import User from '#models/user'

export default class AuthController {
  async signup({ request, response }: HttpContext) {
    const payload = await request.validateUsing(signupValidator)
    const user = await User.create(payload)
    return response.created(user)
  }

  async login({ request, response, auth }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)
    const user = await User.verifyCredentials(email, password)
    console.log(user)
    const token = await auth.use('jwt').generate(user)
    return response.ok({
      token: token,
      ...user.serialize(),
    })
  }
}
