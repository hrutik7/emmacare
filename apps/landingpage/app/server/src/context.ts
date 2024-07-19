
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
  

export const createContext = async (opts: any) => {
    return await createContextInner({ auth: getAuth(opts.req) });
  };