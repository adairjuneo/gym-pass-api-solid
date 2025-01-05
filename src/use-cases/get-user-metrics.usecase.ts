import { CheckInRepository } from '@/repositories/interfaces/check-in.interface';
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins.repository';

interface GetUserMetricsUseCaseRequest {
  userId: string;
}

interface GetUserMetricsUseCaseResponse {
  checkInsCount: number;
}

class GetUserMetricsUseCase {
  constructor(private checkInRespository: CheckInRepository) {}
  async execute(data: GetUserMetricsUseCaseRequest): Promise<GetUserMetricsUseCaseResponse> {
    const { userId } = data;

    const checkInsCount = await this.checkInRespository.countByUserId(userId);

    return { checkInsCount };
  }
}

const makeGetUserMetricsUseCase = () => {
  const checkInRepository = new PrismaCheckInsRepository();
  const getUserMetricsUseCase = new GetUserMetricsUseCase(checkInRepository);

  return getUserMetricsUseCase;
};

export { GetUserMetricsUseCase, makeGetUserMetricsUseCase };
