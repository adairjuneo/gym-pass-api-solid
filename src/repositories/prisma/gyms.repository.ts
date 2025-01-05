import { Gym, Prisma } from '@prisma/client';

import { env } from '@/env';
import { db } from '@/lib/db';

import { GymRepository } from '../interfaces/gym.interface';

export class PrismaGymsRepository implements GymRepository {
  async create(data: Prisma.GymUncheckedCreateInput): Promise<Gym> {
    const gym = db.gym.create({
      data,
    });

    return gym;
  }

  async findById(gymId: string): Promise<Gym | null> {
    const gym = await db.gym.findUnique({
      where: {
        id: gymId,
      },
    });

    return gym;
  }

  async listGymsByQuery(query: string, page: number): Promise<Gym[]> {
    const gyms = await db.gym.findMany({
      where: {
        name: {
          contains: query,
        },
      },
      take: env.PAGINATION_PAGE_SIZE,
      skip: (page - 1) * env.PAGINATION_PAGE_SIZE,
    });

    return gyms;
  }

  async listNearbyGyms(userLatitude: number, userLongitude: number): Promise<Gym[]> {
    const gyms = await db.$queryRaw<Gym[]>`
    SELECT * from gyms
    WHERE ( 6371 * acos( cos( radians(${userLatitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - 
      radians(${userLongitude}) ) + sin( radians(${userLatitude}) ) * sin( radians( latitude ) ) ) 
      ) <= ${env.MAX_DISTANCE_NEARBY_IN_KILOMETERS}
    `;

    return gyms;
  }
}
