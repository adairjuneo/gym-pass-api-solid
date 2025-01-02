import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-in.repository';
import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gym.repository';

import { CheckInUseCase } from './check-in.usecase';

let checkInRepository: InMemoryCheckInRepository;
let gymRepository: InMemoryGymRepository;
let checkInUseCase: CheckInUseCase;

describe('Check In Use Case', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInRepository();
    gymRepository = new InMemoryGymRepository();
    checkInUseCase = new CheckInUseCase(checkInRepository, gymRepository);

    gymRepository.create({
      id: 'gym-test-01',
      name: 'Gym Teste 01',
      description: 'Gym Teste',
      phone: '',
      latitude: -16.718085,
      longitude: -43.825964,
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should be able to check in on gym', async () => {
    const { checkIn } = await checkInUseCase.execute({
      gymId: 'gym-test-01',
      userId: 'user-01',
      userLatitude: -16.718085,
      userLongitude: -43.825964,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2024, 0, 1, 8, 0, 0));

    await checkInUseCase.execute({
      gymId: 'gym-test-01',
      userId: 'user-01',
      userLatitude: -16.718085,
      userLongitude: -43.825964,
    });

    vi.setSystemTime(new Date(2024, 0, 2, 8, 0, 0));

    const { checkIn } = await checkInUseCase.execute({
      gymId: 'gym-test-01',
      userId: 'user-01',
      userLatitude: -16.718085,
      userLongitude: -43.825964,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it('should not be able to check in twice on same day', async () => {
    vi.setSystemTime(new Date(2024, 0, 1, 8, 0, 0));

    await checkInUseCase.execute({
      gymId: 'gym-test-01',
      userId: 'user-01',
      userLatitude: -16.718085,
      userLongitude: -43.825964,
    });

    await expect(
      checkInUseCase.execute({
        gymId: 'gym-test-01',
        userId: 'user-01',
        userLatitude: -16.718085,
        userLongitude: -43.825964,
      }),
    ).rejects.toBeInstanceOf(Error);
  });

  it('should be able to check in on closer gym', async () => {
    const { checkIn } = await checkInUseCase.execute({
      gymId: 'gym-test-01',
      userId: 'user-01',
      userLatitude: -16.718085,
      userLongitude: -43.825964,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it('should not be able to check in on distant gym', async () => {
    await expect(
      checkInUseCase.execute({
        gymId: 'gym-test-01',
        userId: 'user-01',
        userLatitude: -16.711991,
        userLongitude: -43.831511,
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
