import { CheckInRepository } from '@/repositories/interfaces/interface-check-in.repository';

interface GetUserMetricsUseCaseRequest {
  userId: string;
}

interface GetUserMetricsUseCaseResponse {
  checkInsCount: number;
}

export class GetUserMetricsUseCase {
  constructor(private checkInRespository: CheckInRepository) {}
  async execute(data: GetUserMetricsUseCaseRequest): Promise<GetUserMetricsUseCaseResponse> {
    const { userId } = data;

    const checkInsCount = await this.checkInRespository.countByUserId(userId);

    return { checkInsCount };
  }
}
