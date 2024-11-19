import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, hasOne } from '@adonisjs/lucid/orm'
import type { HasMany, HasOne } from '@adonisjs/lucid/types/relations'
import Sale from '#models/sale'
import Address from '#models/address'

export default class Client extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare cpf: string

  @hasMany(() => Sale)
  declare sales: HasMany<typeof Sale>

  @hasOne(() => Address)
  declare addresses: HasOne<typeof Address>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  static async listAll() {
    return this.query().orderBy('id')
  }

  static async findClient(id: number, month?: number, year?: number) {
    return this.query()
      .where('id', id)
      .preload('sales', (query) => {
        query.orderBy('created_at', 'desc')
        if (month && year) {
          query.whereRaw('extract(month from created_at) = ?', [month])
          query.whereRaw('extract(year from created_at) = ?', [year])
        }
      })
      .firstOrFail()
  }

  static async createClient(name: string, cpf: string) {
    const existingClient = await this.query().where('cpf', cpf).first()
    if (existingClient) {
      throw new Error('CPF already registered')
    }
    const client = new Client()
    client.name = name
    client.cpf = cpf
    await client.save()
    return client
  }

  static async updateClient(id: number, data: Partial<Client>) {
    const client = await this.findOrFail(id)
    client.merge(data)
    await client.save()
    return client
  }

  static async deleteClient(id: number) {
    const client = await this.findOrFail(id)
    if (!client) {
      throw new Error('Not found')
    }
    await client.delete()
  }
}
