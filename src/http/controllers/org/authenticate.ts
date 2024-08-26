import { ResourceNotFound } from '@/use-cases/errors/resource-not-found'
import { AuthenticateOrgFactories } from '@/use-cases/factories/org/authenticate'
import { FastifyReply, FastifyRequest } from 'fastify'

import { z } from 'zod'

export async function Authenticate(req: FastifyRequest, res: FastifyReply) {
  const requestBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = requestBodySchema.parse(req.body)

  try {
    const { org } = await AuthenticateOrgFactories().handle({
      email,
      password,
    })

    const token = await res.jwtSign({}, { sign: { sub: org.id } })

    const refreshToken = await res.jwtSign(
      {},
      { sign: { sub: org.id, expiresIn: '7d' } },
    )

    return res
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({ token })
  } catch (err) {
    if (err instanceof ResourceNotFound) {
      res.status(400).send()
    }

    res.status(500).send(err)
  }
}
