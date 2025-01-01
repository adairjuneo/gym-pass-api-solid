import { PrismaClient } from '@prisma/client';

const db = new PrismaClient({ log: ['warn', 'error'] });

export default db;
