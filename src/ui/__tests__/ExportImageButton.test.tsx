import React from 'react'
import { faker } from '@faker-js/faker'
import { render } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ExportImageButton } from '../ExportImageButton'
import { download } from 'src/utils/download'
import userEvent from '@testing-library/user-event'
import { buildUseMutationResult } from 'src/factories'
import { useExportImage } from 'src/network/useExportImage'
import { asMock } from 'src/testHelpers'

jest.mock('src/utils/download')
jest.mock('src/network/useExportImage')

describe('ExportImageButton', () => {
  let client: QueryClient

  beforeEach(() => {
    client = new QueryClient()
    const mutationResult = buildUseMutationResult<ReturnType<typeof useExportImage>>()
    asMock(useExportImage).mockReturnValue(mutationResult)
  })

  it('is a button', () => {
    const { queryByRole } = render(
      <QueryClientProvider client={client}>
        <ExportImageButton html={() => faker.lorem.paragraph()} fileName={faker.lorem.word()}>
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
        <ExportImageButton html={() => faker.lorem.paragraph()} fileName={faker.lorem.word()}>
          <div>{text}</div>
        </ExportImageButton>
      </QueryClientProvider>,
    )
    expect(baseElement).toContainHTML(`<div>${text}</div>`)
  })

  it('sends the html to the server when clicked', async () => {
    const user = userEvent.setup()
    const mutate = jest.fn()
    const mutationResult = buildUseMutationResult<ReturnType<typeof useExportImage>>({ mutate })
    const html = `<html><body>${faker.lorem.paragraph()}</body></html>`
    const filename = faker.lorem.word()
    asMock(useExportImage).mockReturnValue(mutationResult)

    expect(mutate).not.toHaveBeenCalled()

    const { getByRole, queryByText } = render(
      <QueryClientProvider client={client}>
        <ExportImageButton html={() => html} fileName={filename}>
          {faker.lorem.word()}
        </ExportImageButton>
      </QueryClientProvider>,
    )

    const button = getByRole('button')
    await user.click(button)
    expect(mutate).toHaveBeenCalledWith(html, expect.anything())
  })

  it('displays a loading overlay when loading', () => {
    const mutate = jest.fn()
    const mutationResult = buildUseMutationResult<ReturnType<typeof useExportImage>>({
      mutate,
      isPending: true,
    })
    const html = `<html><body>${faker.lorem.paragraph()}</body></html>`
    const filename = faker.lorem.word()
    asMock(useExportImage).mockReturnValue(mutationResult)

    const { queryByText } = render(
      <QueryClientProvider client={client}>
        <ExportImageButton html={() => html} fileName={filename}>
          {faker.lorem.word()}
        </ExportImageButton>
      </QueryClientProvider>,
    )

    expect(queryByText('Loading your image')).not.toBeNull()
  })

  it('downloads the image when the server responds', async () => {
    const user = userEvent.setup()
    const blob = new Blob([])
    const mutate = jest.fn().mockImplementationOnce((_html, { onSuccess }) => {
      onSuccess(blob)
    })
    const mutationResult = buildUseMutationResult<ReturnType<typeof useExportImage>>({
      mutate,
      isPending: false,
    })
    const html = `<html><body>${faker.lorem.paragraph()}</body></html>`
    const filename = faker.lorem.word()
    asMock(useExportImage).mockReturnValue(mutationResult)

    expect(mutate).not.toHaveBeenCalled()

    const { getByRole, queryByText } = render(
      <QueryClientProvider client={client}>
        <ExportImageButton html={() => html} fileName={filename}>
          {faker.lorem.word()}
        </ExportImageButton>
      </QueryClientProvider>,
    )

    const button = getByRole('button')
    await user.click(button)
    expect(mutate).toHaveBeenCalledWith(html, expect.anything())
    expect(queryByText('Loading your image')).toBeNull()
    expect(download).toHaveBeenCalledWith({
      fileBlob: blob,
      fileName: `${filename}.png`,
      fileType: 'image/png',
    })
  })
})
