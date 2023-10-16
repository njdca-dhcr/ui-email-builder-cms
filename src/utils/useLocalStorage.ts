import { useCallback, useMemo, useState } from 'react'

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

type AppJSON = null | string | number | AppJSON[] | { [key: string]: AppJSON }

export const useLocalStorageJSON = <T extends AppJSON>(
  key: string,
  defaultValue: T,
): [T, (value: T) => void] => {
  const defaultValueForStorage = useMemo(() => JSON.stringify(defaultValue), [defaultValue])

  const [serializedValue, setSerializedValue] = useLocalStorage(key, defaultValueForStorage)

  const value: T = useMemo(() => JSON.parse(serializedValue), [serializedValue])

  const update = useCallback(
    (newValue: T) => {
      setSerializedValue(JSON.stringify(newValue))
    },
    [setSerializedValue],
  )

  return [value, update]
}
