import { randomUUID } from 'node:crypto';

import { CheckIn, Prisma } from '@prisma/client';
import dayjs from 'dayjs';

import { CheckInRepository } from '../interfaces/interface-check-in.repository';

export class InMemoryCheckInRepository implements CheckInRepository {
  public items: CheckIn[] = [];

  async findById(id: string): Promise<CheckIn | null> {
    const checkIn = this.items.find((item) => item.id === id);

    if (!checkIn) return null;

    return checkIn;
  }

  async findManyByUserId(userId: string, page: number): Promise<CheckIn[]> {
    const checkIns = this.items.filter((item) => item.userId === userId).slice((page - 1) * 20, page * 20);

    return checkIns;
  }

  async countByUserId(userId: string): Promise<number> {
    const countCheckIns = this.items.filter((item) => item.userId === userId).length;

    return countCheckIns;
  }

  async findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null> {
    const startOfTheDay = dayjs(date).startOf('date');
    const endOfTheDay = dayjs(date).endOf('date');

    const checkInOnSameDate = this.items.find((checkIn) => {
      const checkInDate = dayjs(checkIn.createdAt);
      const isOnSameDate = checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay);

      return checkIn.userId === userId && isOnSameDate;
    });

    if (!checkInOnSameDate) {
      return null;
    }

    return checkInOnSameDate;
  }

  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkIn = {
      id: data.id ?? randomUUID(),
      userId: data.userId,
      gymId: data.gymId,
      validatedAt: data.validatedAt ? new Date(data.validatedAt) : null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.items.push(checkIn);

    return checkIn;
  }

  async saveCheckIn(checkIn: CheckIn): Promise<CheckIn> {
    const checkInIndex = this.items.findIndex((checkInItem) => checkInItem.id === checkIn.id);

    if (checkInIndex >= 0) this.items[checkInIndex] = checkIn;

    return checkIn;
  }
}
