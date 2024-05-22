import React from 'react'
import { faker } from '@faker-js/faker'
import { render } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ExportImageButton } from '../ExportImageButton'
import { download } from 'src/utils/download'
import userEvent from '@testing-library/user-event'

jest.mock('src/utils/download', () => {
  return {
    download: jest.fn(),
  }
})

describe('ExportImageButton', () => {
  let client: QueryClient

  beforeEach(() => {
    client = new QueryClient()
  })

  it('is a button', () => {
    const { queryByRole } = render(
      <QueryClientProvider client={client}>
        <ExportImageButton
          html={faker.lorem.paragraph()}
          fileName={faker.lorem.word()}
        >
          {faker.lorem.word()}
        </ExportImageButton>
      </QueryClientProvider>,
    )
    const button = queryByRole('button')
    expect(button).not.toBeNull()
  })

  it('displays its children', () => {
    const text = faker.lorem.paragraph()
    const { baseElement } = render(
      <QueryClientProvider client={client}>
        <ExportImageButton html={faker.lorem.paragraph()} fileName={faker.lorem.word()}>
          <div>{text}</div>
        </ExportImageButton>
      </QueryClientProvider>,
    )
    expect(baseElement).toContainHTML(`<div>${text}</div>`)
  })

  it('sends the html to the server when clicked', async () => {})
  it('downloads the image when the server responds', async () => {})
})
