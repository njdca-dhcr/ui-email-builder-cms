import React from 'react'
import { render } from '@testing-library/react'
import { faker } from '@faker-js/faker'
import userEvent from '@testing-library/user-event'
import { Accordion, AccordionItem, AccordionButton, AccordionPanel } from '@reach/accordion'
import { ShouldShowEmailPart } from '../../ShouldShowEmailPart'
import { EmailEditorSidebarAccordion } from '../EmailEditorSidebarAccordion'
import { EmailTemplate } from 'src/appTypes'
import {
  WrapperComponent,
  buildUniqueEmailComponent,
  buildUniqueEmailSubComponent,
} from 'src/testHelpers'
import { CurrentlyActiveEmailPart } from 'src/templates/CurrentlyActiveEmailPart'

describe(EmailEditorSidebarAccordion.Container.displayName!, () => {
  it('displays its children', () => {
    const text = faker.lorem.paragraph()
    const { baseElement } = render(
      <EmailEditorSidebarAccordion.Container>
        <span>{text}</span>
      </EmailEditorSidebarAccordion.Container>,
    )
    expect(baseElement).toContainHTML(`<span>${text}</span>`)
  })

  it('is an accordion', async () => {
    const user = userEvent.setup()
    const { baseElement, getByText } = render(
      <EmailEditorSidebarAccordion.Container>
        <AccordionItem>
          <AccordionButton>A</AccordionButton>
          <AccordionPanel>Panel A</AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>B</AccordionButton>
          <AccordionPanel>Panel B</AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>C</AccordionButton>
          <AccordionPanel>Panel C</AccordionPanel>
        </AccordionItem>
      </EmailEditorSidebarAccordion.Container>,
    )

    const totalItems = (state: 'open' | 'collapsed'): number =>
      baseElement.querySelectorAll(`[data-reach-accordion-item][data-state="${state}"]`).length

    expect(baseElement.querySelector('[data-reach-accordion]')).not.toBeNull()

    expect(totalItems('collapsed')).toEqual(3)
    expect(totalItems('open')).toEqual(0)

    await user.click(getByText('A'))
    expect(totalItems('collapsed')).toEqual(2)
    expect(totalItems('open')).toEqual(1)

    await user.click(getByText('B'))
    expect(totalItems('collapsed')).toEqual(1)
    expect(totalItems('open')).toEqual(2)

    await user.click(getByText('B'))
    expect(totalItems('collapsed')).toEqual(2)
    expect(totalItems('open')).toEqual(1)
  })

  it('can expand all accordion panels', async () => {
    const user = userEvent.setup()
    const { baseElement, getByText } = render(
      <EmailEditorSidebarAccordion.Container>
        <AccordionItem>
          <AccordionButton>A</AccordionButton>
          <AccordionPanel>Panel A</AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>B</AccordionButton>
          <AccordionPanel>Panel B</AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>C</AccordionButton>
          <AccordionPanel>Panel C</AccordionPanel>
        </AccordionItem>
      </EmailEditorSidebarAccordion.Container>,
    )
    const totalItems = (state: 'open' | 'collapsed'): number =>
      baseElement.querySelectorAll(`[data-reach-accordion-item][data-state="${state}"]`).length

    expect(totalItems('collapsed')).toEqual(3)
    expect(totalItems('open')).toEqual(0)
    await user.click(getByText('Expand All'))
    expect(totalItems('collapsed')).toEqual(0)
    expect(totalItems('open')).toEqual(3)
  })

  it('can collapse all accordion panels', async () => {
    const user = userEvent.setup()
    const { baseElement, getByText } = render(
      <EmailEditorSidebarAccordion.Container>
        <AccordionItem>
          <AccordionButton>A</AccordionButton>
          <AccordionPanel>Panel A</AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>B</AccordionButton>
          <AccordionPanel>Panel B</AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <AccordionButton>C</AccordionButton>
          <AccordionPanel>Panel C</AccordionPanel>
        </AccordionItem>
      </EmailEditorSidebarAccordion.Container>,
    )
    const totalItems = (state: 'open' | 'collapsed'): number =>
      baseElement.querySelectorAll(`[data-reach-accordion-item][data-state="${state}"]`).length

    await user.click(getByText('A'))
    await user.click(getByText('B'))
    await user.click(getByText('C'))

    expect(totalItems('collapsed')).toEqual(0)
    expect(totalItems('open')).toEqual(3)
    await user.click(getByText('Collapse All'))
    expect(totalItems('collapsed')).toEqual(3)
    expect(totalItems('open')).toEqual(0)
  })
})

