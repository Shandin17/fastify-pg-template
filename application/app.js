import AutoLoad from '@fastify/autoload';
import Sensible from '@fastify/sensible';
import UnderPressure from '@fastify/under-pressure';
import { join } from 'desm';
export default async function (fastify, opts) {
    await fastify.register(Sensible);
    await fastify.register(UnderPressure, {
        maxEventLoopDelay: 1000,
        maxHeapUsedBytes: 1000000000,
        maxRssBytes: 1000000000,
        maxEventLoopUtilization: 0.98,
    });
    await fastify.register(AutoLoad, {
        dir: join(import.meta.url, 'plugins'),
        options: Object.assign({}, opts),
    });
    await fastify.register(AutoLoad, {
        dir: join(import.meta.url, 'routes'),
        dirNameRoutePrefix: false,
        options: Object.assign({}, opts),
    });
}
