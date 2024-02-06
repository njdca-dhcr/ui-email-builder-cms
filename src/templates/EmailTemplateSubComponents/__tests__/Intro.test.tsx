import React from 'react'
import { Intro } from '../Intro'
import userEvent from '@testing-library/user-event'
import { render } from '@testing-library/react'
import { EmailTemplate } from 'src/appTypes'
import {
  buildUniqueEmailSubComponent,
  emailPartWrapper,
  expectActiveEmailPartToBe,
  expectActiveEmailPartToNotBe,
} from 'src/testHelpers'
import { TEST_ID as richTextEditorTestId } from 'src/ui/RichTextEditor'

describe('Intro', () => {
  let emailSubComponent: EmailTemplate.UniqueSubComponent

  beforeEach(() => {
    emailSubComponent = buildUniqueEmailSubComponent('Body', { kind: 'Intro' })
  })

  it('is editable', async () => {
    const user = userEvent.setup()
    const { getByLabelText, queryByTestId } = render(
      <Intro emailSubComponent={emailSubComponent} />,
      { wrapper: emailPartWrapper },
    )

    const input = getByLabelText('Introduction')
    await user.click(input)
    expect(queryByTestId(richTextEditorTestId)).not.toBeNull()
  })

  it('activates when clicked', async () => {
    const user = userEvent.setup()
    const { getByLabelText, baseElement } = render(
      <Intro emailSubComponent={emailSubComponent} />,
      { wrapper: emailPartWrapper },
    )
    const key = emailSubComponent.id
    expectActiveEmailPartToNotBe(key, baseElement)
    await user.click(getByLabelText('Introduction'))
    expectActiveEmailPartToBe(key, baseElement)
  })
})
