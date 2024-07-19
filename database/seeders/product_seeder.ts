import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Product from '#models/product'

export default class ProductSeeder extends BaseSeeder {
  async run() {
    await Product.createMany([
      {
        name: 'Z Produto 1',
        description: 'Descrição do Produto 1',
        price: 100.0,
      },
      {
        name: 'A Produto 2',
        description: 'Descrição do Produto 2',
        price: 200.0,
      },
      {
        name: 'Produto 3',
        description: 'Descrição do Produto 3',
        price: 300.0,
      },
    ])
  }
}
