import { FastifyPluginCallback } from 'fastify';
import { PrismaClient } from '@prisma/client';

// Most importantly, use declaration merging to add the custom property to the Fastify type system
declare module 'fastify' {
    interface FastifyInstance {
        prisma: PrismaClient;
    }
}
export const db: FastifyPluginCallback;
export default db;
