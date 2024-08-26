import { OrgPrismaRepositories } from '@/repositories/prisma-repositories/org'
import { RegisterOrgUseCases } from '@/use-cases/org/register'

export function RegisterOrgFactories() {
  const orgPrismaRepositories = new OrgPrismaRepositories()
  const useCase = new RegisterOrgUseCases(orgPrismaRepositories)

  return useCase
}
