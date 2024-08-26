import { FastifyInstance } from 'fastify'
import { RoutesOrgs } from './controllers/org/routes'
import { RoutesPets } from './controllers/pet/routes'

export async function RoutesMain(app: FastifyInstance) {
  app.register(RoutesOrgs, {
    prefix: '/orgs',
  })
  app.register(RoutesPets, {
    prefix: '/pets',
  })
}
