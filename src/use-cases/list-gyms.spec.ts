import { beforeEach, describe, expect, it } from 'vitest';

import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gym.repository';

import { ListGymsUseCase } from './list-gyms.usecase';

let gymsRepository: InMemoryGymRepository;
let listGymsUseCase: ListGymsUseCase;

describe('List Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymRepository();
    listGymsUseCase = new ListGymsUseCase(gymsRepository);
  });

  it('should be able to list gyms', async () => {
    await gymsRepository.create({
      name: 'Gym Teste MOCK',
      description: 'Gym Teste MOCK',
      phone: '38123456789',
      latitude: -16.718085,
      longitude: -43.825964,
    });

    await gymsRepository.create({
      name: 'Gym Teste MOCK 2',
      description: 'Gym Teste MOCK 2',
      phone: '38123456789',
      latitude: -16.718082,
      longitude: -43.825963,
    });

    const { gyms } = await listGymsUseCase.execute({
      query: 'Teste MOCK',
      page: 1,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ name: 'Gym Teste MOCK' }),
      expect.objectContaining({ name: 'Gym Teste MOCK 2' }),
    ]);
  });

  it('should be able to list gyms', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        name: String('Gym Teste MOCK ').concat(i.toString()),
        description: 'Gym Teste MOCK',
        phone: '38123456789',
        latitude: -16.718085,
        longitude: -43.825964,
      });
    }

    const { gyms } = await listGymsUseCase.execute({
      query: 'Teste MOCK',
      page: 2,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ name: 'Gym Teste MOCK 21' }),
      expect.objectContaining({ name: 'Gym Teste MOCK 22' }),
    ]);
  });
});
