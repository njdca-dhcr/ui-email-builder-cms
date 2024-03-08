import React, {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { EmailTemplate } from 'src/appTypes'

interface EmailPartsContentData<T extends any> {
  [key: string]: undefined | T
}

type EmailPartsContentContext<T = any> = [
  EmailPartsContentData<T>,
  Dispatch<SetStateAction<EmailPartsContentData<T>>>,
]

const EmailPartsContentContext = createContext<EmailPartsContentContext>([{}, () => {}])

export const EmailPartsContent: FC<{
  children: ReactNode
  initialData?: EmailPartsContentData<any>
}> = ({ children, initialData }) => {
  const value = useState<EmailPartsContentData<any>>(initialData ?? {})

  return (
    <EmailPartsContentContext.Provider value={value}>{children}</EmailPartsContentContext.Provider>
  )
}

export const useEmailPartsContentData = () => useContext(EmailPartsContentContext)

export const useEmailPartsContentFor = <T extends object>(
  emailPart: string | EmailTemplate.UniquePart,
  defaultValue: T,
): [T, (value: T | ((previous: T) => T)) => void] => {
  const [data, update] = useEmailPartsContentData()

  const id = typeof emailPart === 'string' ? emailPart : emailPart.id
  const mergedDefaultValue = useMemo(() => {
    return typeof emailPart === 'string'
      ? defaultValue
      : { ...defaultValue, ...emailPart.defaultValue }
  }, [])

  const value: T = data[id] ?? mergedDefaultValue

  const updateValueWithCallback = useCallback(
    (callback: (previous: T) => T) => {
      update((data) => {
        return { ...data, [id]: callback(data[id] ?? mergedDefaultValue) }
      })
    },
    [update, id, mergedDefaultValue],
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

  useEffect(() => {
    if (process.env.GATSBY_LOG_EDITS) {
      console.log(id, value)
    }
  }, [id, value])

  return [value, updateValue]
}
