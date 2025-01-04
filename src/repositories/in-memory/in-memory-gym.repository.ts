import { randomUUID } from 'node:crypto';

import { Gym, Prisma } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

import { env } from '@/env';
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates';

import { GymRepository } from '../interfaces/interface-gym.repository';

export class InMemoryGymRepository implements GymRepository {
  public items: Gym[] = [];

  async findById(gymId: string): Promise<Gym | null> {
    const gym = this.items.find((item) => item.id === gymId);

    if (!gym) return null;

    return gym;
  }

  async listGymsByQuery(query: string, page: number): Promise<Gym[]> {
    const gyms = this.items.filter((item) => item.name.includes(query)).slice((page - 1) * 20, page * 20);

    return gyms;
  }

  async listNearbyGyms(userLatitude: number, userLongitude: number): Promise<Gym[]> {
    const gyms = this.items.filter((gym) => {
      const distanceBetweenUserAndGym = getDistanceBetweenCoordinates(
        { latitude: userLatitude, longitude: userLongitude },
        { latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber() },
      );

      if (distanceBetweenUserAndGym <= env.MAX_DISTANCE_NEARBY_IN_KILOMETERS) {
        return gym;
      }
    });

    return gyms;
  }

  async create(data: Prisma.GymUncheckedCreateInput): Promise<Gym> {
    const gym = {
      id: data.id ?? randomUUID(),
      name: data.name,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Decimal(data.latitude.toString()),
      longitude: new Decimal(data.longitude.toString()),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.items.push(gym);

    return gym;
  }
}
