import { CheckIn } from '@prisma/client';

import { CheckInRepository } from '@/repositories/interfaces/check-in.interface';

interface ListCheckInsHistoryUseCaseRequest {
  userId: string;
  page: number;
}

interface ListCheckInsHistoryUseCaseResponse {
  checkIns: CheckIn[];
}

export class ListCheckInsHistoryUseCase {
  constructor(private checkInRespository: CheckInRepository) {}
  async execute(data: ListCheckInsHistoryUseCaseRequest): Promise<ListCheckInsHistoryUseCaseResponse> {
    const { userId, page } = data;

    const checkIns = await this.checkInRespository.findManyByUserId(userId, page);

    return { checkIns };
  }
}
