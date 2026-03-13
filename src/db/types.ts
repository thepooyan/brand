export type InputKeyEvent = KeyboardEvent & {currentTarget: HTMLInputElement}
export type TextareaKeyEvent = KeyboardEvent & {currentTarget: HTMLTextAreaElement}
export type FormSubmitEvent = SubmitEvent & {currentTarget: HTMLFormElement}

