import { router, publicProcedure } from './trpc';

export const appRouter = router({
  hello: publicProcedure.query(() => 'world from tRPC'),
});

export type AppRouter = typeof appRouter;
