import React from 'react'
import { AdditionalContent } from '../AdditionalContent'
import userEvent from '@testing-library/user-event'
import { render } from '@testing-library/react'
import { EmailTemplate } from 'src/appTypes'
import { faker } from '@faker-js/faker'
import {
  buildUniqueEmailSubComponent,
  emailPartWrapper,
  expectActiveEmailPartToBe,
  expectActiveEmailPartToNotBe,
} from 'src/testHelpers'
import { TEST_ID as richTextEditorTestId } from 'src/ui/RichTextEditor'

describe('AdditionalContent', () => {
  let emailSubComponent: EmailTemplate.AdditionalContent

  beforeEach(() => {
    emailSubComponent = buildUniqueEmailSubComponent('Footer', { kind: 'AdditionalContent' })
  })

  it('is editable', async () => {
    const user = userEvent.setup()
    const { getByLabelText, queryByTestId } = render(
      <AdditionalContent emailSubComponent={emailSubComponent} />,
      { wrapper: emailPartWrapper },
    )
    const input = getByLabelText('Additional content')
    await user.click(input)
    expect(queryByTestId(richTextEditorTestId)).not.toBeNull()
  })

  it('activates when clicked', async () => {
    const user = userEvent.setup()
    const { getByLabelText, baseElement } = render(
      <AdditionalContent emailSubComponent={emailSubComponent} />,
      { wrapper: emailPartWrapper },
    )
    const key = emailSubComponent.id
    expectActiveEmailPartToNotBe(key, baseElement)
    await user.click(getByLabelText('Additional content'))
    expectActiveEmailPartToBe(key, baseElement)
  })
})
