import { type AppType } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";
import { api } from "~/utils/api";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";
import "~/styles/globals.css";
import { SignedIn, SignedOut, SignIn } from "@clerk/nextjs";
const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider {...pageProps}>
      <RecoilRoot>
        <SignedIn>
          <Component {...pageProps} />
        </SignedIn>
        <SignedOut>
          <SignIn />
        </SignedOut>
      </RecoilRoot>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
