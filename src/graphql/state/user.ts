import { makeVar } from '@apollo/client';
import type { User } from 'cv-graphql';

export const userVar = makeVar<User | null>(null);
