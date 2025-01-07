import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { makeListGymsUseCase } from '@/use-cases/list-gyms.usecase';

export const listGyms = async (request: FastifyRequest, reply: FastifyReply) => {
  const listGymsQuerySchema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
  });

  const { page, query } = listGymsQuerySchema.parse(request.query);

  const listGyms = makeListGymsUseCase();

  const { gyms } = await listGyms.execute({ page, query });

  reply.status(200).send({ content: gyms });
};
