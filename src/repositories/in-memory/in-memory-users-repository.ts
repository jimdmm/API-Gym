import { User, Prisma } from '@prisma/client'
import { IUsersRepository } from '../users-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryUsersRepository implements IUsersRepository {
  public users: User[] = []

  async findById(id: string): Promise<User | null> {
    const createdUser = this.users.find((user) => user.id === id)

    if (!createdUser) return null

    return createdUser
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === email)

    if (!user) return null

    return user
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    }

    this.users.push(user)

    return user
  }
}
