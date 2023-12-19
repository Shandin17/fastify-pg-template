import AutoLoad from '@fastify/autoload';
import Sensible from '@fastify/sensible';
import UnderPressure from '@fastify/under-pressure';
import { FastifyInstance } from 'fastify';
import { join } from 'path';

export default async function (fastify: FastifyInstance) {
    await fastify.register(Sensible);
    await fastify.register(UnderPressure, {
        maxEventLoopDelay: 1000,
        maxHeapUsedBytes: 1000000000,
        maxRssBytes: 1000000000,
        maxEventLoopUtilization: 0.98,
    });
    await fastify.register(AutoLoad, {
        dir: join(__dirname, 'plugins'),
    });
    await fastify.register(AutoLoad, {
        dir: join(__dirname, 'routes'),
        dirNameRoutePrefix: false,
    });
}
