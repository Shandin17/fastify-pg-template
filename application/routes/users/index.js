import S from 'fluent-json-schema';

export const autoPrefix = '/users';

export default async function users(fastify) {
    fastify.route({
        handler: helloWorld,
        method: 'GET',
        path: '/user',
        schema: {
            description: 'Returns Hello World!',
            response: {
                200: S.string(),
            },
        },
    });

    function helloWorld() {
        return 'Hello World!';
    }
}
