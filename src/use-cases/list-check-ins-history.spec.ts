import { beforeEach, describe, expect, it } from 'vitest';

import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-in.repository';

import { ListCheckInsHistoryUseCase } from './list-check-ins-history.usecase';

let checkInRepository: InMemoryCheckInRepository;
let listCheckInsHistoryUseCase: ListCheckInsHistoryUseCase;

describe('List ChekIns History Use Case', () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInRepository();
    listCheckInsHistoryUseCase = new ListCheckInsHistoryUseCase(checkInRepository);
  });

  it('should be able to list history of check-ins', async () => {
    await checkInRepository.create({
      gymId: 'gym-01',
      userId: 'user-01',
    });

    await checkInRepository.create({
      gymId: 'gym-02',
      userId: 'user-01',
    });

    const { checkIns } = await listCheckInsHistoryUseCase.execute({
      userId: 'user-01',
      page: 1,
    });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gymId: 'gym-01' }),
      expect.objectContaining({ gymId: 'gym-02' }),
    ]);
  });

  it('should be able to get paginated list history of check-ins', async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInRepository.create({
        gymId: String('gym-').concat(i.toString()),
        userId: 'user-01',
      });
    }

    const { checkIns } = await listCheckInsHistoryUseCase.execute({
      userId: 'user-01',
      page: 2,
    });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gymId: 'gym-21' }),
      expect.objectContaining({ gymId: 'gym-22' }),
    ]);
  });
});
