import { GoogleGenerativeAI } from "@google/generative-ai";
import { get } from "http";
import { date, z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const AiRouter = createTRPCRouter({
  createIntrospection: publicProcedure
    .input(
      z.object({
        date: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }: any) => {
      const { date, introspectionDate } = input;

      const getIntrodata = await ctx.prisma.Improvement.findMany({
        where: {
          date: { contains: date },
        },
      });

      const generatedTexts = await Promise.all(
        getIntrodata.map(async (data) => {
          const prompt =
            " I am working on " +
            `${data.Task}` +
            " I was able to complete with effiecincy of " +
            `${data.satisfaction[0]}` +
            "%" +
            " things help me in achieving this task is " +
            `${data.improvement}` +
            " things that did not help me in achieving this task is " +
            `${data.notImprove}` +
            " please give me some suggestion to how I can achieve more by avoidng things that not helping me and how I can enhace the things that are helping me in completing this task" +
            "just give me 3 to 4 tips  not whole response in 3 to 4 lines";
          const result = await model.generateContent(prompt);
          const response = await result.response;
          const text = response.text();
          
          return text;
        }),
      );
      const combinedText = generatedTexts.join('');
      console.log( "heeistext",combinedText);
      // const introData = await ctx.prisma.Introspection.upsert({
      //   where: {
      //     introspectionDate: input.date,
      //     AND: {
      //       user: {
      //         externalId: ctx.currentUser as string,
      //       },
      //     },
      //   },
      //   update: {
      //     introspectionData: generatedTexts[0],
      //   },
      //   create: {
      //     introspectionDate: input.date,
      //     introspectionData: generatedTexts[0],

      //   },
      // });

      const createIntroData = await ctx.prisma.introspection.upsert({
        where: {
          introspectionDate: input.date,
          AND: {
            user: {
              externalId: ctx.currentUser as string,
            },
          },
        },
        update: {
          introspectionData: combinedText,
        },
        create: {
          introspectionDate: input.date,
          introspectionData: combinedText,
          user: {
            connect: {
              externalId: ctx.currentUser as string,
            },
          },
        },
      });
    }),

  getIntrospection: publicProcedure
    .input(
      z.object({
        introspectionDate: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
     const getIntroData = await ctx.prisma.introspection.findUnique({
        where: {
          introspectionDate: input.introspectionDate,
          AND: {
            user: {
              externalId: ctx.currentUser,
            },
          },
        },
      });
     
      return getIntroData;
      
      
    }),



    getIntroQuery: publicProcedure
    .input(
      z.object({
        introspectionDate: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
     const getIntroData = await ctx.prisma.introspection.findUnique({
        where: {
          introspectionDate: input.introspectionDate,
          AND: {
            user: {
              externalId: ctx.currentUser,
            },
          },
        },
      });
      console.log(getIntroData, "getIntroDatagetIntroData");
      return getIntroData;
      
      
    }),
});
