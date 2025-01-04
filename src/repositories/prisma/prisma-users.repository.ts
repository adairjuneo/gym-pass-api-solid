import { Prisma, type User } from '@prisma/client';

import { db } from '@/lib/db';

import { UsersRepository } from '../interfaces/users.interface';

export class PrismaUsersRepository implements UsersRepository {
  async findById(id: string): Promise<User | null> {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }

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
