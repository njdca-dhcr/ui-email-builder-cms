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
import { TEST_ID as richTextEditorTestId } from 'src/ui/RichTextEditor'

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

  const itHasAnEditableRichText = (testName: string, label: string) => {
    it(`has an editable ${testName}`, async () => {
      const input = rendered.getByLabelText(label)
      await user.click(input)
      expect(rendered.queryByTestId(richTextEditorTestId)).not.toBeNull()
    })
  }

  it('has an editable title', async () => {
    await clearAndFillWithValue('Supplemental content title')
    expect(rendered.queryByText(value)).not.toBeNull()
    expectEmailPartContentFor(key, rendered.baseElement)
  })

  itHasAnEditableRichText('description', 'Supplemental content description')

  it('activates when clicked', async () => {
    const user = userEvent.setup()
    const { getByLabelText, baseElement } = rendered
    expectActiveEmailPartToNotBe(key, baseElement)
    await user.click(getByLabelText('Supplemental content title'))
    expectActiveEmailPartToBe(key, baseElement)
  })
})
