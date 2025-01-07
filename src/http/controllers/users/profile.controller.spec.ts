import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { app } from '@/app';

describe('Profile User e2e', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to get user profile', async () => {
    await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@acme.com',
      password: '123456789',
    });

    const { body } = await request(app.server).post('/sessions').send({
      email: 'johndoe@acme.com',
      password: '123456789',
    });

    const { content } = body;

    const profileResponse = await request(app.server)
      .get('/profile')
      .set('Authorization', `Bearer ${content.token}`)
      .send();

    expect(profileResponse.status).toEqual(200);
    expect(profileResponse.body.content).toEqual(
      expect.objectContaining({
        email: 'johndoe@acme.com',
      }),
    );
  });
});
