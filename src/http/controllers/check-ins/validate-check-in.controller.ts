import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { makeValidateCheckInUseCase } from '@/use-cases/validate-check-in.usecase';

export const validateCheckIn = async (request: FastifyRequest, reply: FastifyReply) => {
  const { t } = request;

  const validateCheckInParamsSchema = z.object({
    checkInId: z.string({ message: t('validation.required') }).uuid({ message: t('validation.uuid') }),
  });

  const { checkInId } = validateCheckInParamsSchema.parse(request.params);

  const validateCheckIn = makeValidateCheckInUseCase();

  const { checkIn } = await validateCheckIn.execute({ checkInId });

  reply.status(200).send({ content: checkIn });
};
