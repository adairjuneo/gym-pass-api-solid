import type { FastifyInstance } from 'fastify';

import { verifyJWT } from '@/http/middlewares/verify-jwt.middleware';

import { createGym } from './create-gym.controller';
import { listGyms } from './list-gyms.controller';
import { listNearbyGyms } from './list-nearby-gyms.controller';

export const gymsRoutes = async (app: FastifyInstance) => {
  app.addHook('onRequest', verifyJWT);

  app.post('/', createGym);
  app.get('/', listGyms);
  app.get('/nearby', listNearbyGyms);
};
