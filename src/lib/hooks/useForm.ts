import { FormSubmitEvent } from "~/db/types";
import { ChangeEvent } from "../interface";
import z from "zod";

export const useForm = <S>(schema: z.ZodType<S>) => {

  const registerSubmit = (callback: (values: S) => void) => (e: FormSubmitEvent) => {
    e.preventDefault();
    const form = e.currentTarget;
    let formData = new FormData(form);
    let rawValues:any = {};

    formData.forEach((v, k) => {
      (rawValues)[k] = v;
    });

    let booleanFields = Object.entries((schema as any).shape as object).filter(([_,f]) => f.type === "boolean")
    booleanFields.forEach(([name]) => {
      if (rawValues[name]) rawValues[name] = true
      else rawValues[name] = false
    })

    console.log(rawValues)
    let result = schema.parse(rawValues)

    callback(result);
  };

  const register = (name: keyof S) => {
    return {
      name: name
    }
  }

  const registerCheckbox = () => ({
    onchange: (e:ChangeEvent<HTMLInputElement>) => e.currentTarget.value = String(e.currentTarget.checked) 
  })

  return {registerSubmit, registerCheckbox, register}

}
