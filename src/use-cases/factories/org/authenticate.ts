import { OrgPrismaRepositories } from '@/repositories/prisma-repositories/org'
import { AuthenticateOrgUseCases } from '@/use-cases/org/authenticate'

export function AuthenticateOrgFactories() {
  const orgPrismaRepositories = new OrgPrismaRepositories()
  const useCase = new AuthenticateOrgUseCases(orgPrismaRepositories)

  return useCase
}
