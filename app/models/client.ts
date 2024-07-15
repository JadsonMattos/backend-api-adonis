import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import { HasMany } from '@adonisjs/lucid/types/relations'
import Sale from '#models/sale'

export default class Client extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare cpf: string

  @hasMany(() => Sale)
  declare sales: HasMany<typeof Sale>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  static async listAll() {
    return this.query().orderBy('id')
  }

  static async createClient(data: Partial<Client>) {
    return this.create(data)
  }

  static async updateClient(id: number, data: Partial<Client>) {
    const client = await this.findOrFail(id)
    client.merge(data)
    await client.save()
    return client
  }

  static async deleteClient(id: number) {
    const client = await this.findOrFail(id)
    await client.delete()
  }
}
