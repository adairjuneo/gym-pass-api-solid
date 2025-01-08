import { faker } from '@faker-js/faker';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';

import { app } from '@/app';
import { createAndAuthenticateUser } from '@/utils/create-and-authenticate-user';

describe('Validate Check-in e2e', () => {
  beforeAll(async () => {
    await app.ready();

    vi.useFakeTimers();
  });

  afterAll(async () => {
    await app.close();

    vi.useRealTimers();
  });

  it('should be able to validate a check-in', async () => {
    const { token } = await createAndAuthenticateUser(app);

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

    const validatedCheckInResponse = await request(app.server)
      .patch(`/check-ins/validate/${checkInResponse.body.content.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(validatedCheckInResponse.status).toEqual(200);
    expect(validatedCheckInResponse.body.content.validatedAt).toEqual(expect.any(String));
  });
});
