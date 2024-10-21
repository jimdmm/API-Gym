import { IUsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/users-already-exists-error'

interface RegisterServiceRequest {
  name: string
  email: string
  password: string
}
export class RegisterService {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ name, email, password }: RegisterServiceRequest) {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)
    
    if (userWithSameEmail) throw new UserAlreadyExistsError()

    await this.usersRepository.create({ 
      name,
      email,
      password_hash,
    })
  }
}
