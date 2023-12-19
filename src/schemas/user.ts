import { Static, Type } from '@sinclair/typebox';
import { Area } from './area';

export const User = Type.Object({
    login: Type.String(),
    areas: Type.Array(Area),
    ownerOf: Type.Array(Area),
});

export type UserType = Static<typeof User>;
