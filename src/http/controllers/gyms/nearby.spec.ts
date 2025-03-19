import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Nearby Gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to list nearby gyms', async () => {
    const { access_token } = await createAndAuthenticateUser(app, true)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${access_token}`)
      .send({
        title: 'Academia do Zé',
        description: 'A melhor academia do Brasil',
        phone: '123456789',
        latitude: -27.2092052,
        longitude: -40.6401091,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${access_token}`)
      .send({
        title: 'Phd Gym',
        description: null,
        phone: '123456789',
        latitude: -32.455111,
        longitude: -30.231212,
      })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: -27.2092052,
        longitude: -40.6401091,
      })
      .set('Authorization', `Bearer ${access_token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'Academia do Zé',
      }),
    ])
  })
})
