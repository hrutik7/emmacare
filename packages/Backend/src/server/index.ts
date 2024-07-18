import express from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import connectDB from "./utils/prisma";
import cors from "cors";
import { createContext } from "./trpc";
import { appRouter } from "./api/routers";
import ts from "typescript";

const app = express();
app.use(cors());



app.use(
  "/api/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    // @ts-ignore
    createContext: createContext,
  })
);

app.listen(8080, () => {
  connectDB();

  console.log("Server started on port 8080");
});
export type AppRouter = typeof appRouter;
