import { CheckIn } from '@prisma/client';

import { CheckInRepository } from '@/repositories/interfaces/interface-check-in.repository';

import { ResourceNotFoundError } from './errors/resource-not-found.error';

interface ValidateCheckInUseCaseRequest {
  checkInId: string;
}

interface ValidateCheckInUseCaseResponse {
  checkIn: CheckIn;
}

export class ValidateCheckInUseCase {
  constructor(private checkInRespository: CheckInRepository) {}
  async execute(data: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
    const { checkInId } = data;

    const checkIn = await this.checkInRespository.findById(checkInId);

    if (!checkIn) {
      throw new ResourceNotFoundError();
    }

    checkIn.validatedAt = new Date();

    await this.checkInRespository.saveCheckIn(checkIn);

    return { checkIn };
  }
}
