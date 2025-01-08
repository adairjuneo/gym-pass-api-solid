import bcrypt from 'bcryptjs';
import { FastifyInstance } from 'fastify';
import request from 'supertest';

import { env } from '@/env';
import { db } from '@/lib/db';

export const createAndAuthenticateUser = async (app: FastifyInstance, isAdminUser = false) => {
  const user = await db.user.create({
    data: {
      name: 'Admin User',
      email: 'admin.user@test.com',
      role: isAdminUser ? 'ADMIN' : 'MEMBER',
      passwordHash: await bcrypt.hash('123456abc', env.AUTH_SALT_PASSWORD_HASH),
    },
  });

  const { body } = await request(app.server).post('/users/sessions').send({
    email: user.email,
    password: '123456abc',
  });

  const { content } = body;

  return { token: content.token };
};
