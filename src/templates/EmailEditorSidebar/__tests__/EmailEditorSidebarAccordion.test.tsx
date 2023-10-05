import React from 'react'
import { render } from '@testing-library/react'
import { faker } from '@faker-js/faker'
import userEvent from '@testing-library/user-event'
import { Accordion, AccordionItem } from '@reach/accordion'
import { ShouldShowEmailPart } from '../../ShouldShowEmailPart'
import { EmailEditorSidebarAccordion } from '../EmailEditorSidebarAccordion'
import { EmailTemplate } from 'src/appTypes'
import {
  WrapperComponent,
  buildEmailTemplateComponent,
  buildEmailTemplateSubComponent,
} from 'src/testHelpers'

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

  it('is an accordion', () => {
    const { baseElement } = render(
      <EmailEditorSidebarAccordion.Container>
        <span />
      </EmailEditorSidebarAccordion.Container>,
    )

    expect(baseElement.querySelector('[data-reach-accordion]')).not.toBeNull()
  })
})

describe(EmailEditorSidebarAccordion.EmailComponent.displayName!, () => {
  let emailComponent: EmailTemplate.Component

  beforeEach(() => {
    emailComponent = buildEmailTemplateComponent('Header')
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
      <EmailEditorSidebarAccordion.EmailComponent
        emailComponent={emailComponent}
        id={faker.lorem.word()}
      >
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
      <EmailEditorSidebarAccordion.EmailComponent
        emailComponent={emailComponent}
        id={faker.lorem.word()}
      >
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
      <EmailEditorSidebarAccordion.EmailComponent
        emailComponent={emailComponent}
        id={faker.lorem.word()}
      >
        <span />
      </EmailEditorSidebarAccordion.EmailComponent>,
      { wrapper },
    )
    expect(queryByText(emailComponent.description)).not.toBeNull()
  })

  it('does not display a description when unavailable', () => {
    emailComponent.description = undefined
    const { baseElement } = render(
      <EmailEditorSidebarAccordion.EmailComponent
        emailComponent={emailComponent}
        id={faker.lorem.word()}
      >
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
      <EmailEditorSidebarAccordion.EmailComponent
        emailComponent={emailComponent}
        id={faker.lorem.word()}
      >
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
      <EmailEditorSidebarAccordion.EmailComponent
        emailComponent={emailComponent}
        id={faker.lorem.word()}
      >
        <span />
      </EmailEditorSidebarAccordion.EmailComponent>,
      { wrapper },
    )
    const input = baseElement.querySelector('input')
    expect(input).toBeNull()
  })

  it('has an enabled accordion item when the email component has subcomponents', () => {
    emailComponent.subComponents = [buildEmailTemplateSubComponent('Header', { kind: 'Title' })]
    const { baseElement } = render(
      <EmailEditorSidebarAccordion.EmailComponent
        emailComponent={emailComponent}
        id={faker.lorem.word()}
      >
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
      <EmailEditorSidebarAccordion.EmailComponent
        emailComponent={emailComponent}
        id={faker.lorem.word()}
      >
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
  let emailSubComponent: EmailTemplate.SubComponent<EmailTemplate.ComponentKind>

  const wrapper: WrapperComponent = ({ children }) => {
    return <ShouldShowEmailPart>{children}</ShouldShowEmailPart>
  }

  beforeEach(() => {
    emailSubComponent = buildEmailTemplateSubComponent('Header', { kind: 'ProgramName' })
  })

  it('displays a label', () => {
    const { queryByText } = render(
      <EmailEditorSidebarAccordion.EmailSubComponent
        componentId={faker.lorem.word()}
        id={faker.lorem.words(2)}
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
        id={faker.lorem.words(2)}
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
        id={faker.lorem.words(2)}
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
        id={faker.lorem.words(2)}
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
        id={faker.lorem.words(2)}
        emailSubComponent={emailSubComponent}
      />,
      { wrapper },
    )
    expect(baseElement.querySelector('.description')).toBeNull()
  })
})
