import React from 'react'
import { render } from '@testing-library/react'
import { PreviewText } from 'src/templates/PreviewText'
import { EditPreviewText } from '../EditPreviewText'
import { faker } from '@faker-js/faker'
import userEvent from '@testing-library/user-event'

describe('EditPreviewText', () => {
  it('displays and updates the preview text', async () => {
    const user = userEvent.setup()
    const value = faker.lorem.paragraph()
    const { getByLabelText } = render(
      <PreviewText>
        <EditPreviewText />
      </PreviewText>,
    )

    const input = getByLabelText('Preview text')
    await user.type(input, value)
    expect(input).toHaveValue(value)
  })
})
