import React, { FC, ReactNode, createContext, useCallback, useContext, useState } from 'react'

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

export const useEmailPartsContentFor = <T extends any>(
  id: string,
  defaultValue: T,
): [T, (value: T) => void] => {
  const [data, update] = useEmailPartsContentData()

  const value: T = data[id] ?? defaultValue

  const updateValue = useCallback(
    (newValue: T) => {
      update({ ...data, [id]: newValue })
    },
    [data, update, id],
  )

  return [value, updateValue]
}
