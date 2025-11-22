import { inferAsyncReturnType } from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';

export async function createContext({ req, res }: trpcNext.CreateNextContextOptions) {
  return { req, res };
}
export type Context = inferAsyncReturnType<typeof createContext>;
