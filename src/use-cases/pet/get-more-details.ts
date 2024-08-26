import { PetRequestInterface } from '@/@types/entities/pet'
import { PetRepositories } from '@/repositories/pet'
import { ResourceNotFound } from '../errors/resource-not-found'

interface GetMoreDetaisPetUseCasesRequest {
  id: string
}

interface GetMoreDetaisPetUseCasesResponse {
  pet: PetRequestInterface
}

export class GetMoreDetaisPetUseCases {
  constructor(private petRepositories: PetRepositories) {}

  async handle({
    id,
  }: GetMoreDetaisPetUseCasesRequest): Promise<GetMoreDetaisPetUseCasesResponse> {
    const doesThePetExist = await this.petRepositories.findById(id)

    if (!doesThePetExist) {
      throw new ResourceNotFound()
    }

    return { pet: doesThePetExist }
  }
}
