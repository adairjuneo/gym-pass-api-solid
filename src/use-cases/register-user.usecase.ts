import { User } from '@prisma/client';
import bcrypt from 'bcryptjs';

import { env } from '@/env';
import { UsersRepository } from '@/repositories/interfaces/users.interface';
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users.repository';

import { UserAlreadyExistsError } from './errors/user-already-exists.error';

interface RegisterUserUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

interface RegisterUserUseCaseResponse {
  user: User;
}
class RegisterUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(data: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
    const { name, email, password } = data;

    const passwordHash = await bcrypt.hash(password, env.AUTH_SALT_PASSWORD_HASH);

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const user = await this.usersRepository.create({ name, email, passwordHash });

    return { user };
  }
}

const makeRegisterUserUseCase = () => {
  const userRepository = new PrismaUsersRepository();
  const registerUserUseCase = new RegisterUserUseCase(userRepository);

  return registerUserUseCase;
};

export { makeRegisterUserUseCase, RegisterUserUseCase };
