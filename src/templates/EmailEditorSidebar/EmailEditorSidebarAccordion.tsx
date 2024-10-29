import React, { FC, ReactNode, useState, Children } from 'react'
import { Accordion, AccordionItem, AccordionButton, AccordionPanel } from '@reach/accordion'
import '@reach/accordion/styles.css'
import times from 'lodash.times'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { EmailTemplate } from 'src/appTypes'
import { labelForSubComponent } from './labelForSubComponent'
import { useShouldShowEmailPart } from '../ShouldShowEmailPart'
import './EmailEditorSidebarAccordion.css'
import { RightPointer, VisibilityToggle } from 'src/ui'
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
import { EmailSubComponentFloatingControls } from './EmailSubcomponentControls/EmailSubcomponentFloatingControls'
import { EmailComponentDescription } from './EmailComponentDescription'
import { EmailSubComponentDescription } from './EmailSubComponentDescription'
import { useDidMount } from 'src/utils/useDidMount'

interface ContainerProps {
  children: ReactNode
}

const Container: FC<ContainerProps> = ({ children }) => {
  const [openAccordionItems, setOpenAccordionItems] = useState<number[]>([])
  const mounted = useDidMount()

  if (!mounted) return null

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
  emailComponent: EmailTemplate.Unique.Component
}

const EDITABLE_IN_SETTINGS: EmailTemplate.Kinds.Component[] = ['Banner', 'Disclaimer', 'StateSeal']
const SUBCOMPONENT_CONTAINERS: EmailTemplate.Kinds.Component[] = ['Body', 'Footer', 'Header']

const EmailComponent: FC<EmailComponentProps> = ({ children, emailComponent }) => {
  const shouldShow = useShouldShowEmailPart(emailComponent.id)
  const toggleId = `toggle-${emailComponent.id}`
  const lacksSubComponents = (emailComponent.subComponents ?? []).length === 0
  const { isActive } = useIsCurrentlyActiveEmailComponent(emailComponent)
  const { scrollPreview } = useSyncSidebarAndPreviewScroll(emailComponent.id)
  const isEditableInSettings = EDITABLE_IN_SETTINGS.includes(emailComponent.kind)
  const isSubcomponentContainer = SUBCOMPONENT_CONTAINERS.includes(emailComponent.kind)

  return (
    <AccordionItem
      disabled={lacksSubComponents}
      className={classNames('accordion-email-component', {
        [SYNC_SIDEBAR_AND_PREVIEW_SCROLL.activeEmailComponentClass]: isActive,
      })}
      onClick={scrollPreview}
      onFocus={scrollPreview}
    >
      <div className="accordion-button-and-toggle">
        <h3>
          <AccordionButton>{labelForComponent(emailComponent.kind)}</AccordionButton>
          {isSubcomponentContainer && (
            <div className="pointer-container">
              <RightPointer />
            </div>
          )}
        </h3>
        {isEditableInSettings && <span className="required-label">Required</span>}
        {!emailComponent.required && !isSubcomponentContainer && (
          <label htmlFor={toggleId} className="label-and-toggle">
            <VisuallyHidden>{labelForComponent(emailComponent.kind)}</VisuallyHidden>
            <VisibilityToggle id={toggleId} onChange={shouldShow.toggle} value={shouldShow.on} />
          </label>
        )}
      </div>
      <EmailComponentDescription emailComponent={emailComponent} />
      <AccordionPanel>{isSubcomponentContainer && children}</AccordionPanel>
    </AccordionItem>
  )
}
EmailComponent.displayName = 'EmailEditorSidebarAccordion.EmailComponent'

interface EmailSubComponentProps {
  componentId: string
  emailSubComponent: EmailTemplate.Unique.SubComponent
  nextEmailSubComponent: EmailTemplate.Unique.SubComponent | undefined
}

const EmailSubComponent: FC<EmailSubComponentProps> = ({
  componentId,
  emailSubComponent,
  nextEmailSubComponent,
}) => {
  const toggleId = `toggle-${emailSubComponent.id}`
  const shouldShow = useShouldShowEmailPart(emailSubComponent.id)
  const { isActive } = useIsCurrentlyActiveEmailPart(emailSubComponent.id)
  const { scrollPreview } = useSyncSidebarAndPreviewScroll(emailSubComponent.id)

  return (
    <>
      <div
        className={classNames('accordion-email-subcomponent', {
          [SYNC_SIDEBAR_AND_PREVIEW_SCROLL.activeEmailSubcomponentClass]: isActive && shouldShow.on,
        })}
        onClick={(event) => {
          event.stopPropagation()
          scrollPreview()
        }}
        onFocus={(event) => {
          event.stopPropagation()
          scrollPreview()
        }}
      >
        <div className={classNames('bar', { visible: shouldShow.on })} />
        <div className={classNames('label-and-toggle', { invisible: shouldShow.off })}>
          <label htmlFor={toggleId}>{labelForSubComponent(emailSubComponent.kind)}</label>
          <VisibilityToggle
            id={toggleId}
            onChange={shouldShow.toggle}
            value={shouldShow.on}
            disabled={emailSubComponent.required ?? false}
          />
        </div>
        <EmailSubComponentDescription emailSubComponent={emailSubComponent} />
        <EmailSubComponentControls
          componentId={componentId}
          emailSubComponent={emailSubComponent}
        />
      </div>
      <EmailSubComponentFloatingControls
        emailSubComponent={emailSubComponent}
        nextEmailSubComponent={nextEmailSubComponent}
      />
    </>
  )
}
EmailSubComponent.displayName = 'EmailEditorSidebarAccordion.EmailSubComponent'

export const EmailEditorSidebarAccordion = {
  Container,
  EmailComponent,
  EmailSubComponent,
}
