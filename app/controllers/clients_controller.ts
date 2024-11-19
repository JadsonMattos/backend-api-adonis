import Client from '#models/client'
import type { HttpContext } from '@adonisjs/core/http'

export default class ClientsController {
  async index({ response }: HttpContext) {
    try {
      const clients = await Client.listAll()
      return response.json(clients)
    } catch (error) {
      return response.status(500).json({ error: error.message })
    }
  }

  async show({ params, request, response }: HttpContext) {
    try {
      const { id } = params
      const month = request.input('month')
      const year = request.input('year')
      const client = await Client.findClient(id, month, year)
      if (!client) {
        return response.status(404).json({ message: 'Client not found' })
      }
      return response.json(client)
    } catch (error) {
      return response.status(500).json({ error: error.message })
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const { name, cpf } = request.only(['name', 'cpf'])
      const client = await Client.createClient(name, cpf)
      return response.status(201).json(client)
    } catch (error) {
      if (error.message === 'CPF already registered') {
        return response.status(400).json({ message: error.message })
      }
      return response.status(500).json({ error: error.message })
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const data = request.only(['name', 'cpf'])
      const client = await Client.updateClient(params.id, data)
      return response.json(client)
    } catch (error) {
      return response.status(500).json({ error: error.message })
    }
  }

  async destroy({ params, response }: HttpContext) {
    await Client.deleteClient(params.id)
    return response.status(204).json(null)
  }
}
