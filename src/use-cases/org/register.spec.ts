import { describe, expect, it, beforeEach } from 'vitest'
import { RegisterOrgUseCases } from './register'
import { OrgInMemoryRepositories } from '@/repositories/in-memory-repositories/org'
import { EmailAlreadyExist } from '../errors/email-already-exist'
import { PhoneAlreadyExist } from '../errors/phone-already-exist'

let orgRepositories: OrgInMemoryRepositories
let useCase: RegisterOrgUseCases

describe('register org use cases', () => {
  beforeEach(async () => {
    orgRepositories = new OrgInMemoryRepositories()
    useCase = new RegisterOrgUseCases(orgRepositories)
  })

  it('should be able to register a new org', async () => {
    const { org } = await useCase.handle({
      name: 'Jonh Doe',
      phone: '(xx) xxxxx-xxxx',
      email: 'johndoe@gmail.com',
      password: '123456',
      address: 'Av. Sampaio Vidal, 000 | Marília-SP',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should be not able to register a new org with email twice same', async () => {
    await useCase.handle({
      name: 'Jonh Doe',
      phone: '(xx) xxxxx-xxxx',
      email: 'johndoe@gmail.com',
      password: '123456',
      address: 'Av. Sampaio Vidal, 000 | Marília-SP',
    })

    await expect(() =>
      useCase.handle({
        name: 'Jonh Doe',
        phone: '(xx) yxxxx-xxxx',
        email: 'johndoe@gmail.com',
        password: '123456',
        address: 'Av. Sampaio Vidal, 000 | Marília-SP',
      }),
    ).rejects.toBeInstanceOf(EmailAlreadyExist)
  })

  it('should be not able to register a new org with phone twice same', async () => {
    await useCase.handle({
      name: 'Jonh Doe',
      phone: '(xx) xxxxx-xxxx',
      email: 'johndoe@gmail.com',
      password: '123456',
      address: 'Av. Sampaio Vidal, 000 | Marília-SP',
    })

    await expect(() =>
      useCase.handle({
        name: 'Jonh Doe',
        phone: '(xx) xxxxx-xxxx',
        email: 'john@gmail.com',
        password: '123456',
        address: 'Av. Sampaio Vidal, 000 | Marília-SP',
      }),
    ).rejects.toBeInstanceOf(PhoneAlreadyExist)
  })
})
