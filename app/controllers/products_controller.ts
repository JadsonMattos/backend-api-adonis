import Product from '#models/product'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProductsController {
  async index({ response }: HttpContext) {
    const products = await Product.listAll()
    return response.json(products)
  }

  async show({ params, response }: HttpContext) {
    const product = await Product.findOrFail(params.id)
    return response.json(product)
  }

  async store({ request, response }: HttpContext) {
    const data = request.only(['name', 'description', 'price'])
    const product = await Product.createProduct(data)
    return response.status(201).json(product)
  }

  async update({ params, request, response }: HttpContext) {
    const data = request.only(['name', 'description', 'price'])
    const product = await Product.updateProduct(params.id, data)
    return response.json(product)
  }

  async destroy({ params, response }: HttpContext) {
    await Product.softDeleteProduct(params.id)
    return response.status(204).json(null)
  }
}
