import { describe, it, beforeEach, expect } from 'vitest'
import { FetchNameAndDescriptionPetUseCases } from './fetch-pets-name-and-description'
import { PetInMemoryRepositories } from '@/repositories/in-memory-repositories/pet'
import { OrgInMemoryRepositories } from '@/repositories/in-memory-repositories/org'

import { hash } from 'bcryptjs'
import { ResourceNotFound } from '../errors/resource-not-found'

let orgRepositories: OrgInMemoryRepositories
let petRepositories: PetInMemoryRepositories
let useCase: FetchNameAndDescriptionPetUseCases

describe('fetch name and description pet use cases', () => {
  beforeEach(async () => {
    orgRepositories = new OrgInMemoryRepositories()
    petRepositories = new PetInMemoryRepositories()
    useCase = new FetchNameAndDescriptionPetUseCases(
      petRepositories,
      orgRepositories,
    )

    await orgRepositories.create({
      id: '000',
      name: 'Jonh Doe',
      phone: '(xx) xxxxx-xxxx',
      email: 'johndoe@gmail.com',
      password: await hash('123456', 6),
      address: 'Av. Sampaio Vidal, 000 | Marília-SP',
    })

    await orgRepositories.create({
      id: '111',
      name: 'Jonh Doe',
      phone: '(yy) xxxxx-xxxx',
      email: 'john@gmail.com',
      password: await hash('123456', 6),
      address: 'Rua Nove de Julho, 000 | Bauru-SP',
    })

    await petRepositories.create({
      id: '000',
      name: 'Cat White',
      description: 'he is happy and good',
      org_id: '000',
    })

    await petRepositories.create({
      id: '111',
      name: 'Dog White',
      description: 'he is happy and good',
      org_id: '111',
    })
  })

  it('should be able to fetch pet by address and name or description', async () => {
    const { pet } = await useCase.handle({
      address: 'Marília',
      query: 'Cat White',
    })

    expect(pet).toHaveLength(1)
  })

  it('should be not able to find pet by address with wrong name or description', async () => {
    await expect(() =>
      useCase.handle({
        address: 'Marília',
        query: 'Turtle Green',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFound)
  })
})
