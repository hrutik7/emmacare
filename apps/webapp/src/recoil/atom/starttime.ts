import { atom } from "recoil";

export const startTimeAtom = atom({
  key: "startTimeState",
  default: {
    id : 0,
    startTime : "",
    endTime : "",
  },
});