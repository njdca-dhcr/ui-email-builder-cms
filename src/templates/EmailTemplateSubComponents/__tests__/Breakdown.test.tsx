import React from 'react'
import { Breakdown } from '../Breakdown'
import userEvent, { UserEvent } from '@testing-library/user-event'
import { RenderResult, render } from '@testing-library/react'
import { EmailTemplate } from 'src/appTypes'
import { faker } from '@faker-js/faker'
import { buildEmailTemplateSubComponent } from 'src/testHelpers'

describe('Breakdown', () => {
  let value: string
  let componentId: string
  let id: string
  let emailSubComponent: EmailTemplate.SubComponent<'Amount'>
  let user: UserEvent
  let rendered: RenderResult

  const clearAndFillWithValue = async (text: string) => {
    const element = rendered.getByText(text)
    await user.clear(element)
    await user.type(element, value)
  }

  beforeEach(() => {
    componentId = faker.lorem.words(2)
    id = faker.lorem.words(3)
    emailSubComponent = buildEmailTemplateSubComponent('Amount', { kind: 'Breakdown' })
    user = userEvent.setup()
    rendered = render(
      <Breakdown componentId={componentId} id={id} emailSubComponent={emailSubComponent} />,
    )
    value = faker.lorem.words(4)
  })

  it('has an editable overpayment label', async () => {
    await clearAndFillWithValue('Overpayment Total')
    expect(rendered.queryByText(value)).not.toBeNull()
  })

  it('has an editable overpayment total', async () => {
    await clearAndFillWithValue('$200')
    expect(rendered.queryByText(value)).not.toBeNull()
  })

  it('has an editable amount waived label', async () => {
    await clearAndFillWithValue('Amount waived')
    expect(rendered.queryByText(value)).not.toBeNull()
  })

  it('has an editable amount waived total', async () => {
    await clearAndFillWithValue('$50')
    expect(rendered.queryByText(value)).not.toBeNull()
  })

  it('has an editable you must pay label', async () => {
    await clearAndFillWithValue('You must pay')
    expect(rendered.queryByText(value)).not.toBeNull()
  })

  it('has an editable you must pay total', async () => {
    await clearAndFillWithValue('$150')
    expect(rendered.queryByText(value)).not.toBeNull()
  })
})
