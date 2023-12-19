import { Static, Type } from '@sinclair/typebox';

export const Health = Type.Object({
    status: Type.String(),
    version: Type.String(),
});

export type HealthType = Static<typeof Health>;
