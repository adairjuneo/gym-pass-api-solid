import { PrismaUsersRepository } from '@/repositories/prisma-users.repository';

import { RegisterUserUseCase } from '../register-user.usecase';

export const makeRegisterUserUseCase = () => {
  const userRepository = new PrismaUsersRepository();
  const registerUserUseCase = new RegisterUserUseCase(userRepository);

  return registerUserUseCase;
};
