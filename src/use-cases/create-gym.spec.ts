import { beforeEach, describe, expect, it } from 'vitest';

import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gym.repository';

import { CreateGymUseCase } from './create-gym.usecase';

let gymRepository: InMemoryGymRepository;
let createGymUseCase: CreateGymUseCase;

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    gymRepository = new InMemoryGymRepository();
    createGymUseCase = new CreateGymUseCase(gymRepository);
  });

  it('should be able to create a gym', async () => {
    const { gym } = await createGymUseCase.execute({
      name: 'Gym Teste MOCK',
      description: 'Gym Teste MOCK',
      phone: '38123456789',
      latitude: -16.718085,
      longitude: -43.825964,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
