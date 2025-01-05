import { Gym } from '@prisma/client';

import { GymRepository } from '@/repositories/interfaces/gym.interface';
import { PrismaGymsRepository } from '@/repositories/prisma/gyms.repository';

interface ListNearbyGymsUseCaseRequest {
  userLatitude: number;
  userLongitude: number;
}

interface ListNearbyGymsUseCaseResponse {
  gyms: Gym[];
}

class ListNearbyGymsUseCase {
  constructor(private gymRepository: GymRepository) {}

  async execute(data: ListNearbyGymsUseCaseRequest): Promise<ListNearbyGymsUseCaseResponse> {
    const { userLatitude, userLongitude } = data;

    const gyms = await this.gymRepository.listNearbyGyms(userLatitude, userLongitude);

    return { gyms };
  }
}

const makeListNearbyGymsUseCase = () => {
  const gymRepository = new PrismaGymsRepository();
  const getUserMetricsUseCase = new ListNearbyGymsUseCase(gymRepository);

  return getUserMetricsUseCase;
};

export { ListNearbyGymsUseCase, makeListNearbyGymsUseCase };
