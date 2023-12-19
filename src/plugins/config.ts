import { Config, ConfigType } from '../schemas/config';
import { FastifyInstance } from 'fastify';
import Env from '@fastify/env';
import { join } from 'path';
import fp from 'fastify-plugin';

declare module 'fastify' {
    interface FastifyInstance {
        config: ConfigType;
    }
}

async function config(fastify: FastifyInstance) {
    await fastify.register(Env, {
        schema: Config,
        dotenv: {
            path: join(__dirname, '../', '.env'),
        },
    });
}

export default fp(config, {
    name: 'config',
});
