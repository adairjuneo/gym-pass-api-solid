import type { FastifyInstance } from 'fastify';

import { verifyJWT } from '@/http/middlewares/verify-jwt.middleware';

import { createCheckIn } from './create-check-in.controller';
import { getCheckInsMetrics } from './get-check-ins-metrics.controller';
import { listCheckInsHistory } from './list-check-ins-history.controller';
import { validateCheckIn } from './validate-check-in.controller';

export const checkInsRoutes = async (app: FastifyInstance) => {
  app.addHook('onRequest', verifyJWT);

  app.post('/:gymId', createCheckIn);
  app.get('/history', listCheckInsHistory);
  app.get('/metrics', getCheckInsMetrics);
  app.post('/validate/:checkInId', validateCheckIn);
};
