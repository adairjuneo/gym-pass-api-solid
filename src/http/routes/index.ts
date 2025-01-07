import { FastifyInstance } from 'fastify';

import { gymsRoutes } from '../controllers/gyms/routes';
import { usersRoutes } from '../controllers/users/routes';

export const appRoutes = async (app: FastifyInstance) => {
  app.register(usersRoutes, { prefix: '/users' });
  app.register(gymsRoutes, { prefix: '/gyms' });
};
