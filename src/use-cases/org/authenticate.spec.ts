import { describe, it, beforeEach, expect } from 'vitest'
import { OrgInMemoryRepositories } from '@/repositories/in-memory-repositories/org'
import { AuthenticateOrgUseCases } from './authenticate'
import { ResourceNotFound } from '../errors/resource-not-found'
import { hash } from 'bcryptjs'

let orgRepositories: OrgInMemoryRepositories
let useCase: AuthenticateOrgUseCases

describe('authenticate org use cases', () => {
  beforeEach(async () => {
    orgRepositories = new OrgInMemoryRepositories()
    useCase = new AuthenticateOrgUseCases(orgRepositories)

    await orgRepositories.create({
      id: '000',
      name: 'Jonh Doe',
      phone: '(xx) xxxxx-xxxx',
      email: 'johndoe@gmail.com',
      password: await hash('123456', 6),
      address: 'Av. Sampaio Vidal, 000 | Marília-SP',
    })
  })

  it('should be able authenticate', async () => {
    const { org } = await useCase.handle({
      email: 'johndoe@gmail.com',
      password: '123456',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should be not able authenticate with wrong email', async () => {
    await expect(() =>
      useCase.handle({
        email: 'johndoo@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFound)
  })

  it('should be not able authenticate with wrong password', async () => {
    await expect(() =>
      useCase.handle({
        email: 'johndoe@gmail.com',
        password: '123455',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFound)
  })
})
