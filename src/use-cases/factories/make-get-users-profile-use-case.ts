import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { GetUsersProfileUseCase } from '../get-users-profile'

export function makeGetUsersProfileUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const useCase = new GetUsersProfileUseCase(usersRepository)

  return useCase
}
