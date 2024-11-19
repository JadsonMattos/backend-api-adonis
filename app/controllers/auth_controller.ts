import type { HttpContext } from '@adonisjs/core/http'
import { loginValidator } from '#validators/auth'
import { signupValidator } from '#validators/signup'
import User from '#models/user'
import BlacklistToken from '#models/blacklist'

export default class AuthController {
  async signup({ request, response }: HttpContext) {
    const payload = await request.validateUsing(signupValidator)
    const user = await User.create(payload)
    return response.created({ message: 'User registered successfully', user })
  }

  async login({ request, response, auth }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)
    try {
      const user = await User.verifyCredentials(email, password)
      console.log(user)
      const token = await auth.use('jwt').generate(user)
      return response.ok({
        token: token,
        ...user.serialize(),
      })
    } catch {
      return response.unauthorized({
        message: 'Invalid credentials',
      })
    }
  }

  async logout({ request }: HttpContext) {
    const authHeader = request.header('authorization')
    if (!authHeader) {
      return { message: 'No token provided' }
    }
    const token = authHeader.replace('Bearer ', '')

    await BlacklistToken.create({ token })
    return { message: 'Logged out successfully' }
  }
}
