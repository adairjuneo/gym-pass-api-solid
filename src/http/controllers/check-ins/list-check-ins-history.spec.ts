import { faker } from '@faker-js/faker';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';

import { app } from '@/app';
import { createAndAuthenticateUser } from '@/utils/create-and-authenticate-user';

describe('List History Check-ins e2e', () => {
  beforeAll(async () => {
    await app.ready();

    vi.useFakeTimers();
  });

  afterAll(async () => {
    await app.close();

    vi.useRealTimers();
  });

  it('should be able to list a history of check-ins', async () => {
    const { token } = await createAndAuthenticateUser(app, true);

    const twentyFiveHoursInMs = 1000 * 60 * 60 * 25;

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

    vi.setSystemTime(new Date(2024, 0, 1, 8, 0, 0));

    await request(app.server)
      .post(`/check-ins/${gymResponse.body.content.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ latitude: -16.718085, longitude: -43.825964 });

    vi.advanceTimersByTime(twentyFiveHoursInMs);

    await request(app.server)
      .post(`/check-ins/${gymResponse.body.content.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ latitude: -16.718085, longitude: -43.825964 });

    vi.advanceTimersByTime(twentyFiveHoursInMs);

    await request(app.server)
      .post(`/check-ins/${gymResponse.body.content.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ latitude: -16.718085, longitude: -43.825964 });

    const checkInResponse = await request(app.server)
      .get('/check-ins/history')
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(checkInResponse.status).toEqual(200);
    expect(checkInResponse.body.content).toHaveLength(3);
  });
});
