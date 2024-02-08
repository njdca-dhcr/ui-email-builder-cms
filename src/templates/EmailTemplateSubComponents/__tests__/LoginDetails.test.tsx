import React, { FC } from 'react'
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
  renderEmailPart,
} from 'src/testHelpers'
import { LoginDetails, LoginDetailsVariant, useLoginDetailsValue } from '../LoginDetails'
import { TEST_ID as richTextEditorTestId } from 'src/ui/RichTextEditor'

describe('LoginDetails', () => {
  let emailSubComponent: EmailTemplate.UniqueSubComponent

  beforeEach(() => {
    emailSubComponent = buildUniqueEmailSubComponent('Body', { kind: 'LoginDetails' })
  })

  it('activates when clicked', async () => {
    const user = userEvent.setup()
    const { getByLabelText, baseElement } = render(
      <LoginDetails emailSubComponent={emailSubComponent} />,
      { wrapper: emailPartWrapper },
    )
    const key = emailSubComponent.id
    expectActiveEmailPartToNotBe(key, baseElement)
    await user.click(getByLabelText('Login details title'))
    expectActiveEmailPartToBe(key, baseElement)
  })

  describe('variants', () => {
    let user: UserEvent
    let rendered: RenderResult
    let value: string

    const VariantSelect: FC = () => {
      const [value, setValue] = useLoginDetailsValue(emailSubComponent.id)
      return (
        <label>
          Variant
          <select
            onChange={(event) => setValue({ ...value, variant: parseInt(event.target.value) })}
            value={value.variant}
          >
            <option>{LoginDetailsVariant.Details}</option>
            <option>{LoginDetailsVariant.Information}</option>
          </select>
        </label>
      )
    }

    beforeEach(() => {
      user = userEvent.setup()
      value = faker.lorem.words(4)
      rendered = renderEmailPart(
        <LoginDetails emailSubComponent={emailSubComponent} />,
        <VariantSelect />,
      )
    })

    const itHasAnEditable = (testName: string, label: string) => {
      it(`has an editable ${testName}`, async () => {
        const element = rendered.getByLabelText(label)
        await user.clear(element)
        await user.type(element, value)
        expect(rendered.queryByText(value)).not.toBeNull()
        expectEmailPartContentFor(emailSubComponent.id, rendered.baseElement)
      })
    }

    const itHasAnEditableRichText = (testName: string, label: string) => {
      it(`has an editable ${testName}`, async () => {
        const input = rendered.getByLabelText(label)
        await user.click(input)
        expect(rendered.queryByTestId(richTextEditorTestId)).not.toBeNull()
      })
    }

    describe('Details', () => {
      beforeEach(async () => {
        await user.selectOptions(
          rendered.getByLabelText('Variant'),
          LoginDetailsVariant.Details + '',
        )
      })

      itHasAnEditable('title', 'Login details title')

      itHasAnEditable('username label', 'Username label')

      itHasAnEditable('username value', 'Username value')

      itHasAnEditableRichText('reset password message', 'Reset password message')

      itHasAnEditable('button', 'Reset password button')

      itHasAnEditable('link', 'Reset password link')

      itHasAnEditableRichText('reset password details', 'Reset password details')

      it('only has the correct fields', () => {
        const all = rendered.baseElement.querySelectorAll('[aria-label]')
        expect(all).toHaveLength(7)
      })
    })

    describe('Information', () => {
      beforeEach(async () => {
        await user.selectOptions(
          rendered.getByLabelText('Variant'),
          LoginDetailsVariant.Information + '',
        )
      })

      itHasAnEditable('title', 'Login information title')

      itHasAnEditableRichText('description', 'Login information description')

      itHasAnEditable('bullet 1', 'Login information bullet 1')

      itHasAnEditable('bullet 2', 'Login information bullet 2')

      it('only has the correct fields', () => {
        const all = rendered.baseElement.querySelectorAll('[aria-label]')
        expect(all).toHaveLength(4)
      })
    })
  })
})
