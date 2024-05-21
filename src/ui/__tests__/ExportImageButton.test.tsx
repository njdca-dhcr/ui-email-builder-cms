import React from 'react'
import { faker } from '@faker-js/faker'
import { render } from '@testing-library/react'
import { ExportImageButton } from '../ExportImageButton'
import { download } from 'src/utils/download'
import userEvent from '@testing-library/user-event'

jest.mock('src/utils/download', () => {
  return {
    download: jest.fn(),
  }
})

describe('ExportImageButton', () => {
  it('displays its children', () => {
    const text = faker.lorem.paragraph()
    const { baseElement } = render(
      <ExportImageButton html={faker.lorem.paragraph()} fileName={faker.lorem.word()}>
        <div>{text}</div>
      </ExportImageButton>,
    )
    expect(baseElement).toContainHTML(`<div>${text}</div>`)
  })

  it('is a button', () => {})

  it('sends the html to the server when clicked', async () => {})

  it('downloads the image when the server responds', async () => {})
})
