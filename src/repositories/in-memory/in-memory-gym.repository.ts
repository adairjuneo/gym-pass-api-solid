import { randomUUID } from 'node:crypto';

import { Gym, Prisma } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

import { GymRepository } from '../interfaces/interface-gym.repository';

export class InMemoryGymRepository implements GymRepository {
  public items: Gym[] = [];

  async findById(gymId: string): Promise<Gym | null> {
    const gym = this.items.find((item) => item.id === gymId);

    if (!gym) return null;

    return gym;
  }

  async create(data: Prisma.GymUncheckedCreateInput): Promise<Gym> {
    const gym = {
      id: data.id || randomUUID(),
      name: data.name,
      description: data.description || null,
      phone: data.phone || null,
      latitude: new Decimal(Number(data.latitude)),
      longitude: new Decimal(Number(data.longitude)),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.items.push(gym);

    return gym;
  }
}
