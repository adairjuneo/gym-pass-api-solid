import { Gym } from '@prisma/client';

import { GymRepository } from '@/repositories/interfaces/gym.interface';
import { PrismaGymsRepository } from '@/repositories/prisma/gyms.repository';

interface ListGymsUseCaseRequest {
  query: string;
  page: number;
}

interface ListGymsUseCaseResponse {
  gyms: Gym[];
}

class ListGymsUseCase {
  constructor(private gymRepository: GymRepository) {}

  async execute(data: ListGymsUseCaseRequest): Promise<ListGymsUseCaseResponse> {
    const { query, page } = data;

    const gyms = await this.gymRepository.listGymsByQuery(query, page);

    return { gyms };
  }
}

const makeListGymsUseCase = () => {
  const gymRepository = new PrismaGymsRepository();
  const listGymsUseCase = new ListGymsUseCase(gymRepository);

  return listGymsUseCase;
};

export { ListGymsUseCase, makeListGymsUseCase };
