import React, {
  FC,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import { buildComponentKey, buildSubComponentKey } from 'src/utils/emailPartKeys'

interface EmailPartsContentData<T extends any> {
  [key: string]: undefined | T
}

type EmailPartsContentContext<T = any> = [
  EmailPartsContentData<T>,
  (data: EmailPartsContentData<T>) => void,
]

const EmailPartsContentContext = createContext<EmailPartsContentContext>([{}, () => {}])

export const EmailPartsContent: FC<{ children: ReactNode }> = ({ children }) => {
  const value = useState<EmailPartsContentData<any>>({})

  return (
    <EmailPartsContentContext.Provider value={value}>{children}</EmailPartsContentContext.Provider>
  )
}

export const useEmailPartsContentData = () => useContext(EmailPartsContentContext)

export const useEmailPartsContentForComponent = <T extends any>(
  id: string,
  defaultValue: T,
): [T, (value: T) => void, { initialValue: T }] => {
  const [data, update] = useEmailPartsContentData()
  const key = buildComponentKey(id)

  const value: T = data[key] ?? defaultValue

  const updateValue = useCallback(
    (newValue: T) => {
      update({ ...data, [key]: newValue })
    },
    [data, update, key],
  )
  const initialValue = useMemo(() => value, [])

  return [value, updateValue, { initialValue }]
}

export const useEmailPartsContentForSubComponent = <T extends any>(
  componentId: string,
  id: string,
  defaultValue: T,
): [T, (value: T) => void, { initialValue: T }] => {
  const [data, update] = useEmailPartsContentData()
  const key = buildSubComponentKey(componentId, id)

  const value: T = data[key] ?? defaultValue

  const updateValue = useCallback(
    (newValue: T) => {
      update({ ...data, [key]: newValue })
    },
    [data, update, key],
  )

  const initialValue = useMemo(() => value, [])

  return [value, updateValue, { initialValue }]
}
