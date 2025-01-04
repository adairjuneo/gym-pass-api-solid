import { CheckIn, Prisma } from '@prisma/client';

export interface CheckInRepository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>;
  saveCheckIn(checkIn: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>;
  findById(checkInId: string): Promise<CheckIn | null>;
  countByUserId(userId: string): Promise<number>;
  findManyByUserId(userId: string, page: number): Promise<CheckIn[]>;
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>;
}
