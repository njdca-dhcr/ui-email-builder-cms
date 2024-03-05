import React, { FC } from 'react'
import userEvent, { UserEvent } from '@testing-library/user-event'
import { RenderResult, render } from '@testing-library/react'
import { EmailTemplate } from 'src/appTypes'
import { faker } from '@faker-js/faker'
import {
  buildUniqueEmailSubComponent,
  emailPartWrapper,
  expectEmailPartContentFor,
} from 'src/testHelpers'
import { InformationalBox } from '../InformationalBox'

describe('InformationalBox', () => {
  let value: string
  let emailSubComponent: EmailTemplate.InformationalBox
  let user: UserEvent
  let rendered: RenderResult

  const clearAndFillWithValue = async (label: string) => {
    const element = rendered.getByLabelText(label)
    await user.clear(element)
    await user.type(element, value)
  }

  beforeEach(() => {
    emailSubComponent = buildUniqueEmailSubComponent('Body', { kind: 'InformationalBox' })
    user = userEvent.setup()
    value = faker.lorem.words(4)
  })

  it('has an editable title', async () => {
    rendered = render(<InformationalBox emailSubComponent={emailSubComponent} />, {
      wrapper: emailPartWrapper,
    })
    await clearAndFillWithValue('Informational box title')
    expect(rendered.queryByText(value)).not.toBeNull()
    expectEmailPartContentFor(emailSubComponent.id, rendered.baseElement)
  })

  it('has an editable description', async () => {
    rendered = render(<InformationalBox emailSubComponent={emailSubComponent} />, {
      wrapper: emailPartWrapper,
    })
    await clearAndFillWithValue('Informational box content')
    expect(rendered.queryByText(value)).not.toBeNull()
    expectEmailPartContentFor(emailSubComponent.id, rendered.baseElement)
  })
})
