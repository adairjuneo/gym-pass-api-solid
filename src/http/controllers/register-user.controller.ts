import { User } from '@prisma/client';
import { FastifyReply, FastifyRequest } from 'fastify';
import _ from 'lodash';
import { z } from 'zod';

import { PrismaUsersRepository } from '@/repositories/prisma-users.repository';
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists.error';
import { RegisterUserUseCase } from '@/use-cases/register-user.usecase';

export const registerUser = async (request: FastifyRequest, reply: FastifyReply) => {
  const { t } = request;

  let user: User;
  const registerBodySchema = z.object({
    name: z.string({ message: t('validation.required') }),
    email: z.string({ message: t('validation.required') }).email({ message: t('validation.email') }),
    password: z.string({ message: t('validation.required') }).min(6, { message: t('validation.min', { min: 6 }) }),
  });

  const { name, email, password } = registerBodySchema.parse(request.body);

  try {
    const userRepository = new PrismaUsersRepository();
    const registerUser = new RegisterUserUseCase(userRepository);

    user = await registerUser.execute({ name, email, password });
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }

  reply.status(201).send({ content: _.omit(user, ['passwordHash', 'createdAt', 'updatedAt']) });
};
