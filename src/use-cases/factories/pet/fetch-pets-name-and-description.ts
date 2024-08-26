import { OrgPrismaRepositories } from '@/repositories/prisma-repositories/org'
import { PetPrismaRepositories } from '@/repositories/prisma-repositories/pet'
import { FetchNameAndDescriptionPetUseCases } from '@/use-cases/pet/fetch-pets-name-and-description'

export function FetchPetsNameAndDescriptionFactories() {
  const petPrismaRepositories = new PetPrismaRepositories()
  const orgPrismaRepositories = new OrgPrismaRepositories()
  const fetchNameAndDescription = new FetchNameAndDescriptionPetUseCases(
    petPrismaRepositories,
    orgPrismaRepositories,
  )

  return fetchNameAndDescription
}
