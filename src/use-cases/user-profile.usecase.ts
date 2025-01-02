import { User } from '@prisma/client';

import { UsersRepository } from '@/repositories/interfaces/interface-users.repository';

import { ResourceNotFoundError } from './errors/resource-not-found.error';

interface UserProfileUseCaseRequest {
  id: string;
}

interface UserProfileUseCaseResponse {
  user: User;
}

export class UserProfileUseCase {
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
