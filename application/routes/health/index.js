import { readFileSync } from 'node:fs';
import S from 'fluent-json-schema';
import { join } from 'desm';

const { version } = JSON.parse(readFileSync(join(import.meta.url, '../../../package.json')));

export const autoPrefix = '/health';

export default async function health(fastify) {
    fastify.route({
        method: 'GET',
        path: '/',
        handler: onStatus,
        schema: {
            // The description field will be used by the swagger
            // generator to describe the route.
            description: 'Returns status and version of the application',
            response: {
                200: S.object().prop('status', S.string()).prop('version', S.string()),
            },
        },
    });

    async function onStatus() {
        return { status: 'ok', version };
    }
}
