import type { HttpContext } from '@adonisjs/core/http'
import { loginValidator, signupValidator } from '#validators/auth'
import User from '#models/user'

export default class AuthController {
  async signup({ request, response, auth }: HttpContext): Promise<void> {
    const validatedData = await request.validateUsing(signupValidator)
    const user = await User.create(validatedData)
    const token = await auth.use('jwt').generate(user)
    return response.status(201).json({ user, token })
  }

  async login({ request, auth }: any) {
    const { email, password } = request.validateUsing(loginValidator)
    const user = await User.verifyCredentials(email, password)
    const token = await auth.use('jwt').attempt(user)
    return { token }
  }
}
