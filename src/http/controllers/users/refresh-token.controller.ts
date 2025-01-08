import { FastifyReply, FastifyRequest } from 'fastify';

export const refreshToken = async (request: FastifyRequest, reply: FastifyReply) => {
  await request.jwtVerify({ onlyCookie: true });

  const tokenJwt = await reply.jwtSign({}, { sign: { sub: request.user.sub } });

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
