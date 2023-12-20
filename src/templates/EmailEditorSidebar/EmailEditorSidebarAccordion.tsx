import React, { FC, ReactNode, useState, Children } from 'react'
import { Accordion, AccordionItem, AccordionButton, AccordionPanel } from '@reach/accordion'
import '@reach/accordion/styles.css'
import times from 'lodash.times'
import { VisuallyHidden } from '@reach/visually-hidden'
import { EmailTemplate } from 'src/appTypes'
import { labelForSubComponent } from './labelForSubComponent'
import { Toggle } from 'src/ui/Toggle'
import { useShouldShowEmailPart } from '../ShouldShowEmailPart'
import './EmailEditorSidebarAccordion.css'
import { RightPointer } from 'src/ui/RightPointer'
import { EmailSubComponentControls } from './EmailSubcomponentControls'
import { labelForComponent } from './labelForComponent'
import {
  useIsCurrentlyActiveEmailComponent,
  useIsCurrentlyActiveEmailPart,
} from '../CurrentlyActiveEmailPart'
import classNames from 'classnames'
import {
  SYNC_SIDEBAR_AND_PREVIEW_SCROLL,
  useSyncSidebarAndPreviewScroll,
} from '../SyncSidebarAndPreviewScroll'

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
  emailComponent: EmailTemplate.UniqueComponent
}

const EmailComponent: FC<EmailComponentProps> = ({ children, emailComponent }) => {
  const shouldShow = useShouldShowEmailPart(emailComponent.id)
  const toggleId = `toggle-${emailComponent.id}`
  const lacksSubComponents = (emailComponent.subComponents ?? []).length === 0
  const { isActive } = useIsCurrentlyActiveEmailComponent(emailComponent)
  const { scrollPreview } = useSyncSidebarAndPreviewScroll(emailComponent.id)

  return (
    <AccordionItem
      disabled={lacksSubComponents}
      className="accordion-email-component"
      onClick={scrollPreview}
      onFocus={scrollPreview}
    >
      <div
        className={classNames('accordion-button-and-toggle', {
          [SYNC_SIDEBAR_AND_PREVIEW_SCROLL.activeEmailComponentClass]: isActive,
          required: emailComponent.required,
          optional: !emailComponent.required,
        })}
      >
        <h3>
          <AccordionButton>{labelForComponent(emailComponent.kind)}</AccordionButton>
          <div className="pointer-container">
            <RightPointer />
          </div>
        </h3>
        {!emailComponent.required && (
          <label htmlFor={toggleId} className="label-and-toggle">
            <VisuallyHidden>{labelForComponent(emailComponent.kind)}</VisuallyHidden>
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
  emailSubComponent: EmailTemplate.UniqueSubComponent
}

const EmailSubComponent: FC<EmailSubComponentProps> = ({ componentId, emailSubComponent }) => {
  const toggleId = `toggle-${emailSubComponent.id}`
  const shouldShow = useShouldShowEmailPart(emailSubComponent.id)
  const { isActive } = useIsCurrentlyActiveEmailPart(emailSubComponent.id)
  const { scrollPreview } = useSyncSidebarAndPreviewScroll(emailSubComponent.id)

  return (
    <div
      className="accordion-email-subcomponent"
      onClick={(event) => {
        event.stopPropagation()
        scrollPreview()
      }}
      onFocus={(event) => {
        event.stopPropagation()
        scrollPreview()
      }}
    >
      <div
        className={classNames('label-and-toggle', {
          [SYNC_SIDEBAR_AND_PREVIEW_SCROLL.activeEmailSubcomponentClass]: isActive,
        })}
      >
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
        id={emailSubComponent.id}
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
