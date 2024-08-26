import { PetInterface } from '@/@types/entities/pet'
import { OrgRepositories } from '@/repositories/org'
import { PetRepositories } from '@/repositories/pet'
import { ResourceNotFound } from '../errors/resource-not-found'

interface RegisterPetUseCasesRequest {
  name: string
  description: string
  org_id: string
}

interface RegisterPetUseCasesResponse {
  pet: PetInterface
}

export class RegisterPetUseCases {
  constructor(
    private petRepositories: PetRepositories,
    private orgRepositories: OrgRepositories,
  ) {}

  async handle({
    name,
    description,
    org_id,
  }: RegisterPetUseCasesRequest): Promise<RegisterPetUseCasesResponse> {
    const doesTheOrgExist = await this.orgRepositories.findById(org_id)

    if (!doesTheOrgExist) {
      throw new ResourceNotFound()
    }

    const pet = await this.petRepositories.create({
      name,
      description,
      org_id,
    })

    return { pet }
  }
}
