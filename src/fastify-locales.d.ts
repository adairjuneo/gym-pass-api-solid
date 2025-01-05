import 'fastify';

declare module 'fastify' {
  export interface FastifyRequest {
    t: (key: string, values?: Record<string, string | number>) => string;
  }
}
