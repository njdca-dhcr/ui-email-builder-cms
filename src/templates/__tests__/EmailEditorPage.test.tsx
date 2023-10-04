import React from 'react'
import { RenderResult, render } from '@testing-library/react'
import type { EmailTemplate } from 'src/appTypes'
import EmailEditorPage, { Head } from '../EmailEditorPage'
import {
  buildEmailTemplateComponent,
  buildEmailTemplateConfig,
  buildEmailTemplateSubComponent,
} from 'src/testHelpers'
import userEvent, { UserEvent } from '@testing-library/user-event'
import { faker } from '@faker-js/faker'
import { buildComponentKey, buildSubComponentKey } from 'src/utils/emailPartKeys'

describe('EmailEditorPage', () => {
  let emailTemplate: EmailTemplate.Config
  let rendered: RenderResult
  let user: UserEvent

  beforeEach(() => {
    user = userEvent.setup()
    emailTemplate = buildEmailTemplateConfig({
      components: [
        buildEmailTemplateComponent('Header', {
          subComponents: [
            buildEmailTemplateSubComponent('Header', { kind: 'Title' }),
            buildEmailTemplateSubComponent('Header', { kind: 'ProgramName' }),
          ],
        }),
        buildEmailTemplateComponent('Name'),
        buildEmailTemplateComponent('Body', {
          subComponents: [
            buildEmailTemplateSubComponent('Body', { kind: 'Intro' }),
            buildEmailTemplateSubComponent('Body', { kind: 'Status' }),
            buildEmailTemplateSubComponent('Body', { kind: 'SupplementalContent' }),
          ],
        }),
        buildEmailTemplateComponent('Amount', {
          subComponents: [buildEmailTemplateSubComponent('Amount', { kind: 'Breakdown' })],
        }),
        buildEmailTemplateComponent('Footer', {
          subComponents: [buildEmailTemplateSubComponent('Footer', { kind: 'AdditionalContent' })],
        }),
        buildEmailTemplateComponent('Disclaimer'),
      ],
    })
    rendered = render(<EmailEditorPage pageContext={{ emailTemplate }} />)
  })

  it('is displays the layout', () => {
    const { baseElement } = rendered
    expect(baseElement.querySelector('.layout')).not.toBeNull()
  })

  it('displays the EmailEditorContent', () => {
    const { baseElement } = rendered
    const h1 = baseElement.querySelector('h1[contenteditable="true"]')
    expect(h1).not.toBeNull()
    expect(h1).toHaveTextContent('Title')
  })

  it('displays the EmailEditorSidebar', () => {
    const { queryByText } = rendered
    expect(queryByText('Back')).not.toBeNull()
  })

  describe('Head', () => {
    it("uses the email template's name as the title", () => {
      const { baseElement } = render(<Head pageContext={{ emailTemplate }} {...({} as any)} />)
      expect(baseElement.querySelector('title')).toHaveTextContent(emailTemplate.name)
    })
  })

  describe('toggling/editing components and their subcomponents', () => {
    it('preserves entered subcomponent text after toggling a subcomponent off and then on again', async () => {
      const value = faker.lorem.paragraph()
      const { baseElement } = rendered
      const input = () => baseElement.querySelector('td h1')
      const subComponentToggle = () =>
        baseElement.querySelector(`#toggle-${buildSubComponentKey('0', '0')}`)!

      await user.clear(input()!)
      await user.type(input()!, value)
      expect(input()).toHaveTextContent(value)

      await user.click(subComponentToggle())
      expect(input()).toBeNull()

      await user.click(subComponentToggle())
      expect(input()).not.toBeNull()
      expect(input()).toHaveTextContent(value)
    })

    it('preserves entered subcomponent text after toggling a component off and then on again', async () => {
      const value = faker.lorem.paragraph()
      const { baseElement } = rendered
      const input = () => baseElement.querySelector('td h1')
      const componentToggle = () => baseElement.querySelector(`#toggle-${buildComponentKey('0')}`)!

      await user.clear(input()!)
      await user.type(input()!, value)
      expect(input()).toHaveTextContent(value)

      await user.click(componentToggle())
      expect(input()).toBeNull()

      await user.click(componentToggle())
      expect(input()).not.toBeNull()
      expect(input()).toHaveTextContent(value)
    })

    it('preserves entered component text after toggling a component off and then on again', async () => {
      const value = faker.lorem.paragraph()
      const { baseElement, queryByLabelText } = rendered
      const input = () => queryByLabelText("Recipient's name")
      const componentToggle = () => baseElement.querySelector(`#toggle-${buildComponentKey('1')}`)!

      await user.clear(input()!)
      await user.type(input()!, value)
      expect(input()).toHaveTextContent(value)

      await user.click(componentToggle())
      expect(input()).toBeNull()

      await user.click(componentToggle())
      expect(input()).not.toBeNull()
      expect(input()).toHaveTextContent(value)
    })
  })
})
