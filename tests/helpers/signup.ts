import User from '#models/user'
import { ApiClient } from '@japa/api-client'

export async function createUserAndLogin(client: ApiClient) {
  const user = await User.create({
    email: 'teste@teste.com',
    password: 'teste12345',
  })

  const response = await client.post('/login').json({
    email: 'teste@teste.com',
    password: 'teste12345',
  })

  const token = response.body().token
  return { user, token }
}
