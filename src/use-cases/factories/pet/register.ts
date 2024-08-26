import { OrgPrismaRepositories } from '@/repositories/prisma-repositories/org'
import { PetPrismaRepositories } from '@/repositories/prisma-repositories/pet'
import { RegisterPetUseCases } from '@/use-cases/pet/register'

export function RegisterPetFactories() {
  const petPrismaRepositories = new PetPrismaRepositories()
  const orgPrismaRepositories = new OrgPrismaRepositories()
  const registerPet = new RegisterPetUseCases(
    petPrismaRepositories,
    orgPrismaRepositories,
  )

  return registerPet
}
