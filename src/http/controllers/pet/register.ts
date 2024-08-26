import { ResourceNotFound } from '@/use-cases/errors/resource-not-found'
import { RegisterPetFactories } from '@/use-cases/factories/pet/register'
import { FastifyReply, FastifyRequest } from 'fastify'

import { z } from 'zod'

export async function Register(req: FastifyRequest, res: FastifyReply) {
  const requestBodySchema = z.object({
    name: z.string(),
    description: z.string(),
  })

  const { name, description } = requestBodySchema.parse(req.body)

  try {
    const { pet } = await RegisterPetFactories().handle({
      name,
      description,
      org_id: req.user.sub,
    })
    return res.status(201).send({ pet })
  } catch (err) {
    if (err instanceof ResourceNotFound) {
      res.status(400).send()
    }

    res.status(500).send(err)
  }
}
