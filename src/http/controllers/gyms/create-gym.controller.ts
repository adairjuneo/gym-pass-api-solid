import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { makeCreateGymUseCase } from '@/use-cases/create-gym.usecase';

export const createGym = async (request: FastifyRequest, reply: FastifyReply) => {
  const { t } = request;

  const createGymBodySchema = z.object({
    name: z.string({ message: t('validation.required') }),
    phone: z.string().nullable(),
    description: z.string().nullable(),
    latitude: z.coerce.number({ message: t('validation.required') }).refine(
      (latitude) => {
        return Math.abs(latitude) <= 90;
      },
      { message: t('validation.gym.requiredLatitude') },
    ),
    longitude: z.coerce.number({ message: t('validation.required') }).refine(
      (longitude) => {
        return Math.abs(longitude) <= 180;
      },
      { message: t('validation.gym.requiredLongitude') },
    ),
  });

  const { name, phone, description, latitude, longitude } = createGymBodySchema.parse(request.body);

  const createGym = makeCreateGymUseCase();

  const { gym } = await createGym.execute({ name, phone, description, latitude, longitude });

  reply.status(201).send({ content: gym });
};
