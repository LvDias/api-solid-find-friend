import {
  OrgRequestInterface,
  OrgResponseInterface,
} from '@/@types/entities/org'
import { OrgRepositories } from '../org'
import { randomUUID } from 'node:crypto'

export class OrgInMemoryRepositories implements OrgRepositories {
  private database: OrgResponseInterface[] = []

  async fetchByAddress(address: string) {
    const org = this.database.filter((db) => db.address.includes(address))

    if (org.length === 0) {
      return null
    }

    return org
  }

  async findById(id: string) {
    const org = this.database.find((db) => db.id === id)

    if (!org) {
      return null
    }

    return org
  }

  async findByPhone(phone: string) {
    const org = this.database.find((db) => db.phone === phone)

    if (!org) {
      return null
    }

    return org
  }

  async findByEmail(email: string) {
    const org = this.database.find((db) => db.email === email)

    if (!org) {
      return null
    }

    return org
  }

  async create({
    id,
    name,
    phone,
    email,
    password,
    address,
    created_at,
  }: OrgRequestInterface) {
    const org = {
      id: id ?? randomUUID(),
      name,
      phone,
      email,
      password,
      address,
      created_at: created_at ?? new Date(),
    }

    this.database.push(org)

    return org
  }
}
