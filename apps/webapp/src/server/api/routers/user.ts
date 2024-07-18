import { createTRPCRouter, privateProcedure, publicProcedure } from "~/server/api/trpc";
import {z} from "zod";
export const userRouter = createTRPCRouter({
  getUser: publicProcedure.query(async ({ ctx }) => {
    try {
      const userData = await ctx.prisma.user.findUnique({
        where: { externalId: ctx?.currentUser as string },
      });
      if (!userData) {
        throw new Error("User not found");
      }
      return userData;
    } catch (error) {
      console.error(error, "errorhainbhai");
      return error;
    }
  }),

  updateMindRadar: privateProcedure
  .input(
   z.object({
    id: z.string(),
    mindScore: z.number(),
  })
  )
  .mutation(async ({ ctx, input }) => {
    try {
      const updatedData = await ctx.prisma.user.update({
        where: { externalId: input.id  },
        data: {mindScore :{increment : 10}  } as any,
      });
      console.log(updatedData,"incccsdjidoj🫢🫢🫢🫢🫢🫢")
      return updatedData;
    } catch (error) {
      console.error(error, "errorhainbhai");
      return error;
    }
  }),

  updateWealthRadar: privateProcedure
  .input(
   z.object({
    id: z.string(),
    wealthScore: z.number(),
  })
  )
  .mutation(async ({ ctx, input }) => {
    try {
      const updatedData = await ctx.prisma.user.update({
        where: { externalId: input.id  },
        data: {wealthScore :{increment : 10}  } as any,
      });
      console.log(updatedData,"incccsdjidoj🫢🫢🫢🫢🫢🫢")
      return updatedData;
    } catch (error) {
      console.error(error, "errorhainbhai");
      return error;
    }
  }),

  updateFitnessRadar: privateProcedure
  .input(
   z.object({
    id: z.string(),
    fitnessScore: z.number(),
  })
  )
  .mutation(async ({ ctx, input }) => {
    try {
      const updatedData = await ctx.prisma.user.update({
        where: { externalId: input.id  },
        data: {fitnessScore :{increment : 10}  } as any,
      });
      console.log(updatedData,"incccsdjidoj🫢🫢🫢🫢🫢🫢")
      return updatedData;
    } catch (error) {
      console.error(error, "errorhainbhai");
      return error;
    }
  }),

  updateRelationshipRadar: privateProcedure
  .input(
   z.object({
    id: z.string(),
    relationShipScore: z.number(),
  })
  )
  .mutation(async ({ ctx, input }) => {
    try {
      const updatedData = await ctx.prisma.user.update({
        where: { externalId: input.id  },
        data: {relationShipScore :{increment : 10}  } as any,
      });
      console.log(updatedData,"incccsdjidoj🫢🫢🫢🫢🫢🫢")
      return updatedData;
    } catch (error) {
      console.error(error, "errorhainbhai");
      return error;
    }
  }),
  

});
