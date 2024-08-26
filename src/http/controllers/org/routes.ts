import { FastifyInstance } from 'fastify'
import { Register } from './register'
import { Authenticate } from './authenticate'
import { ReAuthenticate } from './re-authenticate'

export async function RoutesOrgs(app: FastifyInstance) {
  app.post('/register', Register)
  app.post('/auth', Authenticate)
  app.patch('/auth/refresh', ReAuthenticate)
}
