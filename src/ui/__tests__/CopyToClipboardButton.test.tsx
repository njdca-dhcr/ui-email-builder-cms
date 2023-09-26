import React from 'react'
import copy from 'copy-to-clipboard'
import { render } from '@testing-library/react'
import { faker } from '@faker-js/faker'
import { CopyToClipboardButton } from '../CopyToClipboardButton'
import userEvent from '@testing-library/user-event'

describe('CopyToClipboardButton', () => {
  it('renders its children', () => {
    const text = faker.lorem.paragraph()
    const { baseElement } = render(
      <CopyToClipboardButton textToCopy={() => faker.lorem.paragraph()}>
        <div>{text}</div>
      </CopyToClipboardButton>,
    )
    expect(baseElement).toHaveTextContent(text)
  })

  it('is a button', () => {
    const { queryByRole } = render(
      <CopyToClipboardButton textToCopy={() => faker.lorem.paragraph()} className="my-class">
        {faker.lorem.word()}
      </CopyToClipboardButton>,
    )
    const button = queryByRole('button')
    expect(button).not.toBeNull()
    expect(button?.className).toEqual('button my-class')
  })

  it('copies the given text to the clipboard when clicked', async () => {
    const user = userEvent.setup()
    const textToCopy = faker.lorem.paragraph()

    const { getByRole } = render(
      <CopyToClipboardButton textToCopy={() => textToCopy}>
        {faker.lorem.word()}
      </CopyToClipboardButton>,
    )

    expect(copy).not.toHaveBeenCalled()
    await user.click(getByRole('button'))
    expect(copy).toHaveBeenCalledWith(textToCopy)
  })
})
