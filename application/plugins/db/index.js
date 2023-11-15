import fastifyPostgres from '@fastify/postgres';
import fp from 'fastify-plugin';
import { migrate } from './migrate.js';

async function db(fastify) {
    await fastify.register(fastifyPostgres, {
        host: fastify.config.DB_HOST,
        port: fastify.config.DB_PORT,
        database: fastify.config.DB_DATABASE,
        user: fastify.config.DB_USER,
        password: fastify.config.DB_PASSWORD,
    });
    await migrate(fastify);

    async function getUsers() {
        const client = await fastify.pg.connect();
        try {
            const { rows } = await client.query('SELECT * FROM users');
            // Note: avoid doing expensive computation here, this will block releasing the client
            return rows;
        } finally {
            // Release the client immediately after query resolves, or upon error
            client.release();
        }
    }
}

export default fp(db, {
    name: 'db',
    dependencies: ['config'],
});
