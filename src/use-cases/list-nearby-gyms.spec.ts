import { beforeEach, describe, expect, it } from 'vitest';

import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gym.repository';

import { ListNearbyGymsUseCase } from './list-nearby-gyms.usecase';

let gymsRepository: InMemoryGymRepository;
let listNearbyGymsUseCase: ListNearbyGymsUseCase;

describe('List Nearby Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymRepository();
    listNearbyGymsUseCase = new ListNearbyGymsUseCase(gymsRepository);
  });

  it('should be able to list gyms nearby within 10 km', async () => {
    await gymsRepository.create({
      name: 'Near Gym Teste MOCK',
      description: 'Gym Teste MOCK',
      phone: '38123456789',
      latitude: -16.718085,
      longitude: -43.825964,
    });

    await gymsRepository.create({
      name: 'Near Gym Teste MOCK 2',
      description: 'Gym Teste MOCK 2',
      phone: '38123456789',
      latitude: -16.713261,
      longitude: -43.814771,
    });

    await gymsRepository.create({
      name: 'Far Gym Teste MOCK 1',
      description: 'Gym Teste MOCK 1',
      phone: '38123456789',
      latitude: -16.834217,
      longitude: -43.942391,
    });

    const { gyms } = await listNearbyGymsUseCase.execute({
      userLatitude: -16.718085,
      userLongitude: -43.825964,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ name: 'Near Gym Teste MOCK' }),
      expect.objectContaining({ name: 'Near Gym Teste MOCK 2' }),
    ]);
  });
});
