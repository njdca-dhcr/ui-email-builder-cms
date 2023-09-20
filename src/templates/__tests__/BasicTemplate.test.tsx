import React from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { faker } from '@faker-js/faker'
import copy from 'copy-to-clipboard'
import type { EmailTemplate } from 'src/appTypes'
import BasicTemplate, { TEST_IDS, Head } from '../BasicTemplate'
import { TEST_ID as headerInputTestId } from '../emailPreview/HeaderInput'
import { TEST_ID as footerInputTestId } from '../emailPreview/FooterInput'
import { TEST_ID as headerTestId } from '../emailPreview/Header'
import { TEST_ID as footerTestId } from '../emailPreview/Footer'
import { TEST_ID as layoutTestId } from 'src/ui/Layout'

describe('BasicTemplate', () => {
  let emailTemplate: EmailTemplate

  beforeEach(() => {
    emailTemplate = {
      name: faker.lorem.word(),
      description: faker.lorem.paragraph(),
      components: [
        { component: 'Header', description: faker.lorem.words(3) },
        { component: 'Footer', description: faker.lorem.words(3) },
      ],
    }
  })

  it('displays the email template name and description', () => {
    const { getByTestId } = render(<BasicTemplate pageContext={{ emailTemplate }} />)
    expect(getByTestId(TEST_IDS.name)).toHaveTextContent(emailTemplate.name)
    expect(getByTestId(TEST_IDS.description)).toHaveTextContent(emailTemplate.description)
  })

  it('is displayed in a layout', () => {
    const { queryByTestId } = render(<BasicTemplate pageContext={{ emailTemplate }} />)
    expect(queryByTestId(layoutTestId)).not.toBeNull()
  })

  describe('email template components', () => {
    it('displays email template inputs and components properly', () => {
      const { queryByTestId } = render(<BasicTemplate pageContext={{ emailTemplate }} />)
      expect(queryByTestId(headerInputTestId)).not.toBeNull()
      expect(queryByTestId(footerInputTestId)).not.toBeNull()
      expect(queryByTestId(headerTestId)).not.toBeNull()
      expect(queryByTestId(footerTestId)).not.toBeNull()
    })

    it('displays inputted values as they are entered (Header)', async () => {
      const user = userEvent.setup()

      const { getByLabelText, getByTestId } = render(
        <BasicTemplate pageContext={{ emailTemplate }} />,
      )
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

      const { getByLabelText, getByTestId } = render(
        <BasicTemplate pageContext={{ emailTemplate }} />,
      )
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

      const { getByLabelText, getByRole } = render(
        <BasicTemplate pageContext={{ emailTemplate }} />,
      )

      const input: HTMLInputElement = getByLabelText('Header') as any
      const value = faker.lorem.words(4)
      await user.type(input, value)

      expect(copy).not.toHaveBeenCalled()
      await user.click(getByRole('button'))
      expect(copy).toHaveBeenCalled()

      const lastArgumentToCopy: string = (copy as jest.Mock).mock.calls[0][0]
      expect(lastArgumentToCopy).toContain(value)
    })
  })

  describe('Head', () => {
    it("uses the email template's name as the title", () => {
      const { baseElement } = render(<Head pageContext={{ emailTemplate }} {...({} as any)} />)
      expect(baseElement.querySelector('title')).toHaveTextContent(emailTemplate.name)
    })
  })
})
