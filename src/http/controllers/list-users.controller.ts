import { FastifyReply, FastifyRequest } from 'fastify';

import { db } from '@/lib/db';

export const listUsers = async (_request: FastifyRequest, reply: FastifyReply) => {
  const users = await db.user.findMany();

  reply.status(200).send({ content: users });
};
