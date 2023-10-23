import React from 'react'
import { faker } from '@faker-js/faker'
import { render } from '@testing-library/react'
import { DownloadButton } from '../DownloadButton'
import { download } from 'src/utils/download'
import userEvent from '@testing-library/user-event'

jest.mock('src/utils/download', () => {
  return {
    download: jest.fn(),
  }
})

describe('DownloadButton', () => {
  it('displays its children', () => {
    const text = faker.lorem.paragraph()
    const { baseElement } = render(
      <DownloadButton textToDownload={() => faker.lorem.paragraph()} fileName={faker.lorem.word()}>
        <div>{text}</div>
      </DownloadButton>,
    )
    expect(baseElement).toContainHTML(`<div>${text}</div>`)
  })

  it('is a button', () => {
    const { queryByRole } = render(
      <DownloadButton textToDownload={() => faker.lorem.paragraph()} fileName={faker.lorem.word()}>
        {faker.lorem.word()}
      </DownloadButton>,
    )
    const button = queryByRole('button')
    expect(button).not.toBeNull()
  })

  it('downloads the given content when clicked', async () => {
    const user = userEvent.setup()
    const html = `<div>${faker.lorem.paragraph()}</div>`
    const fileName = `${faker.lorem.word()}.html`

    const { queryByRole } = render(
      <DownloadButton textToDownload={() => html} fileName={fileName}>
        download
      </DownloadButton>,
    )

    const button = queryByRole('button')
    expect(button).not.toBeNull()

    expect(download).not.toHaveBeenCalled()
    await user.click(button!)
    expect(download).toHaveBeenCalledWith(html, fileName, 'text/html')
  })
})
