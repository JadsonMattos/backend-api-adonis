import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Sale from '#models/sale'

export default class SaleSeeder extends BaseSeeder {
  async run() {
    await Sale.createMany([
      {
        clientId: 1,
        productId: 1,
        quantity: 2,
        unitPrice: 100.0,
        totalPrice: 100.0,
        dateTime: '2023-05-15',
      },
      {
        clientId: 2,
        productId: 2,
        quantity: 3,
        unitPrice: 200.0,
        totalPrice: 600.0,
        dateTime: '2023-05-16',
      },
      {
        clientId: 1,
        productId: 1,
        quantity: 4,
        unitPrice: 100.0,
        totalPrice: 400.0,
        dateTime: '2023-01-13',
      },
    ])
  }
}
