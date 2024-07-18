import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
 

    getUser: publicProcedure
    .query(async({ ctx }:any) => {
      const userData = await  ctx.prisma.user.findUnique(
        {
          where: {
            externalId: ctx.currentUser
          }
        }
      )
      if(!userData){
        throw new Error("User not foundddddddd");
      }
      return userData;
    }
    ),

  

  
});
