import React, { FC, ReactNode, createContext, useCallback, useContext, useState } from 'react'
import { useEmailPartsContentFor } from './EmailPartsContent'
import { BaseValue } from 'src/appTypes'

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

export const useShouldShowEmailPart2 = (
  id: string,
): { on: boolean; off: boolean; toggle: () => void } => {
  const [value, setValue] = useEmailPartsContentFor<BaseValue>(id, {})
  console.log({ value })
  const visible = value.visible ?? true

  return {
    on: visible,
    off: !visible,
    toggle: () => null,
  }
}
