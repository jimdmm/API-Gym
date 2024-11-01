import { IUsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetUsersProfileUseCaseRequest {
  userId: string
}

interface GetUsersProfileUseCaseResponse {
  user: User
}

export class GetUsersProfileUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    userId,
  }: GetUsersProfileUseCaseRequest): Promise<GetUsersProfileUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return {
      user,
    }
  }
}
