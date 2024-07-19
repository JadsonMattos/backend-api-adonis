import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Client from '#models/client'

export default class ClientSeeder extends BaseSeeder {
  async run() {
    await Client.createMany([
      {
        name: 'Cliente 1',
        cpf: '12345678912',
      },
      {
        name: 'Cliente 3',
        cpf: '96325874196',
      },
      {
        name: 'Cliente 2',
        cpf: '98765431298',
      },
    ])
  }
}
