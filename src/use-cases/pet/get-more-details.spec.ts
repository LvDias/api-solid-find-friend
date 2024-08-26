import { describe, it, beforeEach, expect } from 'vitest'
import { GetMoreDetaisPetUseCases } from './get-more-details'
import { PetInMemoryRepositories } from '@/repositories/in-memory-repositories/pet'
import { OrgInMemoryRepositories } from '@/repositories/in-memory-repositories/org'

import { hash } from 'bcryptjs'
import { ResourceNotFound } from '../errors/resource-not-found'

let orgRepositories: OrgInMemoryRepositories
let petRepositories: PetInMemoryRepositories
let useCase: GetMoreDetaisPetUseCases

describe('get more detais pet use cases', () => {
  beforeEach(async () => {
    orgRepositories = new OrgInMemoryRepositories()
    petRepositories = new PetInMemoryRepositories()
    useCase = new GetMoreDetaisPetUseCases(petRepositories)

    await orgRepositories.create({
      id: '000',
      name: 'Jonh Doe',
      phone: '(xx) xxxxx-xxxx',
      email: 'johndoe@gmail.com',
      password: await hash('123456', 6),
      address: 'Av. Sampaio Vidal, 000 | Marília-SP',
    })

    await petRepositories.create({
      id: '000',
      name: 'Cat White',
      description: 'he is happy and good',
      org_id: '000',
    })
  })

  it('should be able to find pet by id', async () => {
    const { pet } = await useCase.handle({
      id: '000',
    })

    expect(pet.name).toEqual(expect.any(String))
  })

  it('should be not able to find pet by wrong id', async () => {
    await expect(() =>
      useCase.handle({
        id: '111',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFound)
  })
})
