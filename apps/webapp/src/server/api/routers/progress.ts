import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const progressRouter = createTRPCRouter({
  getProgress: publicProcedure.query(({ ctx }: any) => {
    return ctx.prisma.progressData.findMany({
      where: {
        progressId: {
          externalId: ctx.currentUser,
        },
      },
    });
  }),

  updateProgress: publicProcedure
    .input(
      z.object({
        dayname: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const mindTask = await ctx.prisma.mind.findMany({
        where: {
          mindrel: {
            externalId: ctx.currentUser,
          },
        },
      });

      const wealthTask = await ctx.prisma.wealth.findMany({
        where: {
          wealth: {
            externalId: ctx.currentUser,
          },
        },
      });

      const fitnessTask = await ctx.prisma.fitness.findMany({
        where: {
          fit: {
            externalId: ctx.currentUser,
          },
        },
      });
      console.log(fitnessTask, "loduchandas");
      const relationshipTask = await ctx.prisma.relationship.findMany({
        where: {
          relationship: {
            externalId: ctx.currentUser,
          },
        },
      });

      const allTasks = [
        ...mindTask,
        ...wealthTask,
        ...fitnessTask,
        ...relationshipTask,
      ];

      const filteredMindTask = mindTask.filter((task: any) => {
        const taskFinished = task.status === false;
        return taskFinished;
      });

      const filteredWealthTask = wealthTask.filter((task: any) => {
        const taskFinished = task.status === false;
        return taskFinished;
      });

      const filteredFitnessTask = fitnessTask.filter((task: any) => {
        const taskFinished = task.status === false;
        return taskFinished;
      });

      const filteredRelationshipTask = relationshipTask.filter((task: any) => {
        const taskFinished = task.status === false;
        return taskFinished;
      });

      const allTaskStatus = [
        ...filteredMindTask,
        ...filteredWealthTask,
        ...filteredFitnessTask,
        ...filteredRelationshipTask,
      ];
      console.log(allTaskStatus, allTasks, "loduchand");
      const progressPercentage =
        (1 - allTaskStatus.length / allTasks.length) * 1000;
      const progress = await ctx.prisma.progressData.upsert({
        where: {
          dayname: input.dayname,
        },
        create: {
          progress: progressPercentage,
          progressId: {
            connect: {
              externalId: ctx.currentUser as string,
            },
          },
          dayname: input.dayname,
        },
        update: {
          progress: progressPercentage,
        },
      });
      return progress;
    }),

  getTodayAllTasks: publicProcedure.query(async ({ ctx }: any) => {
    const mindTask = await ctx.prisma.mind.findMany({
      where: {
        mindrel: {
          externalId: ctx.currentUser,
        },
      },
    });

    const wealthTask = await ctx.prisma.wealth.findMany({
      where: {
        wealth: {
          externalId: ctx.currentUser,
        },
      },
    });

    const fitnessTask = await ctx.prisma.fitness.findMany({
      where: {
        fit: {
          externalId: ctx.currentUser,
        },
      },
    });

    const relationshipTask = await ctx.prisma.relationship.findMany({
      where: {
        relationship: {
          externalId: ctx.currentUser,
        },
      },
    });

    const allTasks = [
      ...mindTask,
      ...wealthTask,
      ...fitnessTask,
      ...relationshipTask,
    ];

    const filteredMindTask = mindTask.filter((task: any) => {
      const taskFinished = task.status === true;
      return taskFinished;
    });

    const filteredWealthTask = wealthTask.filter((task: any) => {
      const taskFinished = task.status === true;
      return taskFinished;
    });

    const filteredFitnessTask = fitnessTask.filter((task: any) => {
      const taskFinished = task.status === true;
      return taskFinished;
    });

    const filteredRelationshipTask = relationshipTask.filter((task: any) => {
      const taskFinished = task.status === true;
      return taskFinished;
    });

    const allTaskStatus = [
      ...filteredMindTask,
      ...filteredWealthTask,
      ...filteredFitnessTask,
      ...filteredRelationshipTask,
    ];

    return {
      allTaskStatus,
      allTasks,
    };
  }),
});
