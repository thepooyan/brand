import { FormSubmitEvent } from "~/db/types";
import z from "zod";
import { createStore } from "solid-js/store";

export const useForm = <S>(schema: z.ZodType<S>) => {

  const [errors, setErrors] = createStore<Record<string, string[]>>({})

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

    let numericFields = Object.entries((schema as any).shape as object).filter(([_,f]) => f.type === "number")
    numericFields.forEach(([name]) => {
      rawValues[name] = parseInt(rawValues[name])
    })

    console.log(rawValues)
    let result = schema.safeParse(rawValues)

    if (result.success)
      return callback(result.data);

    result.error.issues.forEach(i => {
      let key = i.path.at(0) 
      if (!key) return
      setErrors(String(key), prev => prev ? [...prev, i.message] : [i.message])
    })
  };

  const register = (name: keyof S) => {
    return {
      name: name
    }
  }

  return {registerSubmit, register, errors}

}
