import { FastifyInstance } from 'fastify';

import { listUsers } from '@/http/controllers/list-users.controller';
import { registerUser } from '@/http/controllers/register-user.controller';

import { authenticate } from '../controllers/authenticate.controller';

export const appRoutes = async (app: FastifyInstance) => {
  app.post('/users', registerUser);
  app.get('/users', listUsers);
  app.post('/sessions', authenticate);
};
