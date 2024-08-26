import { describe, it, beforeEach, expect } from 'vitest'
import { RegisterPetUseCases } from './register'
import { PetInMemoryRepositories } from '@/repositories/in-memory-repositories/pet'
import { OrgInMemoryRepositories } from '@/repositories/in-memory-repositories/org'

import { hash } from 'bcryptjs'
import { ResourceNotFound } from '../errors/resource-not-found'

let orgRepositories: OrgInMemoryRepositories
let petRepositories: PetInMemoryRepositories
let useCase: RegisterPetUseCases

describe('register pet use cases', () => {
  beforeEach(async () => {
    orgRepositories = new OrgInMemoryRepositories()
    petRepositories = new PetInMemoryRepositories()
    useCase = new RegisterPetUseCases(petRepositories, orgRepositories)

    await orgRepositories.create({
      id: '000',
      name: 'Jonh Doe',
      phone: '(xx) xxxxx-xxxx',
      email: 'johndoe@gmail.com',
      password: await hash('123456', 6),
      address: 'Av. Sampaio Vidal, 000 | Marília-SP',
    })
  })

  it('should be able to register a new pet', async () => {
    const { pet } = await useCase.handle({
      name: 'Cat White',
      description: 'he is happy and good',
      org_id: '000',
    })

    expect(pet.id).toEqual(expect.any(String))
  })

  it('should be not able to register a new pet with wrong org_id', async () => {
    await expect(() =>
      useCase.handle({
        name: 'Cat White',
        description: 'he is happy and good',
        org_id: '111',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFound)
  })
})
