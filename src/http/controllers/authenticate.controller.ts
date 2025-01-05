import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { makeAuthenticateUseCase } from '@/use-cases/authenticate.usecase';
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials.error';

export const authenticate = async (request: FastifyRequest, reply: FastifyReply) => {
  const { t } = request;

  const authenticateBodySchema = z.object({
    email: z.string({ message: t('validation.required') }).email({ message: t('validation.email') }),
    password: z.string({ message: t('validation.required') }).min(6, { message: t('validation.min', { min: 6 }) }),
  });

  const { email, password } = authenticateBodySchema.parse(request.body);

  try {
    const authenticate = makeAuthenticateUseCase();

    const { user } = await authenticate.execute({ email, password });

    const tokenJwt = await reply.jwtSign({}, { sign: { sub: user.id } });

    reply.status(200).send({ content: tokenJwt });
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message });
    }

    throw err;
  }
};
