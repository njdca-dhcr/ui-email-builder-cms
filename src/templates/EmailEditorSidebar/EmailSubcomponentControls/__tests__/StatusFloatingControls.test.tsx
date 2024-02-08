import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { EmailPartsContent } from 'src/templates/EmailPartsContent'
import { StatusFloatingControls } from '../StatusFloatingControls'
import { buildUniqueEmailSubComponent } from 'src/testHelpers'

describe('StatusFloatingControls', () => {
  it('provides radio buttons for changing the spacing after the subcomponent', async () => {
    const user = userEvent.setup()
    const { getByLabelText } = render(
      <EmailPartsContent>
        <StatusFloatingControls
          emailSubComponent={buildUniqueEmailSubComponent('Body', { kind: 'Status' })}
        />
        ,
      </EmailPartsContent>,
    )
    const smallButton = getByLabelText('Small')
    const largeButton = getByLabelText('Large')
    expect(smallButton).not.toBeChecked()
    expect(largeButton).toBeChecked()

    await user.click(smallButton)
    expect(smallButton).toBeChecked()
    expect(largeButton).not.toBeChecked()

    await user.click(largeButton)
    expect(smallButton).not.toBeChecked()
    expect(largeButton).toBeChecked()
  })
})
