import React from 'react'
import { RenderResult, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { faker } from '@faker-js/faker'
import copy from 'copy-to-clipboard'
import type { EmailTemplate } from 'src/appTypes'
import { EmailEditorContents, TEST_IDS } from '../EmailEditorContents'
import { TEST_ID as headerInputTestId } from '../emailPreview/HeaderInput'
import { TEST_ID as footerInputTestId } from '../emailPreview/FooterInput'
import { TEST_ID as headerTestId } from '../emailPreview/Header'
import { TEST_ID as footerTestId } from '../emailPreview/Footer'

describe('EmailEditorContents', () => {
  let emailTemplate: EmailTemplate
  let rendered: RenderResult

  beforeEach(() => {
    emailTemplate = {
      name: faker.lorem.word(),
      description: faker.lorem.paragraph(),
      components: [
        { component: 'Header', description: faker.lorem.words(3) },
        { component: 'Footer', description: faker.lorem.words(3) },
      ],
    }
    rendered = render(<EmailEditorContents emailTemplate={emailTemplate} />)
  })

  it('displays the email template name and description', () => {
    const { getByTestId } = rendered
    expect(getByTestId(TEST_IDS.name)).toHaveTextContent(emailTemplate.name)
    expect(getByTestId(TEST_IDS.description)).toHaveTextContent(emailTemplate.description)
  })

  it('has a button that toggles between mobile and desktop versions of the preview', async () => {
    const user = userEvent.setup()
    const { getByText, queryByText, baseElement } = rendered

    expect(queryByText('Mobile Preview')).toBeNull()
    expect(queryByText('Desktop Preview')).not.toBeNull()
    expect(baseElement.querySelector('.mobile')).toBeNull()

    await user.click(getByText('View on mobile'))
    expect(queryByText('Mobile Preview')).not.toBeNull()
    expect(queryByText('Desktop Preview')).toBeNull()
    expect(baseElement.querySelector('.mobile')).not.toBeNull()

    await user.click(getByText('View on desktop'))
    expect(queryByText('Mobile Preview')).toBeNull()
    expect(queryByText('Desktop Preview')).not.toBeNull()
    expect(baseElement.querySelector('.mobile')).toBeNull()
  })

  describe('email template components', () => {
    it('displays email template inputs and components properly', () => {
      const { queryByTestId } = rendered
      expect(queryByTestId(headerInputTestId)).not.toBeNull()
      expect(queryByTestId(footerInputTestId)).not.toBeNull()
      expect(queryByTestId(headerTestId)).not.toBeNull()
      expect(queryByTestId(footerTestId)).not.toBeNull()
    })

    it('displays inputted values as they are entered (Header)', async () => {
      const user = userEvent.setup()

      const { getByLabelText, getByTestId } = rendered
      const input: HTMLInputElement = getByLabelText('Header') as any
      const value = faker.lorem.words(4)

      expect(input.value).toEqual('')
      expect(getByTestId(headerTestId)).not.toHaveTextContent(value)

      await user.type(input, value)

      expect(input.value).toEqual(value)
      expect(getByTestId(headerTestId)).toHaveTextContent(value)
    })

    it('displays inputted values as they are entered (Footer)', async () => {
      const user = userEvent.setup()

      const { getByLabelText, getByTestId } = rendered
      const input: HTMLInputElement = getByLabelText('Footer') as any
      const value = faker.lorem.words(4)

      expect(input.value).toEqual('')
      expect(getByTestId(footerTestId)).not.toHaveTextContent(value)

      await user.type(input, value)

      expect(input.value).toEqual(value)
      expect(getByTestId(footerTestId)).toHaveTextContent(value)
    })

    it('allows users to copy the current preview into their clipboard', async () => {
      const user = userEvent.setup()

      const { getByLabelText, getByText } = rendered

      const input: HTMLInputElement = getByLabelText('Header') as any
      const value = faker.lorem.words(4)
      await user.type(input, value)

      expect(copy).not.toHaveBeenCalled()
      await user.click(getByText('Copy to clipboard'))
      expect(copy).toHaveBeenCalled()

      const lastArgumentToCopy: string = (copy as jest.Mock).mock.calls[0][0]
      expect(lastArgumentToCopy).toContain(value)
    })
  })
})
