import Fastify from 'fastify';
import App from './application/app.js';

async function start() {
    const fastify = new Fastify({
        trustProxy: true,
        logger: {
            level: 'info', // fix this in production env
        },
    });

    await fastify.register(App);
    const port = process.env.PORT || 3000;
    await fastify.listen({ port });
}

start().catch((err) => {
    console.error(err);
    process.exit(1);
});
