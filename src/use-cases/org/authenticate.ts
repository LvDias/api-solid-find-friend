import { OrgRepositories } from '@/repositories/org'
import { ResourceNotFound } from '../errors/resource-not-found'
import { OrgInterface } from '@/@types/entities/org'

import { compare } from 'bcryptjs'

interface AuthenticateOrgUseCasesRequest {
  email: string
  password: string
}

interface AuthenticateOrgUseCasesResponse {
  org: OrgInterface
}

export class AuthenticateOrgUseCases {
  constructor(private orgRepositories: OrgRepositories) {}

  async handle({
    email,
    password,
  }: AuthenticateOrgUseCasesRequest): Promise<AuthenticateOrgUseCasesResponse> {
    const doesThisEmailEExist = await this.orgRepositories.findByEmail(email)

    if (!doesThisEmailEExist) {
      throw new ResourceNotFound()
    }

    const passwordHashed = doesThisEmailEExist.password

    const areThePasswordTheSame = await compare(password, passwordHashed)

    if (!areThePasswordTheSame) {
      throw new ResourceNotFound()
    }

    return { org: doesThisEmailEExist }
  }
}
