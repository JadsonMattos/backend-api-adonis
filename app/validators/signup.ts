import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

export type SignupType = Infer<typeof signupValidator>

export const signupValidator = vine.compile(
  vine.object({
    email: vine
      .string()
      .email()
      .unique(async (query, field) => {
        const user = await query.from('users').where('email', field).first()
        return !user
      }),
    password: vine.string().minLength(8),
  })
)
