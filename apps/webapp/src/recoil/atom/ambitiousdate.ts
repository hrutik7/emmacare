import { atom } from "recoil";

export const ambitiousGoalDateAtom = atom({
  key: "ambitiousGoalDateState",
  default: new Date().toISOString(),
});