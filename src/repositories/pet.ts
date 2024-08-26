import { OrgResponseInterface } from '@/@types/entities/org'
import {
  PetRequestInterface,
  PetResponseInterface,
} from '@/@types/entities/pet'

export interface PetRepositories {
  fetchByNameAndDescription(
    query: string,
    orgs: OrgResponseInterface[],
  ): Promise<PetResponseInterface[] | null>
  fetchByOrg(
    orgs: OrgResponseInterface[],
  ): Promise<PetResponseInterface[] | null>
  findById(id: string): Promise<PetResponseInterface | null>
  create(pet: PetRequestInterface): Promise<PetResponseInterface>
}
