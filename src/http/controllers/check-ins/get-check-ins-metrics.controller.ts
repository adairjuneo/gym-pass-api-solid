import { FastifyReply, FastifyRequest } from 'fastify';

import { makeGetUserMetricsUseCase } from '@/use-cases/get-user-metrics.usecase';

export const getCheckInsMetrics = async (request: FastifyRequest, reply: FastifyReply) => {
  const getCheckInsMetrics = makeGetUserMetricsUseCase();

  const { checkInsCount } = await getCheckInsMetrics.execute({ userId: request.user.sub });

  reply.status(200).send({ content: checkInsCount });
};
