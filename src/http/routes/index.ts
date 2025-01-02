import { FastifyInstance } from 'fastify';

import { listUsers } from '@/http/controllers/list-users.controller';
import { registerUser } from '@/http/controllers/register-user.controller';

export const appRoutes = async (app: FastifyInstance) => {
  app.post('/users', registerUser);
  app.get('/users', listUsers);
};
