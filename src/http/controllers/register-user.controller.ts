import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists.error';
import { makeRegisterUserUseCase } from '@/use-cases/register-user.usecase';

export const registerUser = async (request: FastifyRequest, reply: FastifyReply) => {
  const { t } = request;

  const registerBodySchema = z.object({
    name: z.string({ message: t('validation.required') }),
    email: z.string({ message: t('validation.required') }).email({ message: t('validation.email') }),
    password: z.string({ message: t('validation.required') }).min(6, { message: t('validation.min', { min: 6 }) }),
  });

  const { name, email, password } = registerBodySchema.parse(request.body);

  try {
    const registerUser = makeRegisterUserUseCase();

    await registerUser.execute({ name, email, password });
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }

  reply.status(201).send();
};
