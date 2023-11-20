import S from 'fluent-json-schema';

export const autoPrefix = '/users';

/** @param {import('fastify').FastifyInstance} fastify */
export default async function users(fastify) {
    fastify.route({
        handler: helloWorld,
        method: 'GET',
        path: '/hello',
        schema: {
            description: 'Returns Hello World!',
            response: {
                200: S.string(),
            },
        },
    });

    fastify.route({
        handler: getUser,
        method: 'GET',
        path: '/user/:id',
        schema: {
            description: 'Returns user and corresponding areas',
            params: S.object().prop('id', S.integer().required()),
            response: {
                200: S.object()
                    .prop('login', S.string())
                    .prop(
                        'areas',
                        S.array().items(
                            S.object()
                                .prop('name', S.string())
                                .prop('id', S.integer())
                                .prop('ownerId', S.integer()),
                        ),
                    )
                    .prop(
                        'ownerOf',
                        S.array().items(
                            S.object()
                                .prop('id', S.integer())
                                .prop('name', S.string())
                                .prop('ownerId', S.integer()),
                        ),
                    ),
            },
        },
    });

    async function getUser(request) {
        const { id } = request.params;
        const user = await fastify.prisma.account.findUnique({
            where: {
                id,
            },
            select: {
                login: true,
                areas: true,
                ownerOf: true,
            },
        });
        return user;
    }

    function helloWorld() {
        return 'Hello World!';
    }
}
