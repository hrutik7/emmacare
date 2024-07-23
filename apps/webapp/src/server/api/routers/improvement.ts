import { create } from "domain";
import { date, z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const improvementRouter = createTRPCRouter({
  createImprovement: publicProcedure
    .input(
      z.object({
        improvement: z.string(),
        id: z.string(),
        notimprovement: z.string(),
        satisfaction: z.array(z.number()),
        date: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const improvement = await ctx.prisma.improvement.create({
        data: {
          improvement: input.improvement,
          notImprove : input.notimprovement,
          satisfaction: input.satisfaction,
          date: input.date,
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
    
      return improvement;
    }),
});
