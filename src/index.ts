import fastify from 'fastify';
import App from './app';
import * as process from 'process';

async function start() {
    const server = fastify({
        trustProxy: true,
        logger: {
            level: process.env.LOG_LEVEL || 'warn',
        },
    });
    await server.register(App);
    const port = Number(process.env.PORT);
    const host = process.env.HOST;
    await server.listen({
        host,
        port,
    });
    if (process.env.NODE_ENV === 'production') {
        for (const signal of ['SIGINT', 'SIGTERM']) {
            process.on(signal, () =>
                server.close().then((err) => {
                    console.log(`close application on ${signal}`);
                    process.exit(err ? 1 : 0);
                }),
            );
        }
    }
}

start().catch((err) => {
    console.error(err);
    process.exit(1);
});
