import { GoogleGenerativeAI } from "@google/generative-ai";
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
      // const prompt = "Write a story about an AI and magic"

      // const result = await model.generateContent(prompt);
      // const response = await result.response;
      // const text = response.text();
      // return text;
      // console.log(text,"kokokokl");

      const getIntrodata = await ctx.prisma.Improvement.findMany({
        where: {
          date: { contains: input.date },
        },
      });
      
      console.log(getIntrodata, input.date,typeof(input.date), "getIntrodata");
    }),
});
