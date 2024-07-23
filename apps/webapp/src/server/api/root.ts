import { postRouter } from "~/server/api/routers/post";
import { dailytaskRouter } from "~/server/api/routers/dailytask";
import { createTRPCRouter } from "~/server/api/trpc";
import { userRouter } from "~/server/api/routers/user";
import { allTaskRouter } from "./routers/alltasks";
import { ambitiousGoalRouter } from "./routers/ambitiousgoal";
import { progressRouter } from "./routers/progress";
import { improvementRouter } from "./routers/improvement";
import {AiRouter} from "./routers/ai";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  user: userRouter,
  dailytask : dailytaskRouter,
  alltask : allTaskRouter ,
  ambitiousgoal : ambitiousGoalRouter,
  progress : progressRouter,
  improvement : improvementRouter,
  ai : AiRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
