import { OrgRequestInterface } from '@/@types/entities/org'
import { OrgRepositories } from '../org'

import { prisma } from '@/lib/prisma'

export class OrgPrismaRepositories implements OrgRepositories {
  async fetchByAddress(address: string) {
    const org = await prisma.org.findMany({
      where: { address: { contains: address, mode: 'insensitive' } },
    })

    return org
  }

  async findByPhone(phone: string) {
    const org = await prisma.org.findUnique({ where: { phone } })
    return org
  }

  async findByEmail(email: string) {
    const org = await prisma.org.findUnique({ where: { email } })
    return org
  }

  async findById(id: string) {
    const org = await prisma.org.findUnique({ where: { id } })
    return org
  }

  async create({ name, phone, email, password, address }: OrgRequestInterface) {
    const org = await prisma.org.create({
      data: { name, phone, email, password, address },
    })

    return org
  }
}
