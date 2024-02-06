import React from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { EditDisclaimer } from '../EditDisclaimer'
import { TEST_ID as richTextEditorTestId } from 'src/ui/RichTextEditor'

describe('EditDisclaimer', () => {
  it('is editable', async () => {
    const user = userEvent.setup()
    const { queryByTestId, getByLabelText } = render(<EditDisclaimer />)

    const disclaimerField = getByLabelText('Disclaimer')
    await user.click(disclaimerField)
    expect(queryByTestId(richTextEditorTestId)).not.toBeNull()
  })
})
