import { faker } from '@faker-js/faker';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { app } from '@/app';
import { createAndAuthenticateUser } from '@/utils/create-and-authenticate-user';

describe('Create Gym e2e', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to create a gym', async () => {
    const { token } = await createAndAuthenticateUser(app);

    const mockGym = {
      name: faker.company.name(),
      phone: faker.phone.number(),
      description: faker.lorem.sentence(5),
      latitude: faker.location.latitude({ max: -16, min: -17 }),
      longitude: faker.location.longitude({ max: -43, min: -44 }),
    };

    const gymResponse = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({ ...mockGym });

    expect(gymResponse.status).toEqual(201);
    expect(gymResponse.body.content).toEqual(expect.objectContaining({ id: expect.any(String) }));
  });
});
