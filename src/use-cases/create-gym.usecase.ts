import { Gym } from '@prisma/client';

import { GymRepository } from '@/repositories/interfaces/gym.interface';

interface CreateGymUseCaseRequest {
  name: string;
  description: string | null;
  phone: string | null;
  latitude: number;
  longitude: number;
}

interface CreateGymUseCaseResponse {
  gym: Gym;
}

export class CreateGymUseCase {
  constructor(private gymRepository: GymRepository) {}

  async execute(data: CreateGymUseCaseRequest): Promise<CreateGymUseCaseResponse> {
    const { name, description, phone, latitude, longitude } = data;

    const gym = await this.gymRepository.create({
      name,
      description,
      phone,
      latitude,
      longitude,
    });

    return { gym };
  }
}
