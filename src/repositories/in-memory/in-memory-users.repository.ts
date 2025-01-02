import { randomUUID } from 'node:crypto';

import { Prisma, User } from '@prisma/client';

import { UsersRepository } from '../interfaces/interface-users.repository';

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = [];

  async findById(id: string): Promise<User | null> {
    const user = this.items.find((item) => item.id === id);

    if (!user) return null;

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((item) => item.email === email);

    if (!user) return null;

    return user;
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: data.id || randomUUID(),
      name: data.name,
      email: data.email,
      passwordHash: data.passwordHash,
      createdAt: new Date(),
      profileUrl: data.profileUrl || null,
      updatedAt: new Date(),
    };

    this.items.push(user);

    return user;
  }
}
