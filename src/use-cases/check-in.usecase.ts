import { CheckIn } from '@prisma/client';

import { env } from '@/env';
import { CheckInRepository } from '@/repositories/interfaces/interface-check-in.repository';
import { GymRepository } from '@/repositories/interfaces/interface-gym.repository';
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates';

import { ResourceNotFoundError } from './errors/resource-not-found.error';

interface CheckInUseCaseRequest {
  userId: string;
  gymId: string;
  userLatitude: number;
  userLongitude: number;
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn;
}

export class CheckInUseCase {
  constructor(
    private checkInRespository: CheckInRepository,
    private gymRespository: GymRepository,
  ) {}
  async execute(data: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const { userId, gymId, userLatitude, userLongitude } = data;

    const gym = await this.gymRespository.findById(gymId);

    if (!gym) {
      throw new ResourceNotFoundError();
    }

    const distanceBetweenUserAndGym = getDistanceBetweenCoordinates(
      {
        latitude: userLatitude,
        longitude: userLongitude,
      },
      {
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber(),
      },
    );

    if (distanceBetweenUserAndGym > env.MAX_DISTANCE_IN_KILOMETERS) {
      throw new Error();
    }

    const checkInOnSameDate = await this.checkInRespository.findByUserIdOnDate(userId, new Date());

    if (checkInOnSameDate) {
      throw new Error();
    }

    const checkIn = await this.checkInRespository.create({ gymId, userId });

    return { checkIn };
  }
}
