import { FastifyInstance } from 'fastify';

import { listUsers } from '@/http/controllers/list-users.controller';
import { registerUser } from '@/http/controllers/register-user.controller';

import { authenticate } from '../controllers/authenticate.controller';
import { getProfile } from '../controllers/profile.controller';
import { verifyJWT } from '../middlewares/verify-jwt.middleware';

export const appRoutes = async (app: FastifyInstance) => {
  // Public
  app.post('/users', registerUser);
  app.post('/sessions', authenticate);

  // Authenticated
  app.get('/users', { onRequest: [verifyJWT] }, listUsers);
  app.get('/profile', { onRequest: [verifyJWT] }, getProfile);
};
