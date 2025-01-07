import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { makeListCheckInsHistoryUseCase } from '@/use-cases/list-check-ins-history.usecase';

export const listCheckInsHistory = async (request: FastifyRequest, reply: FastifyReply) => {
  const listCheckInsHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = listCheckInsHistoryQuerySchema.parse(request.query);

  const listCheckInsHistory = makeListCheckInsHistoryUseCase();

  const { checkIns } = await listCheckInsHistory.execute({ page, userId: request.user.sub });

  reply.status(200).send({ content: checkIns });
};
