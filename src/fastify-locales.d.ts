import 'fastify';

declare module 'fastify' {
  interface FastifyRequest {
    t: (key: string, values?: Record<string, string | number>) => string;
  }
}
