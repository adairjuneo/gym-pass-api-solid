import { FastifyInstance } from 'fastify';
import { z } from 'zod';

import { db } from '@/lib/db';

export const createUser = async (app: FastifyInstance) => {
  app.post('/users', async (request, reply) => {
    const { t } = request;

    const registerBodySchema = z.object({
      name: z.string({ message: t('validation.required') }),
      email: z.string({ message: t('validation.required') }).email({ message: t('validation.email') }),
      password: z.string({ message: t('validation.required') }).min(6, { message: t('validation.min', { min: 6 }) }),
    });

    const { name, email, password } = registerBodySchema.parse(request.body);

    const user = await db.user.create({
      data: {
        name,
        email,
        passwordHash: password,
      },
    });

    reply.status(201).send({ content: user });
  });
};

export const getUsers = async (app: FastifyInstance) => {
  app.get('/users', async (_request, reply) => {
    const users = await db.user.findMany();

    reply.status(200).send({ content: users });
  });
};
