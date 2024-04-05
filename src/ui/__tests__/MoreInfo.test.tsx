import { faker } from '@faker-js/faker'
import { RenderResult, render } from '@testing-library/react'
import userEvent, { UserEvent } from '@testing-library/user-event'
import React, { ReactNode } from 'react'
import { MoreInfo } from '../MoreInfo'

describe('MoreInfo', () => {
  let title: string
  let text: string
  let children: ReactNode
  let rendered: RenderResult

  beforeEach(() => {
    title = faker.lorem.words(3)
    text = faker.lorem.paragraph()
    children = <p>{text}</p>
  })

  describe('when open', () => {
    let user: UserEvent

    beforeEach(async () => {
      user = userEvent.setup()
      rendered = render(<MoreInfo title={title}>{children}</MoreInfo>)
      await user.click(rendered.getByRole('button', { name: `More information about ${title}` }))
    })

    it('displays its title as a header', () => {
      const { queryByRole } = rendered
      const result = queryByRole('heading', { name: title })
      expect(result).not.toBeNull()
    })

    it('displays its children', () => {
      expect(rendered.baseElement).toContainHTML(`<p>${text}</p>`)
    })

    it('can close the dialog', async () => {
      const { baseElement, getByRole } = rendered
      expect(baseElement).toHaveTextContent(text)
      await user.click(getByRole('button', { name: 'Close' }))
      expect(baseElement).not.toHaveTextContent(text)
    })
  })

  describe('when closed', () => {
    beforeEach(async () => {
      rendered = render(<MoreInfo title={title}>{children}</MoreInfo>)
    })

    it('displays its title as part of the button', () => {
      const { queryByRole } = rendered
      const result = queryByRole('button', { name: `More information about ${title}` })
      expect(result).not.toBeNull()
    })

    it('does not display its children', () => {
      expect(rendered.baseElement).not.toHaveTextContent(text)
    })
  })
})
