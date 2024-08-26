import { PetResponseInterface } from '@/@types/entities/pet'
import { PetRepositories } from '@/repositories/pet'
import { ResourceNotFound } from '../errors/resource-not-found'
import { OrgRepositories } from '@/repositories/org'

interface FetchAddressPetUseCasesRequest {
  address: string
}

interface FetchAddressPetUseCasesResponse {
  pet: PetResponseInterface[]
}

export class FetchAddressPetUseCases {
  constructor(
    private petRepositories: PetRepositories,
    private orgRepositories: OrgRepositories,
  ) {}

  async handle({
    address,
  }: FetchAddressPetUseCasesRequest): Promise<FetchAddressPetUseCasesResponse> {
    const allOrgAtTheAddress =
      await this.orgRepositories.fetchByAddress(address)

    if (!allOrgAtTheAddress) {
      throw new ResourceNotFound()
    }

    const allPetsAtTheAddress =
      await this.petRepositories.fetchByOrg(allOrgAtTheAddress)

    if (!allPetsAtTheAddress) {
      throw new ResourceNotFound()
    }

    return { pet: allPetsAtTheAddress }
  }
}
