import { prisma } from '@/lib/prisma'
import { ICheckInsRepository } from '../check-ins-repository'
import { CheckIn, Prisma } from '@prisma/client'
import dayjs from 'dayjs'

export class PrismaCheckInsRepository implements ICheckInsRepository {
  async findById(id: string) {
    const checkIn = prisma.checkIn.findUnique({
      where: {
        id,
      },
    })

    return checkIn
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const checkIn = prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfTheDay.toDate(),
          lte: endOfTheDay.toDate(),
        },
      },
    })

    return checkIn
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = prisma.checkIn.create({
      data,
    })

    return checkIn
  }

  async findManyByUserId(userId: string, page: number) {
    const checkIns = prisma.checkIn.findMany({
      where: {
        user_id: userId,
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return checkIns
  }

  async countByUserId(userId: string): Promise<number> {
    const count = await prisma.checkIn.count({
      where: {
        user_id: userId,
      },
    })

    return count
  }

  async save(data: CheckIn): Promise<CheckIn> {
    const checkIn = prisma.checkIn.update({
      where: {
        id: data.id,
      },
      data,
    })

    return checkIn
  }
}
