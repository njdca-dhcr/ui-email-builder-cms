import React, { FC, ReactNode, createContext, useCallback, useContext, useState } from 'react'

export interface ShouldShowEmailPartContextData {
  [key: string]: boolean | undefined
}

type ShouldShowEmailPartContextType = [
  ShouldShowEmailPartContextData,
  (value: ShouldShowEmailPartContextData) => void,
]

const ShouldShowEmailPartContext = createContext<ShouldShowEmailPartContextType>([{}, () => {}])

export const ShouldShowEmailPart: FC<{
  children: ReactNode
  initialData?: ShouldShowEmailPartContextData
}> = ({ children, initialData }) => {
  const value = useState<ShouldShowEmailPartContextData>(initialData ?? {})

  return (
    <ShouldShowEmailPartContext.Provider value={value}>
      {children}
    </ShouldShowEmailPartContext.Provider>
  )
}

export const useShouldShowEmailPart = (
  id: string,
): { on: boolean; off: boolean; toggle: () => void } => {
  const [data, update] = useContext(ShouldShowEmailPartContext)
  const isOn = data[id] ?? true

  const toggle = useCallback(() => {
    update({ ...data, [id]: !isOn })
  }, [data, update, id, isOn])

  return { on: isOn, off: !isOn, toggle }
}
