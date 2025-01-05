import '@fastify/jwt';

declare module '@fastify/jwt' {
  export interface FastifyJWT {
    payload: null;
    user: {
      id: number;
      name: string;
      age: number;
    };
  }
}
