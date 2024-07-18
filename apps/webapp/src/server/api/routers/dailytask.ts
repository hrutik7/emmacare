import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

export const dailytaskRouter = createTRPCRouter({
  createMindfulTask: privateProcedure
    .input(
      z.object({
        task: z.string(),
        startTime: z.string(),
        endTime: z.string(),
        status: z.boolean(),
        id: z.string(),
      }),
    )

    .mutation(async ({ ctx, input }) => {
      const mindTask = await ctx.prisma.mind.create({
        data: {
          task: input.task,
          startTime: input.startTime,
          endTime: input.endTime,
          status: input.status,
          mindrel: {
            connectOrCreate: {
              where: { externalId: ctx.currentUser },
              create: {
                externalId: ctx.currentUser,
                // other necessary fields to create a User
              },
            },
          },
        },
      });
      console.log("mindhainbhai", mindTask);
      return mindTask;
    }),

  deleteMindfulTask: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const mindfulTask = await ctx.prisma.mind.delete({
        where: {
          id: input.id,
        },
      });
      return mindfulTask;
    }),

  getMindfulTasks: privateProcedure.query(async ({ ctx }) => {
    const mindfulTasks = await ctx.prisma.mind.findMany({
      where: {
        mindrel: {
          externalId: ctx.currentUser,
        },
      },
    });
    console.log(mindfulTasks, "lodu", ctx.currentUser);
    return mindfulTasks;
  }),

  updateMindfulTask: privateProcedure
    .input(
      z.object({
        id: z.string(),
        task: z.string(),
        startTime: z.string(),
        endTime: z.string(),
        status: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const mindfulTask = await ctx.prisma.mind.update({
        where: {
          id: input.id,
        },
        data: {
          id: input.id,
          task: input.task,
          startTime: input.startTime,
          endTime: input.endTime,
          status: input.status,
        },
      });
      console.log(mindfulTask, "lindBuddhi");
      return mindfulTask;
    }),

  createFitnessTask: privateProcedure
    .input(
      z.object({
        task: z.string(),
        startTime: z.string(),
        endTime: z.string(),
        status: z.boolean(),
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const fitnessTask = await ctx.prisma.fitness.create({
        data: {
          task: input.task,
          startTime: input.startTime,
          endTime: input.endTime,
          status: input.status,
          fit: {
            connectOrCreate: {
              where: { externalId: ctx.currentUser },
              create: {
                externalId: ctx.currentUser,
                // other necessary fields to create a User
              },
            },
          },
        },
      });
      return fitnessTask;
    }),

  deleteFitnessTask: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const fitnessTask = await ctx.prisma.fitness.delete({
        where: {
          id: input.id,
        },
      });
      return fitnessTask;
    }),

  getFitnessTasks: privateProcedure.query(async ({ ctx }) => {
    const fitnessTasks = await ctx.prisma.fitness.findMany({
      where: {
        fit: {
          externalId: ctx.currentUser,
        },
      },
    });
    console.log(fitnessTasks, "lochag");
    return fitnessTasks;
  }),

  updateFitnessTask: privateProcedure
    .input(
      z.object({
        id: z.string(),
        task: z.string(),
        startTime: z.string(),
        endTime: z.string(),
        status: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const fitnessTask = await ctx.prisma.fitness.update({
        where: {
          id: input.id,
        },
        data: {
          id: input.id,
          task: input.task,
          startTime: input.startTime,
          endTime: input.endTime,
          status: input.status,
        },
      });
      return fitnessTask;
    }),

  createWealthTask: privateProcedure
    .input(
      z.object({
        task: z.string(),
        startTime: z.string(),
        endTime: z.string(),
        status: z.boolean(),
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const wealthTask = await ctx.prisma.wealth.create({
        data: {
          task: input.task,
          startTime: input.startTime,
          endTime: input.endTime,
          status: input.status,
          wealth: {
            connectOrCreate: {
              where: { externalId: ctx.currentUser },
              create: {
                externalId: ctx.currentUser,
                // other necessary fields to create a User
              },
            },
          },
        },
      });
      return wealthTask;
    }),

  deleteWealthTask: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const wealthTask = await ctx.prisma.wealth.delete({
        where: {
          id: input.id,
        },
      });
      return wealthTask;
    }),

  getWealthTasks: privateProcedure.query(async ({ ctx }) => {
    const wealthTasks = await ctx.prisma.wealth.findMany({
      where: {
        wealth: {
          externalId: ctx.currentUser,
        },
      },
    });
    return wealthTasks;
  }),

  updateWealthTask: privateProcedure
    .input(
      z.object({
        id: z.string(),
        task: z.string(),
        startTime: z.string(),
        endTime: z.string(),
        status: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const wealthTask = await ctx.prisma.wealth.update({
        where: {
          id: input.id,
        },
        data: {
          task: input.task,
          startTime: input.startTime,
          endTime: input.endTime,
          status: input.status,
        },
      });
      return wealthTask;
    }),

  createRelationshipTask: privateProcedure
    .input(
      z.object({
        task: z.string(),
        startTime: z.string(),
        endTime: z.string(),
        status: z.boolean(),
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const relationshipTask = await ctx.prisma.relationship.create({
        data: {
          task: input.task,
          startTime: input.startTime,
          endTime: input.endTime,
          status: input.status,
          relationship: {
            connectOrCreate: {
              where: { externalId: ctx.currentUser },
              create: {
                externalId: ctx.currentUser,
                // other necessary fields to create a User
              },
            },
          },
        },
      });
      return relationshipTask;
    }),

  deleteRelationshipTask: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const relationshipTask = await ctx.prisma.relationship.delete({
        where: {
          id: input.id,
        },
      });
      return relationshipTask;
    }),

  getRelationshipTasks: privateProcedure.query(async ({ ctx }) => {
    const relationshipTasks = await ctx.prisma.relationship.findMany({
      where: {
        relationship: {
          externalId: ctx.currentUser,
        },
      },
    });
    console.log(relationshipTasks, "lochagllllll");
    return relationshipTasks;
  }),

  updateRelationshipTask: privateProcedure
    .input(
      z.object({
        id: z.string(),
        task: z.string(),
        startTime: z.string(),
        endTime: z.string(),
        status: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const relationshipTask = await ctx.prisma.relationship.update({
        where: {
          id: input.id,
        },
        data: {
          task: input.task,
          startTime: input.startTime,
          endTime: input.endTime,
          status: input.status,
        },
      });
      return relationshipTask;
    }),

  deleteAllTasks: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const mind = await ctx.prisma.mind.deleteMany({
        where: {
          mindrel: {
            externalId: ctx.currentUser,
          },
        },
      });
      const fit = await ctx.prisma.fitness.deleteMany({
        where: {
          fit: {
            externalId: ctx.currentUser,
          },
        },
      });
      const wealth = await ctx.prisma.wealth.deleteMany({
        where: {
          wealth: {
            externalId: ctx.currentUser,
          },
        },
      });
      const rel = await ctx.prisma.relationship.deleteMany({
        where: {
          relationship: {
            externalId: ctx.currentUser,
          },
        },
      });
      return { mind, fit, wealth, rel };
    }),
});
