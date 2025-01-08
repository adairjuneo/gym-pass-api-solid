import { faker } from '@faker-js/faker';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { app } from '@/app';
import { createAndAuthenticateUser } from '@/utils/create-and-authenticate-user';

describe('Create Check-in e2e', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to create a Check-in', async () => {
    const { token } = await createAndAuthenticateUser(app, true);

    const mockGym = {
      name: faker.company.name(),
      phone: faker.phone.number(),
      description: faker.lorem.sentence(5),
      latitude: -16.718085,
      longitude: -43.825964,
    };

    const gymResponse = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({ ...mockGym });

    const checkInResponse = await request(app.server)
      .post(`/check-ins/${gymResponse.body.content.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ latitude: -16.718085, longitude: -43.825964 });

    expect(checkInResponse.status).toEqual(201);
    expect(checkInResponse.body.content).toEqual(expect.objectContaining({ id: expect.any(String) }));
  });
});