describe(EmailEditorSidebarAccordion.EmailComponent.displayName!, () => {
  let emailComponent: EmailTemplate.UniqueComponent

  beforeEach(() => {
    emailComponent = buildUniqueEmailComponent('Header')
  })

  const wrapper: WrapperComponent = ({ children }) => {
    return (
      <ShouldShowEmailPart>
        <Accordion>
          <AccordionItem>{children}</AccordionItem>
        </Accordion>
      </ShouldShowEmailPart>
    )
  }

  it('displays its children in an accordion panel', () => {
    const text = faker.lorem.paragraph()
    const { baseElement } = render(
      <EmailEditorSidebarAccordion.EmailComponent emailComponent={emailComponent}>
        <span>{text}</span>
      </EmailEditorSidebarAccordion.EmailComponent>,
      { wrapper },
    )
    const panel = baseElement.querySelector('[data-reach-accordion-panel]')
    expect(panel).not.toBeNull()

    expect(panel).toContainHTML(`<span>${text}</span>`)
  })

  it('displays an accordion item header/button', () => {
    const { baseElement } = render(
      <EmailEditorSidebarAccordion.EmailComponent emailComponent={emailComponent}>
        <span />
      </EmailEditorSidebarAccordion.EmailComponent>,
      { wrapper },
    )

    const headerButton = baseElement.querySelector('h3 > [data-reach-accordion-button]')
    expect(headerButton).not.toBeNull()
    expect(headerButton).toHaveTextContent(emailComponent.kind)
  })

  it('displays a description when available', () => {
    emailComponent.description = faker.lorem.paragraph()
    const { queryByText } = render(
      <EmailEditorSidebarAccordion.EmailComponent emailComponent={emailComponent}>
        <span />
      </EmailEditorSidebarAccordion.EmailComponent>,
      { wrapper },
    )
    expect(queryByText(emailComponent.description)).not.toBeNull()
  })

  it('does not display a description when unavailable', () => {
    emailComponent.description = undefined
    const { baseElement } = render(
      <EmailEditorSidebarAccordion.EmailComponent emailComponent={emailComponent}>
        <span />
      </EmailEditorSidebarAccordion.EmailComponent>,
      { wrapper },
    )
    expect(baseElement.querySelector('.description')).toBeNull()
  })

  it('displays a toggle when the email component is not required', async () => {
    const user = userEvent.setup()
    emailComponent.required = false
    const { baseElement } = render(
      <EmailEditorSidebarAccordion.EmailComponent emailComponent={emailComponent}>
        <span />
      </EmailEditorSidebarAccordion.EmailComponent>,
      { wrapper },
    )
    const input = baseElement.querySelector('.label-and-toggle input')
    expect(input).not.toBeNull()
    expect(input).not.toBeDisabled()
    expect(input).toBeChecked()

    await user.click(input!)
    expect(input).not.toBeChecked()
  })

  it('does not display a toggle when the email component is required', () => {
    emailComponent.required = true
    const { baseElement } = render(
      <EmailEditorSidebarAccordion.EmailComponent emailComponent={emailComponent}>
        <span />
      </EmailEditorSidebarAccordion.EmailComponent>,
      { wrapper },
    )
    const input = baseElement.querySelector('input')
    expect(input).toBeNull()
  })

  it('has an enabled accordion item when the email component has subcomponents', () => {
    emailComponent.subComponents = [buildUniqueEmailSubComponent('Header', { kind: 'Title' })]
    const { baseElement } = render(
      <EmailEditorSidebarAccordion.EmailComponent emailComponent={emailComponent}>
        <span />
      </EmailEditorSidebarAccordion.EmailComponent>,
      { wrapper },
    )
    const item = baseElement.querySelector('[data-reach-accordion-item] > div')
    expect(item).not.toBeNull()
    const attribute = item?.attributes.getNamedItem('data-disabled')
    expect(attribute).toBeNull()
  })

  it('has a disabled accordion item when the email component lacks subcomponents', () => {
    emailComponent.subComponents = []
    const { baseElement } = render(
      <EmailEditorSidebarAccordion.EmailComponent emailComponent={emailComponent}>
        <span />
      </EmailEditorSidebarAccordion.EmailComponent>,
      { wrapper },
    )
    const item = baseElement.querySelector('[data-reach-accordion-item] > div')
    expect(item).not.toBeNull()
    const attribute = item?.attributes.getNamedItem('data-disabled')
    expect(attribute).not.toBeNull()
  })
})

