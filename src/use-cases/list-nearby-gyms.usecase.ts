import { Gym } from '@prisma/client';

import { GymRepository } from '@/repositories/interfaces/interface-gym.repository';

interface ListNearbyGymsUseCaseRequest {
  userLatitude: number;
  userLongitude: number;
}

interface ListNearbyGymsUseCaseResponse {
  gyms: Gym[];
}

export class ListNearbyGymsUseCase {
  constructor(private gymRepository: GymRepository) {}

  async execute(data: ListNearbyGymsUseCaseRequest): Promise<ListNearbyGymsUseCaseResponse> {
    const { userLatitude, userLongitude } = data;

    const gyms = await this.gymRepository.listNearbyGyms(userLatitude, userLongitude);

    return { gyms };
  }
}
