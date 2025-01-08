import { FastifyReply, FastifyRequest } from 'fastify';

import { makeUserProfileUseCase } from '@/use-cases/user-profile.usecase';

export const refreshToken = async (request: FastifyRequest, reply: FastifyReply) => {
  await request.jwtVerify({ onlyCookie: true });

  const userProfile = makeUserProfileUseCase();

  const { user } = await userProfile.execute({ id: request.user.sub });

  const tokenJwt = await reply.jwtSign({ role: user.role }, { sign: { sub: request.user.sub } });

  const refreshTokenJwt = await reply.jwtSign({}, { sign: { sub: request.user.sub, expiresIn: '3d' } });

  reply
    .status(200)
    .setCookie('refreshToken', refreshTokenJwt, {
      path: '/',
      secure: true,
      sameSite: true,
      httpOnly: true,
    })
    .send({ content: { token: tokenJwt } });
};
