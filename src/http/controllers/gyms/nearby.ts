import { makeFetchNearbyGymsUseCase } from '@/use-cases/factories/make-fetch-nearby-gyms-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const nearbyGymsQuerySchema = z.object({
    latitude: z.coerce.number().refine((value) => Math.abs(value) <= 90),
    longitude: z.coerce.number().refine((value) => Math.abs(value) <= 180),
  })

  const { longitude, latitude } = nearbyGymsQuerySchema.parse(request.query)

  const searchGymsUseCase = makeFetchNearbyGymsUseCase()

  const { gyms } = await searchGymsUseCase.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  })

  return reply.code(200).send({
    gyms,
  })
}
