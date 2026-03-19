import { ChangeEvent } from "~/lib/interface"

export type InputKeyEvent = KeyboardEvent & {currentTarget: HTMLInputElement}
export type TextareaKeyEvent = KeyboardEvent & {currentTarget: HTMLTextAreaElement}
export type FormSubmitEvent = SubmitEvent & {currentTarget: HTMLFormElement}
export type InputChangeEvent = ChangeEvent<HTMLInputElement>

