import React from 'react'
import { render } from '@testing-library/react'
import { ProgramNameControls } from '../ProgramNameControls'
import { EmailPartsContent } from 'src/templates/EmailPartsContent'
import { faker } from '@faker-js/faker'
import { buildUniqueEmailSubComponent } from 'src/testHelpers'
import { userEvent } from '@testing-library/user-event'

describe('ProgramNameControls', () => {
  let componentId: string
  let id: string

  beforeEach(() => {
    componentId = faker.lorem.word()
    id = faker.lorem.word()
  })

  it('provides a color picker for the background color', async () => {
    const user = userEvent.setup()
    const color = faker.color.rgb()
    const { getByLabelText } = render(
      <EmailPartsContent>
        <ProgramNameControls
          componentId={componentId}
          id={id}
          emailSubComponent={buildUniqueEmailSubComponent('Body', { kind: 'ProgramName' })}
        />
      </EmailPartsContent>,
    )
    const colorPicker = getByLabelText('Background Color')
    const hexInput = getByLabelText('Background Color Hex Code')
    await user.clear(hexInput)
    await user.type(hexInput, color.replace('#', ''))
    expect(hexInput).toHaveValue(color)
    expect(colorPicker).toHaveValue(color)
  })
})
