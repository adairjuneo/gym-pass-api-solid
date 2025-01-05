import { User } from '@prisma/client';

import { UsersRepository } from '@/repositories/interfaces/users.interface';
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users.repository';

import { ResourceNotFoundError } from './errors/resource-not-found.error';

interface UserProfileUseCaseRequest {
  id: string;
}

interface UserProfileUseCaseResponse {
  user: User;
}

class UserProfileUseCase {
  constructor(private usersRespository: UsersRepository) {}
  async execute(data: UserProfileUseCaseRequest): Promise<UserProfileUseCaseResponse> {
    const { id } = data;

    const user = await this.usersRespository.findById(id);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    return { user };
  }
}

const makeUserProfileUseCase = () => {
  const userRepository = new PrismaUsersRepository();
  const userProfileUseCase = new UserProfileUseCase(userRepository);

  return userProfileUseCase;
};

export { makeUserProfileUseCase, UserProfileUseCase };
