import { CheckIn, Prisma } from '@prisma/client';
import dayjs from 'dayjs';

import { env } from '@/env';
import { db } from '@/lib/db';

import { CheckInRepository } from '../interfaces/check-in.interface';

export class PrismaCheckInsRepository implements CheckInRepository {
  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkIn = await db.checkIn.create({ data });

    return checkIn;
  }

  async saveCheckIn(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkIn = await db.checkIn.update({
      where: {
        id: data.id,
      },
      data,
    });

    return checkIn;
  }

  async findById(checkInId: string): Promise<CheckIn | null> {
    const checkIn = await db.checkIn.findUnique({
      where: {
        id: checkInId,
      },
    });

    return checkIn;
  }

  async countByUserId(userId: string): Promise<number> {
    const countedCheckIns = await db.checkIn.count({
      where: {
        userId: userId,
      },
    });

    return countedCheckIns;
  }

  async findManyByUserId(userId: string, page: number): Promise<CheckIn[]> {
    const checkInsList = await db.checkIn.findMany({
      where: {
        userId: userId,
      },
      take: env.PAGINATION_PAGE_SIZE,
      skip: (page - 1) * env.PAGINATION_PAGE_SIZE,
    });

    return checkInsList;
  }

  async findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null> {
    const startOfTheDay = dayjs(date).startOf('date');
    const endOfTheDay = dayjs(date).endOf('date');

    const checkIns = await db.checkIn.findFirst({
      where: {
        userId: userId,
        createdAt: {
          gte: startOfTheDay.toDate(),
          lte: endOfTheDay.toDate(),
        },
      },
    });

    return checkIns;
  }
}
