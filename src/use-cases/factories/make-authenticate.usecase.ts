import { PrismaUsersRepository } from '@/repositories/prisma-users.repository';

import { AuthenticateUseCase } from '../authenticate.usecase';

export const makeAuthenticateUseCase = () => {
  const userRepository = new PrismaUsersRepository();
  const authenticateUseCase = new AuthenticateUseCase(userRepository);

  return authenticateUseCase;
};
