import { Capsule } from "./primitives/Capsule";

export const Intro = Capsule(
  {opacity: [0, 100], y: [100, 0], filter: ["blur(6px)", "blur(0px)"]},
  {duration: 3, type: "spring", delay: 1},
)
