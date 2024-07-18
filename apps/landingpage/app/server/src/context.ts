// import { getServerSession, type Session } from "@acme/auth";
import {getServerSession ,type Session} from "@acme/auth";
import { getAuth } from "@clerk/nextjs/server";
import type { SignedInAuthObject,SignedOutAuthObject,} from "@clerk/nextjs/api";

type AuthContextProps = {
    auth: SignedInAuthObject | SignedOutAuthObject;
  };

  export const createContextInner = async ({ auth }: AuthContextProps) => {
    return {
      auth,
      prisma,
    };
  };
  

export const createContext = async (opts: CreateNextContextOptions) => {
    return await createContextInner({ auth: getAuth(opts.req) });
  };