import bcrypt from 'bcryptjs';

import { env } from '@/env';
import type { UsersRepository } from '@/repositories/interfaces/interface-users.repository';

import { UserAlreadyExistsError } from './errors/user-already-exists.error';

interface RegisterUserUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

export class RegisterUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(data: RegisterUserUseCaseRequest) {
    const { name, email, password } = data;

    const passwordHash = await bcrypt.hash(password, env.AUTH_SALT_PASSWORD_HASH);

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const user = await this.usersRepository.create({ name, email, passwordHash });

    return user;
  }
}
