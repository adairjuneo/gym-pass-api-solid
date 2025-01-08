import type { FastifyInstance } from 'fastify';

import { verifyJWT } from '@/http/middlewares/verify-jwt.middleware';

import { authenticate } from './authenticate.controller';
import { listUsers } from './list-users.controller';
import { getProfile } from './profile.controller';
import { refreshToken } from './refresh-token.controller';
import { registerUser } from './register-user.controller';

export const usersRoutes = async (app: FastifyInstance) => {
  // Public
  app.post('/', registerUser);
  app.post('/sessions', authenticate);
  app.patch('/refresh-token', refreshToken);

  // Authenticated
  app.get('/', { onRequest: [verifyJWT] }, listUsers);
  app.get('/profile', { onRequest: [verifyJWT] }, getProfile);
};
