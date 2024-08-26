import { OrgPrismaRepositories } from '@/repositories/prisma-repositories/org'
import { PetPrismaRepositories } from '@/repositories/prisma-repositories/pet'
import { FetchAddressPetUseCases } from '@/use-cases/pet/fetch-pets-address'

export function FetchPetsAddressFactories() {
  const petPrismaRepositories = new PetPrismaRepositories()
  const orgPrismaRepositories = new OrgPrismaRepositories()
  const fetchByAddress = new FetchAddressPetUseCases(
    petPrismaRepositories,
    orgPrismaRepositories,
  )

  return fetchByAddress
}
