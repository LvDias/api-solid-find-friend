import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import request from 'supertest'
import { app } from '@/app'

describe('Address (e2e)', () => {
  beforeAll(async () => {
    await app.ready()

    await request(app.server).post('/orgs/register').send({
      name: 'Jonh Doe',
      phone: 'xxxxxxxxxxx',
      email: 'johndoe@gmail.com',
      password: '123456',
      address: 'Av. Sampaio Vidal, 000 | Marília-SP',
    })
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able get address', async () => {
    const auth = await request(app.server).post('/orgs/auth').send({
      email: 'johndoe@gmail.com',
      password: '123456',
    })

    const { token } = auth.body

    await request(app.server)
      .post('/pets/register')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Black Cat',
        description: 'she´s cleanup bad fellings',
      })

    const response = await request(app.server).get('/pets?address=Marília')

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      pet: [
        expect.objectContaining({
          id: expect.any(String),
        }),
      ],
    })
  })

  it('should be able get address and description or name', async () => {
    const auth = await request(app.server).post('/orgs/auth').send({
      email: 'johndoe@gmail.com',
      password: '123456',
    })

    const { token } = auth.body

    await request(app.server)
      .post('/pets/register')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Black Dog',
        description: 'he´s cleanup bad fellings',
      })

    const response = await request(app.server).get('/pets').query({
      address: 'marília',
      query: 'black',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body.pet).toHaveLength(2)
  })
})
