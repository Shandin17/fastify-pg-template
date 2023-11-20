import fp from 'fastify-plugin';
import { PrismaClient } from '@prisma/client';

/** @param {import('fastify').FastifyInstance} fastify */
async function db(fastify) {
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
