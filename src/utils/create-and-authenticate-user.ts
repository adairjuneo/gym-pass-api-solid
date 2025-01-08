import { FastifyInstance } from 'fastify';
import request from 'supertest';

export const createAndAuthenticateUser = async (app: FastifyInstance) => {
  await request(app.server).post('/users').send({
    name: 'John Doe',
    email: 'johndoe@acme.com',
    password: '123456789',
  });

  const { body } = await request(app.server).post('/users/sessions').send({
    email: 'johndoe@acme.com',
    password: '123456789',
  });

  const { content } = body;

  return { token: content.token };
};
