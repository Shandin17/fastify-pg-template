import { FastifyInstance } from 'fastify';
import { Health, HealthType } from '../schemas/health';
import { version } from '../utils/version';

export const autoPrefix = '/health';

export default async function health(fastify: FastifyInstance) {
    fastify.get(
        '/',
        {
            schema: {
                response: {
                    200: Health,
                },
            },
        },
        onStatus,
    );

    async function onStatus(): Promise<HealthType> {
        return {
            status: 'ok',
            version,
        };
    }
}
