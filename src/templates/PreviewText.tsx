import React, { FC, ReactNode, createContext, useContext, useState } from 'react'

type PreviewTextContextType = [string, (value: string) => void]
const PreviewTextContext = createContext<PreviewTextContextType>(['', () => {}])

interface Props {
  children: ReactNode
  initialValue?: string
}

export const PreviewText: FC<Props> = ({ children, initialValue }) => {
  const value = useState(initialValue ?? '')

  return <PreviewTextContext.Provider value={value}>{children}</PreviewTextContext.Provider>
}
export const usePreviewText = (): PreviewTextContextType => {
  return useContext(PreviewTextContext)
}
