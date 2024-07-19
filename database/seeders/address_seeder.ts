import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Address from '#models/address'

export default class AddressSeeder extends BaseSeeder {
  async run() {
    await Address.createMany([
      {
        clientId: 1,
        street: 'Rua 1',
        city: 'Cidade 1',
        state: 'AB',
        zipCode: '12345678',
      },
      {
        clientId: 2,
        street: 'Rua 2',
        city: 'Cidade 2',
        state: 'AC',
        zipCode: '87654321',
      },
      {
        clientId: 3,
        street: 'Rua 3',
        city: 'Cidade 3',
        state: 'AC',
        zipCode: '96325874',
      },
    ])
  }
}
