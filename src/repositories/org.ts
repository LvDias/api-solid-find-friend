import {
  OrgRequestInterface,
  OrgResponseInterface,
} from '@/@types/entities/org'

export interface OrgRepositories {
  fetchByAddress(address: string): Promise<OrgResponseInterface[] | null>
  findById(id: string): Promise<OrgResponseInterface | null>
  findByPhone(phone: string): Promise<OrgResponseInterface | null>
  findByEmail(email: string): Promise<OrgResponseInterface | null>
  create(org: OrgRequestInterface): Promise<OrgResponseInterface>
}
