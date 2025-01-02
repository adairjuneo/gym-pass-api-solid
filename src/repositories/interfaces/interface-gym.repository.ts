import { Gym, type Prisma } from '@prisma/client';

export interface GymRepository {
  create(data: Prisma.GymUncheckedCreateInput): Promise<Gym>;
  findById(gymId: string): Promise<Gym | null>;
}
