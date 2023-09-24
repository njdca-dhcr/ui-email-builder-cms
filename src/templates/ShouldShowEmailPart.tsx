import React, { FC, ReactNode, createContext, useCallback, useContext, useState } from 'react'

interface On {
  on: boolean
}

interface ComponentOn extends On {
  subComponents: { [key: string]: On | undefined }
}

interface ShouldShowEmailPartContextData {
  [key: string]: ComponentOn | undefined
}

type ShouldShowEmailPartContextType = [
  ShouldShowEmailPartContextData,
  (value: ShouldShowEmailPartContextData) => void,
]

const ShouldShowEmailPartContext = createContext<ShouldShowEmailPartContextType>([{}, () => {}])

export const ShouldShowEmailPart: FC<{ children: ReactNode }> = ({ children }) => {
  const value = useState<ShouldShowEmailPartContextData>({})

  return (
    <ShouldShowEmailPartContext.Provider value={value}>
      {children}
    </ShouldShowEmailPartContext.Provider>
  )
}

export const useShouldShowEmailComponent = (id: string): { on: boolean; toggle: () => void } => {
  const [data, update] = useContext(ShouldShowEmailPartContext)
  const componentOn: ComponentOn = data[id] ?? { on: true, subComponents: {} }

  const toggle = useCallback(() => {
    update({ ...data, [id]: { ...componentOn, on: !componentOn.on } })
  }, [data, update, componentOn])

  return { on: componentOn.on, toggle }
}

export const useShouldShowEmailSubComponent = (
  componentId: string,
  id: string,
): { on: boolean; toggle: () => void } => {
  const [data, update] = useContext(ShouldShowEmailPartContext)
  const componentOn: ComponentOn = data[componentId] ?? { on: true, subComponents: {} }
  const subComponentOn: On = componentOn.subComponents[id] ?? { on: true }

  const toggle = useCallback(() => {
    update({
      ...data,
      [componentId]: {
        ...componentOn,
        subComponents: { ...componentOn.subComponents, [id]: { on: !subComponentOn.on } },
      },
    })
  }, [data, componentOn, update, subComponentOn, componentId, id])

  return { on: subComponentOn.on, toggle }
}
