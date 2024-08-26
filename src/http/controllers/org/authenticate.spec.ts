import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import request from 'supertest'
import { app } from '@/app'

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able authenticate', async () => {
    await request(app.server).post('/orgs/register').send({
      name: 'Jonh Doe',
      phone: 'xxxxxxxxxxx',
      email: 'johndoe@gmail.com',
      password: '123456',
      address: 'Av. Sampaio Vidal, 000 | Marília-SP',
    })

    const response = await request(app.server).post('/orgs/auth').send({
      email: 'johndoe@gmail.com',
      password: '123456',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
