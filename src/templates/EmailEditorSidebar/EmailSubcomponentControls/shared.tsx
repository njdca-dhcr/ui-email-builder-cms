import classNames from 'classnames'
import React, { FC, ReactNode } from 'react'
import { EmailTemplate } from 'src/appTypes'

export interface EmailSubComponentControlsProps<T extends EmailTemplate.Kinds.SubComponent> {
  emailSubComponent: EmailTemplate.Unique.SubComponent<any, T>
}

interface ContainerProps {
  children: ReactNode
  className?: string
  layout?: 'horizontal' | 'column'
}

const Container: FC<ContainerProps> = ({ children, className, layout }) => {
  return <div className={classNames('control-container', className, layout)}>{children}</div>
}
Container.displayName = 'Control.Container'

interface GroupProps {
  children: ReactNode
  className?: string
}

const Group: FC<GroupProps> = ({ children, className }) => {
  return <div className={classNames('control-group', className)}>{children}</div>
}
Group.displayName = 'Control.Group'

interface LabelProps {
  children: ReactNode
  className?: string
  htmlFor?: string
  id?: string
  size?: 'small'
}

const Label: FC<LabelProps> = ({ children, className, htmlFor, id, size }) => {
  return (
    <label id={id} className={classNames('control-label', className, size)} htmlFor={htmlFor}>
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

export const SELECT_VARIANT_CLASSNAME = 'select-variant'
