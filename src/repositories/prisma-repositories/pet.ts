import { PetRequestInterface } from '@/@types/entities/pet'
import { OrgResponseInterface } from '@/@types/entities/org'
import { PetRepositories } from '../pet'

import { prisma } from '@/lib/prisma'

export class PetPrismaRepositories implements PetRepositories {
  async fetchByNameAndDescription(query: string, orgs: OrgResponseInterface[]) {
    const orgsId: string[] = orgs.map(({ id }) => id)

    const org = await prisma.pet.findMany({
      where: {
        org_id: { in: orgsId },
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
        ],
      },
      include: {
        org: {
          select: {
            name: true,
            phone: true,
            email: true,
            address: true,
          },
        },
      },
    })

    return org
  }

  async fetchByOrg(orgs: OrgResponseInterface[]) {
    const orgsId = orgs.map((e) => e.id)

    const org = await prisma.pet.findMany({
      where: { org_id: { in: orgsId } },
      include: {
        org: {
          select: {
            name: true,
            phone: true,
            address: true,
          },
        },
      },
    })
    return org
  }

  async findById(id: string) {
    const org = await prisma.pet.findUnique({
      where: { id },
      include: {
        org: {
          select: {
            name: true,
            phone: true,
            address: true,
          },
        },
      },
    })
    return org
  }

  async create({ name, description, org_id }: PetRequestInterface) {
    const pet = await prisma.pet.create({
      data: {
        name,
        description,
        org_id,
      },
    })

    return pet
  }
}
