import React from 'react'
import { render } from '@testing-library/react'
import { PreviewText } from 'src/templates/PreviewText'
import { EditPreviewText } from '../EditPreviewText'
import { faker } from '@faker-js/faker'
import userEvent from '@testing-library/user-event'
import { buildEmailTranslation, buildUniqueEmailConfig } from 'src/factories'

describe('EditPreviewText', () => {
  it('displays and updates the preview text', async () => {
    const user = userEvent.setup()
    const value = faker.lorem.paragraph()
    const { getByRole } = render(
      <PreviewText
        language="english"
        emailTemplateConfig={buildUniqueEmailConfig({
          translations: [buildEmailTranslation({ language: 'english' })],
        })}
      >
        <EditPreviewText />
      </PreviewText>,
    )

    const input = getByRole('textbox')
    await user.clear(input)
    await user.type(input, value)
    expect(input).toHaveValue(value)
  })
})
