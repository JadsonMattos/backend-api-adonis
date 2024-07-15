import Client from '#models/client'
import type { HttpContext } from '@adonisjs/core/http'

export default class ClientsController {
  async index({ response }: HttpContext) {
    const clients = await Client.listAll()
    return response.json(clients)
  }

  async show({ params, response }: HttpContext) {
    const client = await Client.findOrFail(params.id)
    await client.load('sales', (query) => {
      query.orderBy('created_at', 'desc')
    })
    return response.json(client)
  }

  async store({ request, response }: HttpContext) {
    const data = request.only(['name', 'cpf'])
    const client = await Client.createClient(data)
    return response.status(201).json(client)
  }

  async update({ params, request, response }: HttpContext) {
    const data = request.only(['name', 'cpf'])
    const client = await Client.updateClient(params.id, data)
    return response.json(client)
  }

  async destroy({ params, response }: HttpContext) {
    await Client.deleteClient(params.id)
    return response.status(204).json(null)
  }
}
