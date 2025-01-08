import { faker } from '@faker-js/faker';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { app } from '@/app';
import { createAndAuthenticateUser } from '@/utils/create-and-authenticate-user';

describe('List Gyms e2e', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to list and search a gym', async () => {
    const { token } = await createAndAuthenticateUser(app);

    for (let i = 0; i < 3; i++) {
      const mockGym = {
        name: `Gym Test 0${i}`,
        phone: faker.phone.number(),
        description: faker.lorem.sentence(5),
        latitude: faker.location.latitude({ max: -16, min: -17 }),
        longitude: faker.location.longitude({ max: -43, min: -44 }),
      };

      await request(app.server)
        .post('/gyms')
        .set('Authorization', `Bearer ${token}`)
        .send({ ...mockGym });
    }

    const listGymsResponse = await request(app.server)
      .get('/gyms')
      .query({ query: '02' })
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(listGymsResponse.status).toEqual(200);
    expect(listGymsResponse.body.content).toHaveLength(1);
    expect(listGymsResponse.body.content[0]).toEqual(
      expect.objectContaining({
        name: 'Gym Test 02',
      }),
    );
  });
});
