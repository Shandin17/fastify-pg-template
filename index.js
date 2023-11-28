import Fastify from 'fastify';
import App from './application/app.js';

async function start() {
    const fastify = new Fastify({
        trustProxy: true,
        logger: {
            level: process.env.LOG_LEVEL || 'warn',
        },
    });
    await fastify.register(App);
    const port = process.env.PORT;
    const host = process.env.HOST;
    await fastify.listen({ host, port });
    process.on('SIGINT', () => {
        fastify.close(() => {
            process.exit(0);
        });
    });
    process.on('SIGTERM', () => {
        fastify.close(() => {
            process.exit(0);
        });
    });
}

start().catch((err) => {
    console.error(err);
    process.exit(1);
});
