import { FormSubmitEvent, InputChangeEvent } from "~/db/types";
import z from "zod";
import { createEffect, createSignal } from "solid-js";

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
  const [formValues, setForm] = createSignal<S>(createInitial)

  createEffect(() => Object.keys(errors()).length && console.error({...errors()}))

  const registerSubmit = (callback: (values: S) => void) => (e: FormSubmitEvent) => {
    e.preventDefault();

    setErrors({})

    if (!schema) {
      return callback({...formValues()})
    }

    let result = schema.safeParse(formValues())

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
    let val = formValues()[name]
    if (typeof val === "boolean") {
      return {
        name: name,
        checked: val,
        type: "checkbox" as const,
        onchange: (e:InputChangeEvent) => setForm(prev => ({...prev, [name]: e.currentTarget.checked}))
      }
    }
    if (typeof val === "string") {
      return {
        name: name,
        value: val,
        onchange: (e:InputChangeEvent) => setForm(prev => ({...prev, [name]: e.currentTarget.value}))
      }
    }
    if (typeof val === "number") {
      return {
        name: name,
        value: val,
        onchange: (e:InputChangeEvent) => setForm(prev => ({...prev, [name]: parseInt(e.currentTarget.value) }))
      }
    }
    return {
      name: name
    }
  }

  type Setter<T> = <K extends keyof T>(key: K, value: T[K]) => void;

  const setter:Setter<S> = (key, val) => {
    setForm(prev => ({...prev, [key]: val}))
  }

  return {registerSubmit, setForm: setter, register, errors, formValues}
}
