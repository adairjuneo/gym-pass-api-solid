import { faker } from '@faker-js/faker';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { app } from '@/app';
import { createAndAuthenticateUser } from '@/utils/create-and-authenticate-user';

describe('List Nearby Gyms e2e', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to list nearby gyms', async () => {
    const { token } = await createAndAuthenticateUser(app);

    const mockGym = {
      name: faker.company.name(),
      phone: faker.phone.number(),
      description: faker.lorem.sentence(5),
    };

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({ ...mockGym, latitude: -16.718085, longitude: -43.825964 });

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({ ...mockGym, latitude: -16.713261, longitude: -43.814771 });

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({ ...mockGym, latitude: -16.834217, longitude: -43.942391 });

    const listGymsNearbyResponse = await request(app.server)
      .get('/gyms/nearby')
      .query({ latitude: -16.718085, longitude: -43.825964 })
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(listGymsNearbyResponse.status).toEqual(200);
    expect(listGymsNearbyResponse.body.content).toHaveLength(2);
  });
});
