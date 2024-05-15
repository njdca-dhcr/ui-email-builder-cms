import { useCallback, useMemo, useState } from 'react'
import { z } from 'zod'

const getLocalStorage = () => {
  return typeof window !== 'undefined' ? window.localStorage : null
}

const safeLocalStorageGetItem = (key: string, defaultValue: string): string => {
  return getLocalStorage()?.getItem(key) ?? defaultValue
}

const safeLocalStorageSetItem = (key: string, value: string) => {
  getLocalStorage()?.setItem(key, value)
}

export const useLocalStorage = (
  key: string,
  defaultValue: string,
): [string, (value: string) => void] => {
  const [value, setValue] = useState(() => safeLocalStorageGetItem(key, defaultValue))

  const update = useCallback(
    (newValue: string) => {
      safeLocalStorageSetItem(key, newValue)
      setValue(newValue)
    },
    [key, setValue],
  )

  return [value, update]
}

export const useLocalStorageJSON = <T>(
  key: string,
  defaultValue: T,
  schema?: z.ZodObject<any>,
): [T, (value: T) => void] => {
  const defaultValueForStorage = useMemo(() => JSON.stringify(defaultValue), [defaultValue])

  const [serializedValue, setSerializedValue] = useLocalStorage(key, defaultValueForStorage)

  const value: T = useMemo((): T => {
    const parsed = safeParseJSON(serializedValue, defaultValue)
    if (schema && schema.safeParse(parsed).success) {
      return parsed
    } else if (schema) {
      return defaultValue
    } else {
      return parsed
    }
  }, [serializedValue, defaultValue, schema])

  const update = useCallback(
    (newValue: T) => {
      setSerializedValue(JSON.stringify(newValue))
    },
    [setSerializedValue],
  )

  return [value, update]
}

const safeParseJSON = <T>(serialized: string, defaultValue: T): T => {
  try {
    return JSON.parse(serialized)
  } catch (_error) {
    return defaultValue
  }
}
