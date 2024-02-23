import React, {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

interface EmailPartsContentData<T extends any> {
  [key: string]: undefined | T
}

type EmailPartsContentContext<T = any> = [
  EmailPartsContentData<T>,
  Dispatch<SetStateAction<EmailPartsContentData<T>>>,
]

const EmailPartsContentContext = createContext<EmailPartsContentContext>([{}, () => {}])

export const EmailPartsContent: FC<{ children: ReactNode }> = ({ children }) => {
  const value = useState<EmailPartsContentData<any>>({})

  return (
    <EmailPartsContentContext.Provider value={value}>{children}</EmailPartsContentContext.Provider>
  )
}

export const useEmailPartsContentData = () => useContext(EmailPartsContentContext)

export const useEmailPartsContentFor = <T extends any>(
  id: string,
  defaultValue: T,
): [T, (value: T | ((previous: T) => T)) => void] => {
  const [data, update] = useEmailPartsContentData()

  const value: T = data[id] ?? defaultValue

  const updateValueWithCallback = useCallback(
    (callback: (previous: T) => T) => {
      update((data) => {
        return { ...data, [id]: callback(data[id] ?? defaultValue) }
      })
    },
    [update, id, defaultValue],
  )

  const updateValueInPlace = useCallback(
    (newValue: T) => {
      updateValueWithCallback(() => newValue)
    },
    [updateValueWithCallback],
  )

  const updateValue = useCallback(
    (newValueOrCallback: T | ((previous: T) => T)) => {
      if (typeof newValueOrCallback === 'function') {
        updateValueWithCallback(newValueOrCallback as any)
      } else {
        updateValueInPlace(newValueOrCallback)
      }
    },
    [updateValueInPlace, updateValueWithCallback],
  )

  return [value, updateValue]
}
