import { FormSubmitEvent } from "~/db/types";
import z from "zod";
import { createEffect, createSignal } from "solid-js";
import { createStore } from "solid-js/store";

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

export const useForm = <S extends object>({schema, initialValues}:p<S> = {}) => {

  if (!schema && !initialValues) throw new Error(`You have to at least provide one of schema or initialValues to useForm`)

  let createInitial:any = {}
  if (initialValues) createInitial = initialValues
  else 
  Object.entries((schema as any).shape as object).map(i => {
    let value = null
    switch (i[1].type) {
      case "boolean":
        value = false
          break;
      case "number":
        value =  0
          break;
      case "string":
        value =  ""
          break;
      case "default":
        value = i[1].parse()
        break;
    }
    createInitial[i[0]] = value
  })

  const [errors, setErrors] = createSignal<Partial<Record<keyof S, string[]>>>({})
  const [formValues, setForm] = createStore<S>(createInitial)

  createEffect(() => Object.keys(errors()).length && console.error({...errors()}))

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
        if (rawValues[name]) {
          rawValues[name] = parseInt(rawValues[name])
        } else {
          rawValues[name] = 0
        }
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
      if (rawValues[name])
      rawValues[name] = parseInt(rawValues[name])
    })

    if (initialValues)
      rawValues = {...initialValues, ...rawValues}

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
    if (typeof formValues[name] === "boolean") {
      return {
        name: name,
        checked: formValues[name],
        type: "checkbox" as const
      }
    }
    if (typeof formValues[name] === "string" || typeof formValues[name] === "number") {
      return {
        name: name,
        value: formValues[name]
      }
    }
    return {
      name: name
    }
  }

  return {registerSubmit, setForm, register, errors, formValues}
}
