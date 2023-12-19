import { FastifyInstance } from 'fastify';
import { Type } from '@sinclair/typebox';
import { User } from '../../schemas/user';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';

export const autoPrefix = '/users';

export default async function users(fastify: FastifyInstance) {
    const server = fastify.withTypeProvider<TypeBoxTypeProvider>();
    server.get(
        '/:id',
        {
            schema: {
                description: 'Returns user and corresponding areas',
                params: Type.Object({
                    id: Type.Integer(),
                }),
                response: {
                    200: User,
                },
            },
        },
        async (request, reply) => {
            const { id } = request.params;
            const user = await getUser(id);
            user ? reply.send(user) : reply.send(undefined);
        },
    );

    async function getUser(id: number) {
        return fastify.prisma.account.findUnique({
            where: {
                id,
            },
            select: {
                login: true,
                areas: true,
                ownerOf: true,
            },
        });
    }
}
