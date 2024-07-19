import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Phone from '#models/phone'

export default class PhoneSeeder extends BaseSeeder {
  async run() {
    await Phone.createMany([
      {
        clientId: 1,
        number: '99123456789',
      },
      {
        clientId: 2,
        number: '99987654321',
      },
      {
        clientId: 3,
        number: '99963258741',
      },
    ])
  }
}
