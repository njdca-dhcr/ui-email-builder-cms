import { useCallback, useMemo, useState } from 'react'

export const useLocalStorage = (
  key: string,
  defaultValue: string,
): [string, (value: string) => void] => {
  const [value, setValue] = useState(() => localStorage.getItem(key) ?? defaultValue)

  const update = useCallback(
    (newValue: string) => {
      localStorage.setItem(key, newValue)
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
