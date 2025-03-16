import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Create Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a gym', async () => {
    const { access_token } = await createAndAuthenticateUser(app)

    const response = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${access_token}`)
      .send({
        title: 'Academia do Zé',
        description: 'A melhor academia do Brasil',
        phone: '123456789',
        latitude: -27.291312,
        longitude: -40.210317,
      })

    expect(response.statusCode).toEqual(201)
  })
})
