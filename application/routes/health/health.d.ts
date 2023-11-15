import { FastifyPluginCallback } from 'fastify';

// Optionally, you can add any additional exports.
// Here we are exporting the decorator we added.
export interface OnStatusReply {
    status: string;
    version: string;
}

// Most importantly, use declaration merging to add the custom property to the Fastify type system
declare module 'fastify' {
    interface FastifyInstance {
        onStatus: () => OnStatusReply;
    }
}

export interface HealthOptions {}

// fastify-plugin automatically adds named export, so be sure to add also this type
// the variable name is derived from `options.name` property if `module.exports.myPlugin` is missing
export const health: FastifyPluginCallback<HealthOptions>;

// fastify-plugin automatically adds `.default` property to the exported plugin. See the note below
export default health;
