import { test } from '@japa/runner'
import User from '#models/user'

test.group('User Signup', (group) => {
  group.teardown(async () => {
    await User.query().delete()
  })

  test('should create a new user', async ({ client, assert }) => {
    const response = await client.post('/signup').json({
      email: 'teste@teste.com',
      password: 'teste@12345',
    })
    response.assertStatus(201)
    assert.exists(response.body().user.email)
  })

  test('should not create a new user with invalid email', async ({ client }) => {
    const response = await client.post('/signup').json({
      email: 'teste',
      password: 'teste@12345',
    })
    response.assertStatus(422)
  })

  test('should login a user', async ({ client, assert }) => {
    await User.create({
      email: 'teste5@teste.com',
      password: 'teste@12345',
    })

    const response = await client.post('/login').json({
      email: 'teste5@teste.com',
      password: 'teste@12345',
    })

    response.assertStatus(200)
    assert.exists(response.body().token)
  })
})
