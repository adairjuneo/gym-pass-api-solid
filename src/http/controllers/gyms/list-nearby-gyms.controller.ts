import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { makeListNearbyGymsUseCase } from '@/use-cases/list-nearby-gyms.usecase';

export const listNearbyGyms = async (request: FastifyRequest, reply: FastifyReply) => {
  const { t } = request;

  const listNearbyGymsQuerySchema = z.object({
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

  const { latitude, longitude } = listNearbyGymsQuerySchema.parse(request.query);

  const listNearbyGyms = makeListNearbyGymsUseCase();

  const { gyms } = await listNearbyGyms.execute({ userLatitude: latitude, userLongitude: longitude });

  reply.status(200).send({ content: gyms });
};
