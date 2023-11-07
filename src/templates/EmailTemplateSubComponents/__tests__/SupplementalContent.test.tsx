import React from 'react'
import { SupplementalContent } from '../SupplementalContent'
import userEvent, { UserEvent } from '@testing-library/user-event'
import { RenderResult, render } from '@testing-library/react'
import { EmailTemplate } from 'src/appTypes'
import { faker } from '@faker-js/faker'
import {
  buildUniqueEmailSubComponent,
  emailPartWrapper,
  expectActiveEmailPartToBe,
  expectActiveEmailPartToNotBe,
  expectEmailPartContentFor,
} from 'src/testHelpers'

describe('SupplementalContent', () => {
  let value: string
  let emailSubComponent: EmailTemplate.UniqueSubComponent
  let user: UserEvent
  let rendered: RenderResult
  let key: string

  const clearAndFillWithValue = async (label: string) => {
    const element = rendered.getByLabelText(label)
    await user.clear(element)
    await user.type(element, value)
  }

  beforeEach(() => {
    emailSubComponent = buildUniqueEmailSubComponent('Body', { kind: 'SupplementalContent' })
    key = emailSubComponent.id
    user = userEvent.setup()
    rendered = render(<SupplementalContent emailSubComponent={emailSubComponent} />, {
      wrapper: emailPartWrapper,
    })
    value = faker.lorem.words(4)
  })

  it('has an editable title', async () => {
    await clearAndFillWithValue('Supplemental content title')
    expect(rendered.queryByText(value)).not.toBeNull()
    expectEmailPartContentFor(key, rendered.baseElement)
  })

  it('has an editable description', async () => {
    await clearAndFillWithValue('Supplemental content description')
    expect(rendered.queryByText(value)).not.toBeNull()
    expectEmailPartContentFor(key, rendered.baseElement)
  })

  it('activates when clicked', async () => {
    const user = userEvent.setup()
    const { getByLabelText, baseElement } = rendered
    expectActiveEmailPartToNotBe(key, baseElement)
    await user.click(getByLabelText('Supplemental content title'))
    expectActiveEmailPartToBe(key, baseElement)
  })
})
