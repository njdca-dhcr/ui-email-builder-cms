import React, { FC } from 'react'
import userEvent, { UserEvent } from '@testing-library/user-event'
import { RenderResult, render } from '@testing-library/react'
import { EmailTemplate } from 'src/appTypes'
import { faker } from '@faker-js/faker'
import {
  buildEmailTemplateSubComponent,
  emailPartWrapper,
  expectActiveEmailPartToBe,
  expectActiveEmailPartToNotBe,
  expectEmailPartContentFor,
  renderEmailPart,
} from 'src/testHelpers'
import { buildSubComponentKey } from 'src/utils/emailPartKeys'
import { Directive, DirectiveVariant, useDirectiveValue } from '../Directive'

describe('Directive', () => {
  let value: string
  let componentId: string
  let id: string
  let emailSubComponent: EmailTemplate.SubComponent<'Body'>
  let user: UserEvent
  let rendered: RenderResult
  let key: string

  const clearAndFillWithValue = async (label: string) => {
    const element = rendered.getByLabelText(label)
    await user.clear(element)
    await user.type(element, value)
  }

  beforeEach(() => {
    componentId = faker.lorem.words(2)
    id = faker.lorem.words(3)
    key = buildSubComponentKey(componentId, id)
    emailSubComponent = buildEmailTemplateSubComponent('Body', { kind: 'Status' })
    user = userEvent.setup()
    value = faker.lorem.words(4)
  })

  // it('activates when clicked', async () => {
  //   rendered = render(
  //     <Directive componentId={componentId} id={id} emailSubComponent={emailSubComponent} />,
  //     { wrapper: emailPartWrapper },
  //   )
  //   const { getByLabelText, baseElement } = rendered
  //   expectActiveEmailPartToNotBe(key, baseElement)
  //   await user.click(getByLabelText('Directive Title'))
  //   expectActiveEmailPartToBe(key, baseElement)
  // })

  describe('Default - DirectiveVariant.OneStep', () => {
    it('has an editable title', async () => {
      rendered = render(
        <Directive componentId={componentId} id={id} emailSubComponent={emailSubComponent} />,
        { wrapper: emailPartWrapper },
      )
      await clearAndFillWithValue('Directive Title')
      expect(rendered.queryByText(value)).not.toBeNull()
      expectEmailPartContentFor(key, rendered.baseElement)
    })

    it('has an editable supportive information', async () => {
      rendered = render(
        <Directive componentId={componentId} id={id} emailSubComponent={emailSubComponent} />,
        { wrapper: emailPartWrapper },
      )
      await clearAndFillWithValue('Supportive information')
      expect(rendered.queryByText(value)).not.toBeNull()
      expectEmailPartContentFor(key, rendered.baseElement)
    })
  })
})
