import Env from '@fastify/env';
import S from 'fluent-json-schema';
import { join } from 'desm';
import fp from 'fastify-plugin';

async function config(fastify) {
    await fastify.register(Env, {
        schema: S.object()
            .prop('PORT', S.string().required())
            .prop('DB_PORT', S.string().required())
            .prop('DB_HOST', S.string().required())
            .prop('DB_DATABASE', S.string().required())
            .prop('DB_USER', S.string().required())
            .prop('DB_PASSWORD', S.string().required())
            .valueOf(),
        dotenv: {
            path: join(import.meta.url, '../../..', '.env'),
        },
    });
}

export default fp(config, {
    name: 'config',
});
