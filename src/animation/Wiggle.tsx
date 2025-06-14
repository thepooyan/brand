import { Capsule } from "./primitives/Capsule";

const offset = 5;
export const Wiggle = Capsule(
  {x: [offset, -offset, offset]},
  {duration: 3, repeat: Infinity },
)
