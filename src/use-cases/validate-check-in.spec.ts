import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-in.repository';

import { ResourceNotFoundError } from './errors/resource-not-found.error';
import { ValidateCheckInUseCase } from './validate-check-in.usecase';

let checkInRepository: InMemoryCheckInRepository;
let validateCheckInUseCase: ValidateCheckInUseCase;

describe('Validate Check In Use Case', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInRepository();
    validateCheckInUseCase = new ValidateCheckInUseCase(checkInRepository);

    // vi.useFakeTimers();
  });

  afterEach(() => {
    // vi.useRealTimers();
  });

  it('should be able to validate the check-in on gym', async () => {
    const createdCheckIn = await checkInRepository.create({
      gymId: 'gym-01',
      userId: 'user-01',
    });

    const { checkIn } = await validateCheckInUseCase.execute({
      checkInId: createdCheckIn.id,
    });

    expect(checkIn.validatedAt).toEqual(expect.any(Date));
    expect(checkInRepository.items[0].validatedAt).toEqual(expect.any(Date));
  });

  it('should not be able to validate an inexistent check-in on gym', async () => {
    await expect(
      validateCheckInUseCase.execute({
        checkInId: 'random-check-in-01',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
