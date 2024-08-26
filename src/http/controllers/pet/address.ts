import { ResourceNotFound } from '@/use-cases/errors/resource-not-found'
import { FetchPetsAddressFactories } from '@/use-cases/factories/pet/fetch-pets-address'
import { FetchPetsNameAndDescriptionFactories } from '@/use-cases/factories/pet/fetch-pets-name-and-description'
import { FastifyReply, FastifyRequest } from 'fastify'

import { z } from 'zod'

export async function Address(req: FastifyRequest, res: FastifyReply) {
  const requestQuerySchema = z.object({
    address: z.string(),
    query: z.string().nullable().default(null),
  })

  const { address, query } = requestQuerySchema.parse(req.query)

  try {
    if (query) {
      const { pet } = await FetchPetsNameAndDescriptionFactories().handle({
        address,
        query,
      })
      return res.status(200).send({ pet })
    } else {
      const { pet } = await FetchPetsAddressFactories().handle({
        address,
      })
      return res.status(200).send({ pet })
    }
  } catch (err) {
    if (err instanceof ResourceNotFound) {
      res.status(400).send()
    }

    res.status(500).send(err)
  }
}
