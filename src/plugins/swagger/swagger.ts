import fp from 'fastify-plugin';
import Swagger from '@fastify/swagger';
import SwaggerUI from '@fastify/swagger-ui';
import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { version } from '../../utils/version';

type SwaggerGeneratorOptions = FastifyPluginOptions & {
    exposeRoute: boolean;
    NODE_ENV: string;
};

const swaggerGenerator = async (fastify: FastifyInstance, opts: SwaggerGeneratorOptions) => {
    // Swagger documentation generator for Fastify.
    // It uses the schemas you declare in your routes to generate a swagger compliant doc.
    // https://github.com/fastify/fastify-swagger
    await fastify.register(Swagger, {
        swagger: {
            info: {
                title: 'Fastify Postgres Template',
                description: 'Fastify Postgres Template docs',
                version,
            },
            externalDocs: {
                url: 'https://github.com/Shandin17/fastify-pg-template',
                description: 'Find more info here',
            },
            host: fastify.config.DEPLOY_LINK, // and your deployed url
            schemes: ['http', 'https'],
            consumes: ['application/json'],
            produces: ['application/json', 'text/html'],
            securityDefinitions: {
                Bearer: {
                    type: 'apiKey',
                    name: 'Bearer',
                    in: 'header',
                },
                Csrf: {
                    type: 'apiKey',
                    name: 'x-csrf-token',
                    in: 'header',
                },
            },
        },
    });

    if (opts.NODE_ENV !== 'production') {
        await fastify.register(SwaggerUI, {
            routePrefix: '/documentation',
        });
    }
};

export default fp(swaggerGenerator, {
    name: 'swaggerGenerator',
    dependencies: ['config'],
});
