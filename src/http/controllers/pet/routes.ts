import { FastifyInstance } from 'fastify'
import { VerifyJWT } from '../middlewares/verify-jwt'

import { Register } from './register'
import { Detais } from './detais'
import { Address } from './address'

export async function RoutesPets(app: FastifyInstance) {
  app.post('/register', { onRequest: [VerifyJWT] }, Register)
  app.get('/details/:id', Detais)
  app.get('/', Address)
}
