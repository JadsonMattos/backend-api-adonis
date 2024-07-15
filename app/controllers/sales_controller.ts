import { DateTime } from 'luxon'
import Client from '#models/client'
import Product from '#models/product'
import Sale from '#models/sale'
import type { HttpContext } from '@adonisjs/core/http'

export default class SalesController {
  async store({ request, response }: HttpContext) {
    const { clientId, productId, quantity } = request.only(['clientId', 'productId', 'quantity'])
    const client = await Client.findOrFail(clientId)
    const product = await Product.findOrFail(productId)
    const totalPrice = product.price * quantity
    const sale = await Sale.create({
      clientId: client.id,
      productId: product.id,
      quantity,
      unitPrice: product.price,
      totalPrice,
      saleDate: DateTime.local(),
    })
    return response.status(201).json(sale)
  }
}