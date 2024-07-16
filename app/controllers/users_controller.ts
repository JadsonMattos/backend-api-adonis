import type { HttpContext } from '@adonisjs/core/http'
import { loginValidator, signupValidator } from '#validators/auth'
import User from '#models/user'

export default class UsersController {
  async signup({ request, response }: HttpContext): Promise<void> {
    const { email, password } = await request.validateUsing(signupValidator)
    const user = await User.create({ email, password })
    return response.status(201).json(user)
  }

  async login({ request, response }: any) {
    const { email, password } = request.validateUsing(loginValidator)
    const user = await User.verifyCredentials(email, password)
    const token = await User.accessTokens.create(user)
    return response.ok({
      token: token,
      ...user.serialize(),
    })
  }
}
