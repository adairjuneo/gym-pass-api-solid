import { Gym } from '@prisma/client';

import { GymRepository } from '@/repositories/interfaces/gym.interface';

interface ListGymsUseCaseRequest {
  query: string;
  page: number;
}

interface ListGymsUseCaseResponse {
  gyms: Gym[];
}

export class ListGymsUseCase {
  constructor(private gymRepository: GymRepository) {}

  async execute(data: ListGymsUseCaseRequest): Promise<ListGymsUseCaseResponse> {
    const { query, page } = data;

    const gyms = await this.gymRepository.listGymsByQuery(query, page);

    return { gyms };
  }
}
