import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import request from 'supertest'
import { app } from '@/app'

describe('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able register', async () => {
    await request(app.server).post('/orgs/register').send({
      name: 'Jonh Doe',
      phone: 'xxxxxxxxxxx',
      email: 'johndoe@gmail.com',
      password: '123456',
      address: 'Av. Sampaio Vidal, 000 | Marília-SP',
    })

    const auth = await request(app.server).post('/orgs/auth').send({
      email: 'johndoe@gmail.com',
      password: '123456',
    })

    const { token } = auth.body

    const response = await request(app.server)
      .post('/pets/register')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Black Cat',
        description: 'she´s cleanup bad fellings',
      })

    expect(response.statusCode).toEqual(201)
    expect(response.body).toEqual({
      pet: expect.objectContaining({
        id: expect.any(String),
      }),
    })
  })
})
