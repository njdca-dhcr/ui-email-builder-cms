import React from 'react'
import { faker } from '@faker-js/faker'
import { RenderResult, render } from '@testing-library/react'
import userEvent, { UserEvent } from '@testing-library/user-event'
import { EmailTemplate } from 'src/appTypes'
import {
  buildUniqueEmailSubComponent,
  emailPartWrapper,
  expectActiveEmailPartToBe,
  expectActiveEmailPartToNotBe,
  expectEmailPartContentFor,
} from 'src/testHelpers'
import { BenefitAmount } from '../BenefitAmount'

describe('BenefitAmount', () => {
  let componentId: string
  let id: string
  let emailSubComponent: EmailTemplate.UniqueSubComponent

  beforeEach(() => {
    componentId = faker.lorem.words(2)
    id = faker.lorem.words(3)
    emailSubComponent = buildUniqueEmailSubComponent('Body', { kind: 'BenefitAmount' })
  })

  it('activates when clicked', async () => {
    const user = userEvent.setup()
    const { getByLabelText, baseElement } = render(
      <BenefitAmount emailSubComponent={emailSubComponent} />,
      { wrapper: emailPartWrapper },
    )
    const key = emailSubComponent.id
    expectActiveEmailPartToNotBe(key, baseElement)
    await user.click(getByLabelText('Benefit Amount title'))
    expectActiveEmailPartToBe(key, baseElement)
  })

  describe('component', () => {
    let user: UserEvent
    let rendered: RenderResult
    let value: string
    let key: string

    beforeEach(() => {
      user = userEvent.setup()
      value = faker.lorem.words(3)
      key = emailSubComponent.id
      rendered = render(<BenefitAmount emailSubComponent={emailSubComponent} />, {
        wrapper: emailPartWrapper,
      })
    })

    const itHasAnEditable = (testName: string, label: string) => {
      it(`has an editable ${testName}`, async () => {
        const element = rendered.getByLabelText(label)
        await user.clear(element)
        await user.type(element, value)
        expect(rendered.queryByText(value)).not.toBeNull()
        expectEmailPartContentFor(key, rendered.baseElement)
      })
    }

    itHasAnEditable('title', 'Benefit Amount title')
    itHasAnEditable('description', 'Benefit Amount description')
    itHasAnEditable('box title', 'Benefit Amount box title')
    itHasAnEditable('weekly rate label', 'Benefit Amount weekly rate label')
    itHasAnEditable('weekly rate value', 'Benefit Amount weekly rate value')
    itHasAnEditable('partial weekly rate label', 'Benefit Amount partial weekly rate label')
    itHasAnEditable('partial weekly rate value', 'Benefit Amount partial weekly rate value')
    itHasAnEditable('rate explanation', 'Benefit Amount rate explanation')
    itHasAnEditable('supportive information', 'Benefit Amount rate supportive information')
  })
})
