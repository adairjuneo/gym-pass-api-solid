import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { app } from '@/app';

describe('Refresh Token e2e', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to refresh a token', async () => {
    await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@acme.com',
      password: '123456789',
    });

    const response = await request(app.server).post('/users/sessions').send({
      email: 'johndoe@acme.com',
      password: '123456789',
    });

    const cookies = response.get('Set-Cookie');

    const responseRefresh = await request(app.server)
      .patch('/users/refresh-token')
      .set('Cookie', cookies || [])
      .send();

    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      content: {
        token: expect.any(String),
      },
    });
    expect(responseRefresh.get('Set-Cookie')).toEqual([expect.stringContaining('refreshToken=')]);
  });
});
