import { FormSubmitEvent } from "~/db/types";
import z from "zod";
import { createSignal } from "solid-js";

interface p<S> {
  schema?: z.ZodType<S>,
  initialValues?: S
}

export const extractFormData = <T>(formData: FormData) => {
  let rawValues:any = {}
  formData.forEach((v,k) => {
    rawValues[k] = v;
  })
  return rawValues as T
}

export const useForm = <S>({schema, initialValues}:p<S>) => {

  const [errors, setErrors] = createSignal<Partial<Record<keyof S, string[]>>>({})

  const registerSubmit = (callback: (values: S) => void) => (e: FormSubmitEvent) => {
    e.preventDefault();

    const form = e.currentTarget;
    let formData = new FormData(form);
    let rawValues = extractFormData<any>(formData)
    setErrors({})

    if (!schema) {
      form.reset()
      return callback(rawValues)
    }

    let booleanFields = Object.entries((schema as any).shape as object).filter(([_,f]) => f.type === "boolean")
    booleanFields.forEach(([name]) => {
      if (rawValues[name]) rawValues[name] = true
      else rawValues[name] = false
    })

    let numericFields = Object.entries((schema as any).shape as object).filter(([_,f]) => f.type === "number")
    numericFields.forEach(([name]) => {
      rawValues[name] = parseInt(rawValues[name])
    })

    let result = schema.safeParse(rawValues)

    if (result.success) {
      form.reset()
      return callback(result.data);
    }

    result.error.issues.forEach(i => {
      let key = i.path.at(0) as keyof S
      if (!key) return
      setErrors(prev => prev[key] ? ({...prev, [key]: [...prev[key], i.message]}) : ({...prev, [key]: [i.message]}))
    })
  };

  const register = (name: keyof S) => {
    return {
      name: name,
      value: initialValues && initialValues[name] || undefined
    }
  }

  return {registerSubmit, register, errors}

}
