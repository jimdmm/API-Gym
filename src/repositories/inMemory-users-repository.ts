import { Prisma } from '@prisma/client'

export class InMemoryUsersRepository {
  private users: any[] = []

  async create(data: Prisma.UserCreateInput) {
    const user = this.users.push(data)

    return user
  }
}
