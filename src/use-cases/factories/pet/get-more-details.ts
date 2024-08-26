import { PetPrismaRepositories } from '@/repositories/prisma-repositories/pet'
import { GetMoreDetaisPetUseCases } from '@/use-cases/pet/get-more-details'

export function GetMoreDetaisPetFactories() {
  const petPrismaRepositories = new PetPrismaRepositories()
  const getMoreDetaisPetUseCases = new GetMoreDetaisPetUseCases(
    petPrismaRepositories,
  )

  return getMoreDetaisPetUseCases
}
