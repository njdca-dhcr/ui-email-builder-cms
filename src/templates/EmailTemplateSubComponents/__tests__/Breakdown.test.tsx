import React from 'react'
import { Breakdown } from '../Breakdown'
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

describe('Breakdown', () => {
  let value: string
  let componentId: string
  let id: string
  let emailSubComponent: EmailTemplate.SubComponent<'Amount'>
  let user: UserEvent
  let rendered: RenderResult
  let key: string

  const clearAndFillWithValue = async (text: string) => {
    const element = rendered.getByText(text)
    await user.clear(element)
    await user.type(element, value)
  }

  beforeEach(() => {
    componentId = faker.lorem.words(2)
    id = faker.lorem.words(3)
    key = buildSubComponentKey(componentId, id)
    emailSubComponent = buildEmailTemplateSubComponent('Amount', { kind: 'Breakdown' })
    user = userEvent.setup()
    rendered = render(
      <tr>
        <td>
          <Breakdown componentId={componentId} id={id} emailSubComponent={emailSubComponent} />
        </td>
      </tr>,
      { wrapper: emailPartWrapper },
    )
    value = faker.lorem.words(4)
  })

  it('has an editable overpayment label', async () => {
    await clearAndFillWithValue('Overpayment Total')
    expect(rendered.queryByText(value)).not.toBeNull()
    expectEmailPartContentFor(key, rendered.baseElement)
  })

  it('has an editable overpayment total', async () => {
    await clearAndFillWithValue('$200')
    expect(rendered.queryByText(value)).not.toBeNull()
    expectEmailPartContentFor(key, rendered.baseElement)
  })

  it('has an editable amount waived label', async () => {
    await clearAndFillWithValue('Amount waived')
    expect(rendered.queryByText(value)).not.toBeNull()
    expectEmailPartContentFor(key, rendered.baseElement)
  })

  it('has an editable amount waived total', async () => {
    await clearAndFillWithValue('$50')
    expect(rendered.queryByText(value)).not.toBeNull()
    expectEmailPartContentFor(key, rendered.baseElement)
  })

  it('has an editable you must pay label', async () => {
    await clearAndFillWithValue('You must pay')
    expect(rendered.queryByText(value)).not.toBeNull()
    expectEmailPartContentFor(key, rendered.baseElement)
  })

  it('has an editable you must pay total', async () => {
    await clearAndFillWithValue('$150')
    expect(rendered.queryByText(value)).not.toBeNull()
    expectEmailPartContentFor(key, rendered.baseElement)
  })

  it('activates when clicked', async () => {
    const user = userEvent.setup()
    const { getByText, baseElement } = rendered
    expectActiveEmailPartToNotBe(key, baseElement)
    await user.click(getByText('Overpayment Total'))
    expectActiveEmailPartToBe(key, baseElement)
  })
})
