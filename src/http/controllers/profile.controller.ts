import type { FastifyReply, FastifyRequest } from 'fastify';

export const getProfile = async (request: FastifyRequest, reply: FastifyReply) => {
  // try {
  //   console.log('headers =>> ', request.headers);
  // } catch (err) {
  //   throw err;
  // }
  await request.jwtVerify();

  // const { user } = request;

  reply.status(200).send();
};
