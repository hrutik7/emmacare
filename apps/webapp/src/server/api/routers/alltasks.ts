import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const allTaskRouter = createTRPCRouter({
  getTodayTasks: publicProcedure.query(async ({ ctx }: any) => {
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

    const today = new Date();
    today.setHours(0, 0, 0, 0);

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

    const endMind = filteredMindTask.map((task: any): any => task.endTime);
    const endWealth = filteredWealthTask.map((task: any): any => task.endTime);
    const endFitness = filteredFitnessTask.map(
      (task: any): any => task.endTime,
    );
    const endRelationship = filteredRelationshipTask.map(
      (task: any): any => task.endTime,
    );

    const allEndTimes = [
      ...endMind,
      ...endWealth,
      ...endFitness,
      ...endRelationship,
    ];

    console.log(allEndTimes, "allEndTimes=====");
    return {
      allEndTimes,
    };
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

  console.log(allTasks,"herearealltasks")
  const allTasksEndtime = allTasks.map((task: any): any => task.endTime);
    return {
      allTaskStatus,
      allTasksEndtime
    };
  }),

  getTaskCOmpleted: publicProcedure.query(async ({ ctx }: any) => {
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

    const completedMind = mindTask.filter((task: any) => task.status === true);
    const completedWealth = wealthTask.filter(
      (task: any) => task.status === true,
    );
    const completedFitness = fitnessTask.filter(
      (task: any) => task.status === true,
    );
    const completedRelationship = relationshipTask.filter(
      (task: any) => task.status === true,
    );

    const allCompletedTasks = [
      ...completedMind,
      ...completedWealth,
      ...completedFitness,
      ...completedRelationship,
    ];

    return {
      allCompletedTasks,
    };
  }),
});
