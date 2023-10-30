import React, { FC, ReactNode, useState, Children } from 'react'
import { Accordion, AccordionItem, AccordionButton, AccordionPanel } from '@reach/accordion'
import '@reach/accordion/styles.css'
import times from 'lodash.times'
import { VisuallyHidden } from '@reach/visually-hidden'
import { EmailTemplate } from 'src/appTypes'
import { labelForSubComponent } from './labelForSubComponent'
import { buildComponentKey, buildSubComponentKey } from 'src/utils/emailPartKeys'
import { Toggle } from 'src/ui/Toggle'
import { useShouldShowEmailComponent, useShouldShowEmailSubComponent } from '../ShouldShowEmailPart'
import './EmailEditorSidebarAccordion.css'
import { RightPointer } from 'src/ui/RightPointer'
import { EmailSubComponentControls } from './EmailSubcomponentControls'

interface ContainerProps {
  children: ReactNode
}

const Container: FC<ContainerProps> = ({ children }) => {
  const [openAccordionItems, setOpenAccordionItems] = useState<number[]>([])
  return (
    <div className="sidebar-accordion-container">
      <div className="header">
        <h2>Components</h2>
        <div className="accordion-controls">
          <button onClick={() => setOpenAccordionItems([])}>Collapse All</button>
          <button
            onClick={() => {
              const totalChildren = Children.count(children)
              const everyItemIndex = times(totalChildren, (i) => i)
              setOpenAccordionItems(everyItemIndex)
            }}
          >
            Expand All
          </button>
        </div>
      </div>
      <Accordion
        collapsible
        multiple
        index={openAccordionItems}
        onChange={(toggledIndex) => {
          if (typeof toggledIndex !== 'number') {
            return
          } else if (openAccordionItems.includes(toggledIndex)) {
            setOpenAccordionItems(openAccordionItems.filter((index) => index !== toggledIndex))
          } else {
            setOpenAccordionItems([...openAccordionItems, toggledIndex])
          }
        }}
      >
        {children}
      </Accordion>
    </div>
  )
}
Container.displayName = 'EmailEditorSidebarAccordion.Container'

interface EmailComponentProps {
  children: ReactNode
  emailComponent: EmailTemplate.Component
  id: string
}

const EmailComponent: FC<EmailComponentProps> = ({ children, emailComponent, id }) => {
  const shouldShow = useShouldShowEmailComponent(id)
  const toggleId = `toggle-${buildComponentKey(id)}`
  const lacksSubComponents = (emailComponent.subComponents ?? []).length === 0

  return (
    <AccordionItem disabled={lacksSubComponents} className="accordion-email-component">
      <div className="accordion-button-and-toggle">
        <h3>
          <AccordionButton>{emailComponent.kind}</AccordionButton>
          <div className="pointer-container">
            <RightPointer />
          </div>
        </h3>
        {!emailComponent.required && (
          <label htmlFor={toggleId} className="label-and-toggle">
            <VisuallyHidden>{emailComponent.kind}</VisuallyHidden>
            <Toggle id={toggleId} onChange={shouldShow.toggle} value={shouldShow.on} />
          </label>
        )}
      </div>
      {emailComponent.description && <p className="description">{emailComponent.description}</p>}
      <AccordionPanel>{children}</AccordionPanel>
    </AccordionItem>
  )
}
EmailComponent.displayName = 'EmailEditorSidebarAccordion.EmailComponent'

interface EmailSubComponentProps {
  componentId: string
  id: string
  emailSubComponent: EmailTemplate.SubComponent<EmailTemplate.ComponentKind>
}

const EmailSubComponent: FC<EmailSubComponentProps> = ({ componentId, id, emailSubComponent }) => {
  const toggleId = `toggle-${buildSubComponentKey(componentId, id)}`
  const shouldShow = useShouldShowEmailSubComponent(componentId, id)
  return (
    <div className="accordion-email-subcomponent">
      <div className="label-and-toggle">
        <label htmlFor={toggleId}>{labelForSubComponent(emailSubComponent.kind)}</label>
        <Toggle
          id={toggleId}
          onChange={shouldShow.toggle}
          value={shouldShow.on}
          disabled={emailSubComponent.required ?? false}
        />
      </div>
      {emailSubComponent.description && (
        <p className="description">{emailSubComponent.description}</p>
      )}
      <EmailSubComponentControls
        componentId={componentId}
        id={id}
        emailSubComponent={emailSubComponent}
      />
    </div>
  )
}
EmailSubComponent.displayName = 'EmailEditorSidebarAccordion.EmailSubComponent'

export const EmailEditorSidebarAccordion = {
  Container,
  EmailComponent,
  EmailSubComponent,
}
