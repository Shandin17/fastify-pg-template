import Env from '@fastify/env';
import S from 'fluent-json-schema';
import { join } from 'desm';
import fp from 'fastify-plugin';

async function config(fastify) {
    await fastify.register(Env, {
        schema: S.object()
            .prop('PORT', S.string().default('3000'))
            .prop('HOST', S.string().default(''))
            .prop('DATABASE_URL', S.string().required())
            .prop('DATABASE_LOG', S.boolean().required())
            .prop('POSTGRES_USER', S.string().required())
            .prop('POSTGRES_PASSWORD', S.string().required())
            .prop('POSTGRES_DB', S.string().required())
            .valueOf(),
        dotenv: {
            path: join(import.meta.url, '../../..', '.env'),
        },
    });
}

export default fp(config, {
    name: 'config',
});
