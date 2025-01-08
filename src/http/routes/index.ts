import { FastifyInstance } from 'fastify';

import { checkInsRoutes } from '../controllers/check-ins/routes';
import { gymsRoutes } from '../controllers/gyms/routes';
import { usersRoutes } from '../controllers/users/routes';

export const appRoutes = async (app: FastifyInstance) => {
  app.register(usersRoutes, { prefix: '/users' });
  app.register(gymsRoutes, { prefix: '/gyms' });
  app.register(checkInsRoutes, { prefix: '/check-ins' });
};
