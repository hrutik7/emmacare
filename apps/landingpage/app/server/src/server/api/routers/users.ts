import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, publicProcedure } from "../../trpc";
import { Prisma, type PrismaClient } from "@prisma/client";
import { protectedProcedure } from "../../trpc";
const usersSchema = z.object({
  id: z.string(),
  email: z.string().email(),
});

const updateUserSchema = z.object({
  email: z.string().email(),
});

const getUsers = async () => {
  const users = await prisma?.user.findMany();
  return users;
};

export const userRouter = createTRPCRouter({
  users: protectedProcedure.query(async () => {
    console.log("🤣🤣")
    const users = await prisma?.user.findMany();
    return users;
  }),
});
