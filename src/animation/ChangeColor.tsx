import { Capsule } from "./primitives/Capsule";

export const ChangeColor = Capsule(
  {color: ["#aaa", "#000"]},
  {duration: 2, repeat: Infinity}
)
