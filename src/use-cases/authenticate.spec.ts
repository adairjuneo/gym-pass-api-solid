import bcrypt from 'bcryptjs';
import { beforeEach, describe, expect, it } from 'vitest';

import { env } from '@/env';

import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users.repository';
import { AuthenticateUseCase } from './authenticate.usecase';
import { InvalidCredentialsError } from './errors/invalid-credentials.error';

let userRepository: InMemoryUsersRepository;
let authenticateUseCase: AuthenticateUseCase;

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository();
    authenticateUseCase = new AuthenticateUseCase(userRepository);
  });

  it('should be able to authenticate', async () => {
    await userRepository.create({
      name: 'John Doe',
      email: 'john.doe@tests.com',
      passwordHash: await bcrypt.hash('987654321', env.AUTH_SALT_PASSWORD_HASH),
    });

    const { user } = await authenticateUseCase.execute({
      email: 'john.doe@tests.com',
      password: '987654321',
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it('should not be able to authenticate with wrong e-mail', async () => {
    await expect(
      authenticateUseCase.execute({
        email: 'john.doe@tests.com',
        password: '987654321',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await userRepository.create({
      name: 'John Doe',
      email: 'john.doe@tests.com',
      passwordHash: await bcrypt.hash('987654321', env.AUTH_SALT_PASSWORD_HASH),
    });

    await expect(
      authenticateUseCase.execute({
        email: 'john.doe@tests.com',
        password: '12345678',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
