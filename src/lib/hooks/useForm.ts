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

export const useForm = <S>({schema, initialValues}:p<S> = {}) => {

  if (!schema && !initialValues) throw new Error(`You have to at least provide one of schema or initialValues to useForm`)

  const [errors, setErrors] = createSignal<Partial<Record<keyof S, string[]>>>({})

  const registerSubmit = (callback: (values: S) => void) => (e: FormSubmitEvent) => {
    e.preventDefault();

    const form = e.currentTarget;
    let formData = new FormData(form);
    let rawValues = extractFormData<any>(formData)
    setErrors({})

    if (initialValues) {
      let booleanFields = Object.entries(initialValues).filter(f => typeof f[1] === "boolean").map(i => i[0])
      booleanFields.forEach(name => {
        if (rawValues[name]) rawValues[name] = true
        else rawValues[name] = false
      })

      let numericFields = Object.entries(initialValues).filter(f => typeof f[1] === "number").map(i => i[0])
      numericFields.forEach(name => {
        rawValues[name] = parseInt(rawValues[name])
      })
    }

    if (!schema) {
      return callback({...initialValues, ...rawValues})
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
      return callback(result.data);
    }

    result.error.issues.forEach(i => {
      let key = i.path.at(0) as keyof S
      if (!key) return
      setErrors(prev => prev[key] ? ({...prev, [key]: [...prev[key], i.message]}) : ({...prev, [key]: [i.message]}))
    })
  };

  const register = (name: keyof S) => {
    if (initialValues) {
      if (typeof initialValues[name] === "boolean") {
        return {
          name: name,
          checked: initialValues[name]
        }
      }
      return {
        name: name,
        value: String(initialValues[name])
      }
    }
    return {
      name: name,
    }
  }

  return {registerSubmit, register, errors}

}
