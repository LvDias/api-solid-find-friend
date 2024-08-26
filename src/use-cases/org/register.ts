import { OrgInterface } from '@/@types/entities/org'
import { OrgRepositories } from '@/repositories/org'

import { EmailAlreadyExist } from '../errors/email-already-exist'
import { PhoneAlreadyExist } from '../errors/phone-already-exist'

import { hash } from 'bcryptjs'

interface RegisterOrgUseCasesRequest {
  name: string
  phone: string
  email: string
  password: string
  address: string
}

interface RegisterOrgUseCasesResponse {
  org: OrgInterface
}

export class RegisterOrgUseCases {
  constructor(private orgRepositories: OrgRepositories) {}

  async handle({
    name,
    phone,
    email,
    password,
    address,
  }: RegisterOrgUseCasesRequest): Promise<RegisterOrgUseCasesResponse> {
    const doesThisEmailAlreadyExist =
      await this.orgRepositories.findByEmail(email)

    if (doesThisEmailAlreadyExist) {
      throw new EmailAlreadyExist()
    }

    const doesThisPhoneAlreadyExists =
      await this.orgRepositories.findByPhone(phone)

    if (doesThisPhoneAlreadyExists) {
      throw new PhoneAlreadyExist()
    }

    const passwordHash = await hash(password, 6)

    const org = await this.orgRepositories.create({
      name,
      phone,
      email,
      password: passwordHash,
      address,
    })

    return { org }
  }
}
