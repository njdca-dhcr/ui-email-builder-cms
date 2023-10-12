import React from 'react'
import { faker } from '@faker-js/faker'
import { RenderResult, render } from '@testing-library/react'
import userEvent, { UserEvent } from '@testing-library/user-event'
import { EmailTemplate } from 'src/appTypes'
import {
  buildEmailTemplateSubComponent,
  emailPartWrapper,
  expectActiveEmailPartToBe,
  expectActiveEmailPartToNotBe,
  expectEmailPartContentFor,
} from 'src/testHelpers'
import { buildSubComponentKey } from 'src/utils/emailPartKeys'
import { LoginDetails } from '../LoginDetails'

describe('LoginDetails', () => {
  let componentId: string
  let id: string
  let emailSubComponent: EmailTemplate.SubComponent<'Body'>

  beforeEach(() => {
    componentId = faker.lorem.words(2)
    id = faker.lorem.words(3)
    emailSubComponent = buildEmailTemplateSubComponent('Body', { kind: 'LoginDetails' })
  })

  it('activates when clicked', async () => {
    const user = userEvent.setup()
    const { getByLabelText, baseElement } = render(
      <LoginDetails componentId={componentId} id={id} emailSubComponent={emailSubComponent} />,
      { wrapper: emailPartWrapper },
    )
    const key = buildSubComponentKey(componentId, id)
    expectActiveEmailPartToNotBe(key, baseElement)
    await user.click(getByLabelText('Login details title'))
    expectActiveEmailPartToBe(key, baseElement)
  })

  describe('editable fields', () => {
    let user: UserEvent
    let rendered: RenderResult
    let value: string
    let key: string

    beforeEach(() => {
      user = userEvent.setup()
      value = faker.lorem.words(4)
      key = buildSubComponentKey(componentId, id)
      rendered = render(
        <LoginDetails componentId={componentId} id={id} emailSubComponent={emailSubComponent} />,
        { wrapper: emailPartWrapper },
      )
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

    itHasAnEditable('title', 'Login details title')
    itHasAnEditable('username label', 'Username label')
    itHasAnEditable('username value', 'Username value')
    itHasAnEditable('reset password message', 'Reset password message')
    itHasAnEditable('button', 'Reset password button')
    itHasAnEditable('reset password details', 'Reset password details')
  })
})
