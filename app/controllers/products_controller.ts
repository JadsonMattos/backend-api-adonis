import Product from '#models/product'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProductsController {
  async index({ response }: HttpContext) {
    try {
      const products = await Product.listAll()
      return response.json(products)
    } catch (error) {
      return response.status(500).json({ error: error.message })
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const product = await Product.findProduct(params.id)
      return response.json(product)
    } catch (error) {
      return response.status(500).json({ error: error.message })
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const data = request.only(['name', 'description', 'price'])
      if (!data.name || !data.description || !data.price) {
        return response.status(400).json({ message: 'Missing required data' })
      }
      const product = await Product.createProduct(data)
      return response.status(201).json(product)
    } catch (error) {
      return response.status(500).json({ error: error.message })
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const data = request.only(['name', 'description', 'price'])
      const product = await Product.updateProduct(params.id, data)
      return response.json(product)
    } catch (error) {
      return response.status(500).json({ error: error.message })
    }
  }

  async destroy({ params, response }: HttpContext) {
    await Product.softDeleteProduct(params.id)
    return response.status(204).json(null)
  }
}
