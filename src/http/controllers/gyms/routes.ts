import type { FastifyInstance } from 'fastify';

import { verifyJWT } from '@/http/middlewares/verify-jwt.middleware';
import { verifyUserRole } from '@/http/middlewares/verify-user-role.middleware';

import { createGym } from './create-gym.controller';
import { listGyms } from './list-gyms.controller';
import { listNearbyGyms } from './list-nearby-gyms.controller';

export const gymsRoutes = async (app: FastifyInstance) => {
  app.addHook('onRequest', verifyJWT);

  app.post('/', { onRequest: [verifyUserRole('ADMIN')] }, createGym);
  app.get('/', listGyms);
  app.get('/nearby', listNearbyGyms);
};
