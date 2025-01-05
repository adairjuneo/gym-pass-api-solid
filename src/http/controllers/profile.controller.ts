import { FastifyReply, FastifyRequest } from 'fastify';
import _ from 'lodash';

import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found.error';
import { makeUserProfileUseCase } from '@/use-cases/user-profile.usecase';

export const getProfile = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { user } = request;

    const getUserProfile = makeUserProfileUseCase();

    const profile = await getUserProfile.execute({ id: user.sub });

    reply.status(200).send({ content: _.omit(profile.user, ['passwordHash']) });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }

    throw err;
  }
};
