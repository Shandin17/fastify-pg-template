import { FastifyPluginCallback } from 'fastify';

interface Config {
    PORT: number;
    HOST: string;
    DATABASE_URL: string;
    DATABASE_LOG: boolean;
    POSTGRES_USER: string;
    POSTGRES_PASSWORD: string;
    POSTGRES_DB: string;
}

// Most importantly, use declaration merging to add the custom property to the Fastify type system
declare module 'fastify' {
    interface FastifyInstance {
        config: Config;
    }
}
export const config: FastifyPluginCallback;
export default config;
