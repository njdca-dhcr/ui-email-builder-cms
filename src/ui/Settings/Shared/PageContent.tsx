import classNames from 'classnames'
import React, { FC, ReactNode } from 'react'
import { SkipNavContent } from 'src/ui/Layout'

interface Props {
  children: ReactNode
  className?: string
}

export const PageContent: FC<Props> = ({ children, className }) => {
  return (
    <>
      <SkipNavContent />
      <main className={classNames('settings-page-content', className)}>
        <div>{children}</div>
      </main>
    </>
  )
}
