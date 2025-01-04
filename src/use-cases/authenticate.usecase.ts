import { User } from '@prisma/client';
import bcrypt from 'bcryptjs';

import { UsersRepository } from '@/repositories/interfaces/users.interface';

import { InvalidCredentialsError } from './errors/invalid-credentials.error';

interface AuthenticateUseCaseRequest {
  email: string;
  password: string;
}

interface AuthenticateUseCaseResponse {
  user: User;
}

export class AuthenticateUseCase {
  constructor(private usersRespository: UsersRepository) {}
  async execute(data: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const { email, password } = data;

    const user = await this.usersRespository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const doesPasswordMatch = await bcrypt.compare(password, user.passwordHash);

    if (!doesPasswordMatch) {
      throw new InvalidCredentialsError();
    }

    return { user };
  }
}
