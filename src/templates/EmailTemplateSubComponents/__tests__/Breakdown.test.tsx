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
    const element = rendered.getByLabelText(text)
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
    await clearAndFillWithValue('Owed label')
    expect(rendered.queryByText(value)).not.toBeNull()
    expectEmailPartContentFor(key, rendered.baseElement)
  })

  it('has an editable overpayment total', async () => {
    await clearAndFillWithValue('Owed amount')
    expect(rendered.queryByText(value)).not.toBeNull()
    expectEmailPartContentFor(key, rendered.baseElement)
  })

  it('has an editable amount waived label', async () => {
    await clearAndFillWithValue('Waived label')
    expect(rendered.queryByText(value)).not.toBeNull()
    expectEmailPartContentFor(key, rendered.baseElement)
  })

  it('has an editable amount waived total', async () => {
    await clearAndFillWithValue('Waived amount')
    expect(rendered.queryByText(value)).not.toBeNull()
    expectEmailPartContentFor(key, rendered.baseElement)
  })

  it('has an editable you must pay label', async () => {
    await clearAndFillWithValue('Must pay label')
    expect(rendered.queryByText(value)).not.toBeNull()
    expectEmailPartContentFor(key, rendered.baseElement)
  })

  it('has an editable you must pay total', async () => {
    await clearAndFillWithValue('Must pay amount')
    expect(rendered.queryByText(value)).not.toBeNull()
    expectEmailPartContentFor(key, rendered.baseElement)
  })

  it('activates when clicked', async () => {
    const user = userEvent.setup()
    const { getByLabelText, baseElement } = rendered
    expectActiveEmailPartToNotBe(key, baseElement)
    await user.click(getByLabelText('Owed label'))
    expectActiveEmailPartToBe(key, baseElement)
  })
})
