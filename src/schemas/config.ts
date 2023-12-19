import { Static, Type } from '@sinclair/typebox';

export const Config = Type.Object({
    PORT: Type.String({ default: '3000' }),
    HOST: Type.String({ default: '' }),
    DEPLOY_LINK: Type.String({ default: 'localhost:3000' }),
    DATABASE_URL: Type.String(),
    DATABASE_LOG: Type.Boolean(),
    POSTGRES_USER: Type.String(),
    POSTGRES_PASSWORD: Type.String(),
    POSTGRES_DB: Type.String(),
});

export type ConfigType = Static<typeof Config>;