describe(EmailEditorSidebarAccordion.EmailSubComponent.displayName!, () => {
  let emailSubComponent: EmailTemplate.UniqueSubComponent

  const wrapper: WrapperComponent = ({ children }) => {
    return <ShouldShowEmailPart>{children}</ShouldShowEmailPart>
  }

  beforeEach(() => {
    emailSubComponent = buildUniqueEmailSubComponent('Header', { kind: 'ProgramName' })
  })

  it('displays a label', () => {
    const { queryByText } = render(
      <EmailEditorSidebarAccordion.EmailSubComponent
        componentId={faker.lorem.word()}
        emailSubComponent={emailSubComponent}
      />,
      { wrapper },
    )

    expect(queryByText('Program Name')).not.toBeNull()
  })

  it('displays an enabled toggle when not required', async () => {
    const user = userEvent.setup()
    emailSubComponent.required = false
    const { queryByLabelText } = render(
      <EmailEditorSidebarAccordion.EmailSubComponent
        componentId={faker.lorem.word()}
        emailSubComponent={emailSubComponent}
      />,
      { wrapper },
    )
    const input = queryByLabelText('Program Name')
    expect(input).not.toBeNull()
    expect(input).not.toBeDisabled()
    expect(input).toBeChecked()

    await user.click(input!)
    expect(input).not.toBeChecked()
  })

  it('displays disabled toggle when required', () => {
    emailSubComponent.required = true
    const { queryByLabelText } = render(
      <EmailEditorSidebarAccordion.EmailSubComponent
        componentId={faker.lorem.word()}
        emailSubComponent={emailSubComponent}
      />,
      { wrapper },
    )
    const input = queryByLabelText('Program Name')
    expect(input).not.toBeNull()
    expect(input).toBeDisabled()
    expect(input).toBeChecked()
  })

  it('displays a description when available', () => {
    emailSubComponent.description = faker.lorem.paragraph()
    const { queryByText } = render(
      <EmailEditorSidebarAccordion.EmailSubComponent
        componentId={faker.lorem.word()}
        emailSubComponent={emailSubComponent}
      />,
      { wrapper },
    )
    expect(queryByText(emailSubComponent.description)).not.toBeNull()
  })

  it('does not display a description when unavailable', () => {
    emailSubComponent.description = undefined
    const { baseElement } = render(
      <EmailEditorSidebarAccordion.EmailSubComponent
        componentId={faker.lorem.word()}
        emailSubComponent={emailSubComponent}
      />,
      { wrapper },
    )
    expect(baseElement.querySelector('.description')).toBeNull()
  })

  it('displays subcomponent controls', () => {
    emailSubComponent = buildUniqueEmailSubComponent('Body', { kind: 'Status' })
    const { queryByText } = render(
      <EmailEditorSidebarAccordion.EmailSubComponent
        componentId={faker.lorem.word()}
        emailSubComponent={emailSubComponent}
      />,
      { wrapper },
    )
    expect(queryByText('Status variant')).not.toBeNull()
  })

  it('is highlighted when the subcomponent is active', () => {
    const { baseElement } = render(
      <ShouldShowEmailPart>
        <CurrentlyActiveEmailPart initiallyActiveEmailPartId={emailSubComponent.id}>
          <EmailEditorSidebarAccordion.EmailSubComponent
            componentId={faker.lorem.word()}
            emailSubComponent={emailSubComponent}
          />
        </CurrentlyActiveEmailPart>
      </ShouldShowEmailPart>,
    )
    expect(baseElement.querySelector('.active')).not.toBeNull()
  })

  it('is not hightlighted when the subcomponent is inactive', () => {
    const { baseElement } = render(
      <ShouldShowEmailPart>
        <CurrentlyActiveEmailPart initiallyActiveEmailPartId={faker.lorem.words(3)}>
          <EmailEditorSidebarAccordion.EmailSubComponent
            componentId={faker.lorem.word()}
            emailSubComponent={emailSubComponent}
          />
        </CurrentlyActiveEmailPart>
      </ShouldShowEmailPart>,
    )
    expect(baseElement.querySelector('.active')).toBeNull()
  })
})
