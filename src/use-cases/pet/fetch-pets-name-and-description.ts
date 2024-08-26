import { PetResponseInterface } from '@/@types/entities/pet'
import { PetRepositories } from '@/repositories/pet'
import { ResourceNotFound } from '../errors/resource-not-found'
import { OrgRepositories } from '@/repositories/org'

interface FetchNameAndDescriptionPetUseCasesRequest {
  address: string
  query: string
}

interface FetchNameAndDescriptionPetUseCasesResponse {
  pet: PetResponseInterface[]
}

export class FetchNameAndDescriptionPetUseCases {
  constructor(
    private petRepositories: PetRepositories,
    private orgRepositories: OrgRepositories,
  ) {}

  async handle({
    address,
    query,
  }: FetchNameAndDescriptionPetUseCasesRequest): Promise<FetchNameAndDescriptionPetUseCasesResponse> {
    const allOrgAtTheAddress =
      await this.orgRepositories.fetchByAddress(address)

    if (!allOrgAtTheAddress) {
      throw new ResourceNotFound()
    }

    const allPetsAtTheAddressAndNameOrDescription =
      await this.petRepositories.fetchByNameAndDescription(
        query,
        allOrgAtTheAddress,
      )

    if (!allPetsAtTheAddressAndNameOrDescription) {
      throw new ResourceNotFound()
    }

    return { pet: allPetsAtTheAddressAndNameOrDescription }
  }
}
