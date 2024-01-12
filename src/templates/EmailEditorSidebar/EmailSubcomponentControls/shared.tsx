import classNames from 'classnames'
import React, { FC, ReactNode } from 'react'
import { EmailTemplate } from 'src/appTypes'

export interface EmailSubComponentControlsProps {
  componentId: string
  id: string
  emailSubComponent: EmailTemplate.UniqueSubComponent
}

interface ContainerProps {
  children: ReactNode
}

const Container: FC<ContainerProps> = ({ children }) => {
  return <div className="control-container">{children}</div>
}
Container.displayName = 'Control.Container'

interface GroupProps {
  children: ReactNode
}

const Group: FC<GroupProps> = ({ children }) => {
  return <div className="control-group">{children}</div>
}
Group.displayName = 'Control.Group'

interface LabelProps {
  children: ReactNode
  className?: string
  htmlFor?: string
  id?: string
}

const Label: FC<LabelProps> = ({ children, className, htmlFor, id }) => {
  return (
    <label id={id} className={classNames('control-label', className)} htmlFor={htmlFor}>
      {children}
    </label>
  )
}
Label.displayName = 'Control.Label'

export const Control = {
  Container,
  Group,
  Label,
}
