import React from 'react'
import { SupplementalContent } from '../SupplementalContent'
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
} from 'src/testHelpers'
import { buildSubComponentKey } from 'src/utils/emailPartKeys'

describe('SupplementalContent', () => {
  let value: string
  let componentId: string
  let id: string
  let emailSubComponent: EmailTemplate.SubComponent<'Body'>
  let user: UserEvent
  let rendered: RenderResult
  let key: string

  const clearAndFillWithValue = async (testId: string) => {
    const element = rendered.getByTestId(testId)
    await user.clear(element)
    await user.type(element, value)
  }

  beforeEach(() => {
    componentId = faker.lorem.words(2)
    id = faker.lorem.words(3)
    key = buildSubComponentKey(componentId, id)
    emailSubComponent = buildEmailTemplateSubComponent('Body', { kind: 'SupplementalContent' })
    user = userEvent.setup()
    rendered = render(
      <SupplementalContent
        componentId={componentId}
        id={id}
        emailSubComponent={emailSubComponent}
      />,
      { wrapper: emailPartWrapper },
    )
    value = faker.lorem.words(4)
  })

  it('has an editable title', async () => {
    await clearAndFillWithValue('body-supplemental-content-title')
    expect(rendered.queryByText(value)).not.toBeNull()
    expectEmailPartContentFor(key, rendered.baseElement)
  })

  it('has an editable description', async () => {
    await clearAndFillWithValue('body-supplemental-content-description')
    expect(rendered.queryByText(value)).not.toBeNull()
    expectEmailPartContentFor(key, rendered.baseElement)
  })

  it('activates when clicked', async () => {
    const user = userEvent.setup()
    const { getByTestId, baseElement } = rendered
    expectActiveEmailPartToNotBe(key, baseElement)
    await user.click(getByTestId('body-supplemental-content-title'))
    expectActiveEmailPartToBe(key, baseElement)
  })
})
