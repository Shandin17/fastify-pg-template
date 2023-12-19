import { Static, Type } from '@sinclair/typebox';
export const Area = Type.Object({
    name: Type.String(),
    id: Type.Integer(),
    ownerId: Type.Integer(),
});

export type AreaType = Static<typeof Area>;
