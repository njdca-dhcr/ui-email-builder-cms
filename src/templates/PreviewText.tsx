import React, { FC, ReactNode, createContext, useContext, useState } from 'react'
import { EmailTranslation } from 'src/appTypes'

type PreviewTextContextType = [string, (value: string) => void]
const PreviewTextContext = createContext<PreviewTextContextType>(['', () => {}])

interface Props {
  children: ReactNode
  emailTranslation: EmailTranslation.Unique
}

export const PreviewText: FC<Props> = ({ children, emailTranslation }) => {
  const value = useState(emailTranslation.previewText ?? '')

  return <PreviewTextContext.Provider value={value}>{children}</PreviewTextContext.Provider>
}
export const usePreviewText = (): PreviewTextContextType => {
  return useContext(PreviewTextContext)
}
