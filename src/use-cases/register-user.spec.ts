import bcrypt from 'bcryptjs';
import { beforeEach, describe, expect, it } from 'vitest';

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users.repository';

import { UserAlreadyExistsError } from './errors/user-already-exists.error';
import { RegisterUserUseCase } from './register-user.usecase';

let userRepository: InMemoryUsersRepository;
let registerUserUseCase: RegisterUserUseCase;

describe('Register User Use Case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository();
    registerUserUseCase = new RegisterUserUseCase(userRepository);
  });

  it('should be able to register', async () => {
    const { user } = await registerUserUseCase.execute({
      name: 'John Doe',
      email: 'john.doe@tests.com',
      password: '987654321',
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it('should hash user password upon registration', async () => {
    const { user } = await registerUserUseCase.execute({
      name: 'John Doe',
      email: 'john.doe@tests.com',
      password: '987654321',
    });

    const isPasswordCorrectlyHashed = await bcrypt.compare('987654321', user.passwordHash);

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it('should not be able to register with same e-mail twice', async () => {
    const email = 'john.doe@tests.com';

    await registerUserUseCase.execute({
      name: 'John Doe',
      email,
      password: '987654321',
    });

    await expect(
      registerUserUseCase.execute({
        name: 'John Doe',
        email,
        password: '987654321',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
