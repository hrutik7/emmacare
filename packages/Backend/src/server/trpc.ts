import { initTRPC, inferAsyncReturnType } from "@trpc/server";
import {
  getAuth,
  SignedInAuthObject,
  SignedOutAuthObject,
} from "@clerk/nextjs/server";
import type { NextRequest } from "next/server";
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import SuperJSON from "superjson";
/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
import * as trpcExpress from "@trpc/server/adapters/express";
import { prisma } from "./db";

type CreateContextOptions = {
  auth: SignedInAuthObject | SignedOutAuthObject;
  req?: NextRequest;
};
interface AuthContext {
  auth: SignedInAuthObject | SignedOutAuthObject;
}

export const createContextInner = async ({ auth }: CreateContextOptions) => {
  return {
    auth,
    prisma,
  };
};
// created for each request
export const createContext = async (opts: { req: NextRequest }) => {
  const auth = getAuth(opts.req);

  return createContextInner({
    auth,
  });
}; // context
type Context = inferAsyncReturnType<typeof createContext>;
export const t = initTRPC.context<Context>().create();
/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */

const isAuthed = t.middleware(({ next, ctx }) => {
  if (!ctx.auth.userId) {
    console.log("in if");
    throw new Error("Not authenticated");
  }
  console.log("in else");
  return next({
    ctx: {
      auth: ctx.auth,
    },
  });
});
export const createTRPCRouter = t.router;

export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(isAuthed);
