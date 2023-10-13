import React, { FC, ReactNode, createContext, useCallback, useContext, useState } from 'react'
import {
  buildComponentKey,
  buildSubComponentKey,
  buildSubComponentPartKey,
} from 'src/utils/emailPartKeys'

interface On {
  on: boolean
}

interface ComponentOn extends On {
  subComponents: { [key: string]: On | undefined }
}

interface ShouldShowEmailPartContextData {
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

export const useShouldShowEmailComponent = (
  id: string,
): { on: boolean; off: boolean; toggle: () => void } => {
  const [data, update] = useContext(ShouldShowEmailPartContext)
  const key = buildComponentKey(id)
  const isOn = data[key] ?? true

  const toggle = useCallback(() => {
    update({ ...data, [key]: !isOn })
  }, [data, update, key])

  return { on: isOn, off: !isOn, toggle }
}

export const useShouldShowEmailSubComponent = (
  componentId: string,
  id: string,
): { on: boolean; off: boolean; toggle: () => void } => {
  const [data, update] = useContext(ShouldShowEmailPartContext)
  const key = buildSubComponentKey(componentId, id)
  const isOn = data[key] ?? true

  const toggle = useCallback(() => {
    update({ ...data, [key]: !isOn })
  }, [data, update, key])

  return { on: isOn, off: !isOn, toggle }
}

export const useShouldShowEmailSubComponentPart = (
  subComponentId: string,
  id: string,
): { on: boolean; off: boolean; toggle: () => void } => {
  const [data, update] = useContext(ShouldShowEmailPartContext)
  const key = buildSubComponentPartKey(subComponentId, id)
  const isOn = data[key] ?? true

  const toggle = useCallback(() => {
    update({ ...data, [key]: !isOn })
  }, [data, update, key])

  return { on: isOn, off: !isOn, toggle }
}
