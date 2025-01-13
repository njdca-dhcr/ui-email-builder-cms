import React, { FC, ReactNode } from 'react'
import { SkipNavContent } from 'src/ui/Layout'

interface Props {
  children: ReactNode
}

export const PageContent: FC<Props> = ({ children }) => {
  return (
    <>
      <SkipNavContent />
      <main className="settings-page-content">{children}</main>
    </>
  )
}
