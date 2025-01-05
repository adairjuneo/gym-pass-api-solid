import { CheckIn } from '@prisma/client';

import { CheckInRepository } from '@/repositories/interfaces/check-in.interface';
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins.repository';

interface ListCheckInsHistoryUseCaseRequest {
  userId: string;
  page: number;
}

interface ListCheckInsHistoryUseCaseResponse {
  checkIns: CheckIn[];
}

class ListCheckInsHistoryUseCase {
  constructor(private checkInRespository: CheckInRepository) {}
  async execute(data: ListCheckInsHistoryUseCaseRequest): Promise<ListCheckInsHistoryUseCaseResponse> {
    const { userId, page } = data;

    const checkIns = await this.checkInRespository.findManyByUserId(userId, page);

    return { checkIns };
  }
}

const makeListCheckInsHistoryUseCase = () => {
  const checkInRespository = new PrismaCheckInsRepository();
  const listCheckInsHistoryUseCase = new ListCheckInsHistoryUseCase(checkInRespository);

  return listCheckInsHistoryUseCase;
};

export { ListCheckInsHistoryUseCase, makeListCheckInsHistoryUseCase };
