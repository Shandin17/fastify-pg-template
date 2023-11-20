import { FastifyPluginCallback } from 'fastify';

interface Config {
    PORT: number;
    DATABASE_URL: string;
    DATABASE_LOG: boolean;
}

// Most importantly, use declaration merging to add the custom property to the Fastify type system
declare module 'fastify' {
    interface FastifyInstance {
        config: Config;
    }
}
export const config: FastifyPluginCallback;
export default config;
