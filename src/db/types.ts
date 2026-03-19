type EventWithTarget<E, T> = E & {
  currentTarget: T
}

export type TargetSubmitEvent<T> = EventWithTarget<SubmitEvent,T>

export type FormSubmitEvent = TargetSubmitEvent<HTMLFormElement>

export type TargetKeyboardEvent<T> = EventWithTarget<KeyboardEvent,T>

export type InputKeyEvent = TargetKeyboardEvent<HTMLInputElement>
export type TextareaKeyEvent = TargetKeyboardEvent<HTMLTextAreaElement>

export type TargetMouseEvent<T> = EventWithTarget<MouseEvent,T>

export type ButtonClickEvent = TargetMouseEvent<HTMLButtonElement>

export type ChangeEvent<T extends EventTarget> =
  T extends EventTarget
    ? EventWithTarget<Event,T>
    : Event

export type InputChangeEvent = ChangeEvent<HTMLInputElement>
export type TextareaChangeEvent = ChangeEvent<HTMLTextAreaElement>
