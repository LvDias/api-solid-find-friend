import { EmailAlreadyExist } from '@/use-cases/errors/email-already-exist'
import { PhoneAlreadyExist } from '@/use-cases/errors/phone-already-exist'
import { RegisterOrgFactories } from '@/use-cases/factories/org/register'
import { FastifyReply, FastifyRequest } from 'fastify'

import { z } from 'zod'

export async function Register(req: FastifyRequest, res: FastifyReply) {
  const requestBodySchema = z.object({
    name: z.string(),
    phone: z.string().min(11).max(11),
    email: z.string().email(),
    password: z.string().min(6),
    address: z.string(),
  })

  const { name, phone, email, password, address } = requestBodySchema.parse(
    req.body,
  )

  try {
    const { org } = await RegisterOrgFactories().handle({
      name,
      phone,
      email,
      password,
      address,
    })
    return res.status(201).send({ org })
  } catch (err) {
    if (err instanceof EmailAlreadyExist || PhoneAlreadyExist) {
      res.status(400).send()
    }

    res.status(500).send(err)
  }
}
