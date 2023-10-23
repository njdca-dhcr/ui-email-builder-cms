import React from 'react'
import { render } from '@testing-library/react'
import LibraryPage from '../library'
import { TEST_ID as sidebarNavigationTestId } from 'src/ui/SidebarNavigation'
import { urlFor } from 'src/testHelpers'
import userEvent from '@testing-library/user-event'

describe('Library page', () => {
  it('is displayed in a layout', () => {
    const { baseElement } = render(<LibraryPage />)
    expect(baseElement.querySelector('.layout')).not.toBeNull()
  })

  it('displays the sidebar navigation', () => {
    const { queryByTestId } = render(<LibraryPage />)
    expect(queryByTestId(sidebarNavigationTestId)).not.toBeNull()
  })

  it('displays all of the templates', () => {
    const { getByText } = render(<LibraryPage />)
    const firstLink: HTMLAnchorElement = getByText('Email Template') as any
    expect(firstLink.href).toEqual(urlFor('/email-templates/email-template'))

    const secondLink: HTMLAnchorElement = getByText('Another Email Template') as any
    expect(secondLink.href).toEqual(urlFor('/email-templates/another-email-template'))
  })

  describe('filtering', () => {
    it('can filter the list of email templates by title', async () => {
      const user = userEvent.setup()
      const { getByLabelText, queryByText } = render(<LibraryPage />)

      expect(queryByText('Email Template')).not.toBeNull()
      expect(queryByText('Another Email Template')).not.toBeNull()

      await user.type(getByLabelText('Filter'), 'OTHER')

      expect(queryByText('Email Template')).toBeNull()
      expect(queryByText('Another Email Template')).not.toBeNull()
    })

    it('can filter the list of email templates by description', async () => {
      const user = userEvent.setup()
      const { getByLabelText, queryByText } = render(<LibraryPage />)

      expect(queryByText('Another Email Template')).not.toBeNull()
      expect(queryByText('Email Template')).not.toBeNull()

      await user.type(getByLabelText('Filter'), 'FIRST')

      expect(queryByText('Another Email Template')).toBeNull()
      expect(queryByText('Email Template')).not.toBeNull()
    })

    it('displays a message when all of the email templates are filtered out', async () => {
      const user = userEvent.setup()
      const { getByLabelText, queryByText } = render(<LibraryPage />)
      const emptyMessage = "Sorry, we don't have any email templates that match the current filter."

      expect(queryByText(emptyMessage)).toBeNull()
      await user.type(getByLabelText('Filter'), 'zzzzzzz')
      expect(queryByText(emptyMessage)).not.toBeNull()
    })
  })
})
