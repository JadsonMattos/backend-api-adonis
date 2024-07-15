import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class UsersController {
  async signup({ request, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
    // const data = await User.verifyCredentials(email, password)
    const user = await User.create({ email, password })
    return response.status(201).json(user)
  }

  async login({ request, response, auth }: any) {
    const { email, password } = request.only(['email', 'password'])
    try {
      const token = await auth.use('api').attempt(email, password)
      await auth.use('api').login(token)
      response.redirect('/dashboard')
    } catch {
      return response.unauthorized('Invalid credentials')
    }
  }
}
