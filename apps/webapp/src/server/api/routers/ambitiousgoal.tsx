import { z } from "zod";
import { redis } from "~/lib/redis";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const ambitiousGoalRouter = createTRPCRouter({
  createAmbitiousGoal: publicProcedure
    .input(
      z.object({
        goal: z.string(),
        id: z.string(),
        ambitiousGoalTime: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const ambitiousGoal = await ctx.prisma.ambitiousGoal.create({
        data: {
          goal: input.goal,
          ambitiousGoalTime: input.ambitiousGoalTime,
          user: {
            connectOrCreate: {
              where: { externalId: ctx.currentUser as string },
              create: {
                externalId: ctx.currentUser,
                // other necessary fields to create a User
              },
            },
          },
        },
      });
      console.log("ambitiousGoal", ambitiousGoal);
      return ambitiousGoal;
    }),

  getAmbitiousGoals: publicProcedure.query(async ({ ctx }) => {
    const cachedAmbitiousGoalDate = await redis.get(ctx.currentUser);
    if (cachedAmbitiousGoalDate) {
      console.log("cacheddasdsad");
      return JSON.parse(cachedAmbitiousGoalDate);
    } else {
      const ambitiousGoals = await ctx.prisma.ambitiousGoal.findMany({
        where: {
          user: {
            externalId: ctx.currentUser,
          },
        },
      });

      await redis.set(ctx.currentUser, JSON.stringify(ambitiousGoals), "EX", 300);
      console.log(ambitiousGoals, "lodu", ctx.currentUser);
      return ambitiousGoals;
    }
  }),
});
