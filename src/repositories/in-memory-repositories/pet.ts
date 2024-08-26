import { randomUUID } from 'node:crypto'
import {
  PetRequestInterface,
  PetResponseInterface,
} from '@/@types/entities/pet'
import { PetRepositories } from '../pet'
import { OrgResponseInterface } from '@/@types/entities/org'

export class PetInMemoryRepositories implements PetRepositories {
  private database: PetResponseInterface[] = []

  async fetchByNameAndDescription(query: string, orgs: OrgResponseInterface[]) {
    const pet = this.database
      // eslint-disable-next-line array-callback-return
      .filter((db) => {
        for (const org of orgs) {
          if (org.id === db.org_id) return db
        }
      })
      .filter((db) => db.name.includes(query) || db.description.includes(query))

    if (pet.length === 0) {
      return null
    }

    return pet
  }

  async fetchByOrg(orgs: OrgResponseInterface[]) {
    // eslint-disable-next-line array-callback-return
    const pet = this.database.filter((db) => {
      for (const org of orgs) {
        if (org.id === db.org_id) return db
      }
    })

    if (pet.length === 0) {
      return null
    }

    return pet
  }

  async findById(id: string) {
    const pet = this.database.find((db) => db.id === id)

    if (!pet) {
      return null
    }

    return pet
  }

  async create({
    id,
    name,
    description,
    org_id,
    created_at,
  }: PetRequestInterface) {
    const org = {
      id: id ?? randomUUID(),
      name,
      description,
      org_id,
      created_at: created_at ?? new Date(),
    }

    this.database.push(org)

    return org
  }
}
