import { ResourceNotFound } from '@/use-cases/errors/resource-not-found'
import { GetMoreDetaisPetFactories } from '@/use-cases/factories/pet/get-more-details'
import { FastifyReply, FastifyRequest } from 'fastify'

import { z } from 'zod'

export async function Detais(req: FastifyRequest, res: FastifyReply) {
  const requestParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = requestParamsSchema.parse(req.params)

  try {
    const { pet } = await GetMoreDetaisPetFactories().handle({
      id,
    })
    return res.status(200).send({ pet })
  } catch (err) {
    if (err instanceof ResourceNotFound) {
      res.status(400).send()
    }

    res.status(500).send(err)
  }
}
