import { FastifyInstance } from 'fastify'
import request from 'supertest'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  isAdmin = false,
) {
  await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await bcrypt.hash('123456', 6),
      role: isAdmin ? 'ADMIN' : 'USER',
    },
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'johndoe@example.com',
    password: '123456',
  })

  const { access_token } = authResponse.body

  return { access_token }
}
