import { prisma } from '@/lib/prisma'
import { FindManyNearbyParams, IGymsRepository } from '../gyms-repository'
import { Gym, Prisma } from '@prisma/client'

export class PrismaGymsRepository implements IGymsRepository {
  async findById(id: string): Promise<Gym | null> {
    const gym = prisma.gym.findUnique({
      where: {
        id,
      },
    })

    return gym
  }
  async create(data: Prisma.GymCreateInput): Promise<Gym> {
    const gym = prisma.gym.create({
      data,
    })

    return gym
  }
  async searchMany(query: string, page: number): Promise<Gym[]> {
    const gyms = prisma.gym.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return gyms
  }
  async findManyNearby({
    latitude,
    longitude,
  }: FindManyNearbyParams): Promise<Gym[]> {
    const gyms = await prisma.$queryRaw<Gym[]>`
      SELECT * from gyms
      WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `

    return gyms
  }
}
