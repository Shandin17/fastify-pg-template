import { FastifyInstance } from 'fastify';
import { PrismaClient } from '@prisma/client';
import fp from 'fastify-plugin';

declare module 'fastify' {
    interface FastifyInstance {
        prisma: PrismaClient;
    }
}

async function db(fastify: FastifyInstance) {
    const prisma = new PrismaClient({
        log: fastify.config.DATABASE_LOG ? ['query', 'info', 'warn', 'error'] : ['error'],
    });
    await prisma.$connect();
    fastify.decorate('prisma', prisma);
    fastify.addHook('onClose', async (fastify) => {
        await fastify.prisma.$disconnect();
    });
}

export default fp(db, {
    dependencies: ['config'],
});
