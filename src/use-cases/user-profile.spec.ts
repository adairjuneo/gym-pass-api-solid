import bcrypt from 'bcryptjs';
import { beforeEach, describe, expect, it } from 'vitest';

import { env } from '@/env';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users.repository';

import { ResourceNotFoundError } from './errors/resource-not-found.error';
import { UserProfileUseCase } from './user-profile.usecase';

let userRepository: InMemoryUsersRepository;
let userProfileUseCase: UserProfileUseCase;

describe('User Profile Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository();
    userProfileUseCase = new UserProfileUseCase(userRepository);
  });

  it('should be able to get user profile', async () => {
    const createdUser = await userRepository.create({
      name: 'John Doe',
      email: 'john.doe@tests.com',
      passwordHash: await bcrypt.hash('987654321', env.AUTH_SALT_PASSWORD_HASH),
    });

    const { user } = await userProfileUseCase.execute({
      id: createdUser.id,
    });

    expect(user.id).toEqual(expect.any(String));
    expect(user.name).toEqual(createdUser.name);
    expect(user.email).toEqual(createdUser.email);
  });

  it('should not be able to get user profile with wrong id', async () => {
    await expect(
      userProfileUseCase.execute({
        id: '9999999',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
