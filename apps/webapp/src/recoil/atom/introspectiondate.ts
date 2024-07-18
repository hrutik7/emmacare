import { atom } from "recoil";

export const introspectionDateAtom = atom({
  key: "introspectionDateState",
  default: new Date().toLocaleDateString(),
});