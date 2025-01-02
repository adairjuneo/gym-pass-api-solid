import { Prisma, type User } from '@prisma/client';

import { db } from '@/lib/db';

import type { UsersRepository } from './interfaces/interface-users.repository';

export class PrismaUsersRepository implements UsersRepository {
  async findByEmail(email: string): Promise<User | null> {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await db.user.create({
      data,
    });

    return user;
  }
}
