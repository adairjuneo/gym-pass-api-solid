import { CheckIn } from '@prisma/client';
import dayjs from 'dayjs';

import { CheckInRepository } from '@/repositories/interfaces/interface-check-in.repository';

import { LateCheckInValidationError } from './errors/late-check-in-validation.error';
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

    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(checkIn.createdAt, 'minutes');

    if (distanceInMinutesFromCheckInCreation > 20) {
      throw new LateCheckInValidationError();
    }

    checkIn.validatedAt = new Date();

    await this.checkInRespository.saveCheckIn(checkIn);

    return { checkIn };
  }
}
