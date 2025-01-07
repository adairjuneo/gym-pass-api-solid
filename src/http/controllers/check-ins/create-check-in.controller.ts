import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { makeCheckInUseCase } from '@/use-cases/check-in.usecase';

export const createCheckIn = async (request: FastifyRequest, reply: FastifyReply) => {
  const { t } = request;

  const createCheckInParamsSchema = z.object({
    gymId: z.string({ message: t('validation.required') }).uuid({ message: t('validation.uuid') }),
  });

  const createCheckInBodySchema = z.object({
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

  const { gymId } = createCheckInParamsSchema.parse(request.params);
  const { latitude, longitude } = createCheckInBodySchema.parse(request.body);

  const createCheckIn = makeCheckInUseCase();

  const { checkIn } = await createCheckIn.execute({
    userId: request.user.sub,
    gymId: gymId,
    userLatitude: latitude,
    userLongitude: longitude,
  });

  reply.status(201).send({ content: checkIn });
};
