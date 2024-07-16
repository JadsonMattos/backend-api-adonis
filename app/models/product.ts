import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import { HasMany } from '@adonisjs/lucid/types/relations'
import Sale from '#models/sale'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare description: string

  @column()
  declare price: number

  @column()
  declare isDeleted: boolean

  @hasMany(() => Sale)
  declare sales: HasMany<typeof Sale>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  static async listAll() {
    return this.query().orderBy('name')
  }

  static async createProduct(data: Partial<Product>) {
    return this.create(data)
  }

  static async updateProduct(id: number, data: Partial<Product>) {
    const product = await this.findOrFail(id)
    product.merge(data)
    await product.save()
    return product
  }

  static async softDeleteProduct(id: number) {
    const product = await this.findOrFail(id)
    product.isDeleted = true
    await product.save()
    return product
  }
}
