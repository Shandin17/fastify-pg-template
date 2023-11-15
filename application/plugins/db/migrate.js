import Postgrator from 'postgrator';
import { join } from 'desm';

export async function migrate(fastify, driver = 'pg') {
    return fastify.pg.transact(async (client) => {
        const postgrator = new Postgrator({
            migrationPattern: join(import.meta.url, 'migrations/*'),
            driver,
            database: fastify.config.PG_DATABASE,
            schemaTable: 'migrations',
            execQuery: (query) => client.query(query),
        });

        const result = await postgrator.migrate();

        if (!result.length) {
            fastify.log.info('No migrations run for schema "public". Already at the latest one.');
        }
        fastify.log.info('Migrations done');
    });
}
