import React from 'react'
import { render } from '@testing-library/react'
import LibraryPage from '../library'
import { SIDEBAR_NAVIGATION_TEST_ID as sidebarNavigationTestId } from 'src/ui/SidebarNavigation'
import { urlFor } from 'src/testHelpers'
import userEvent from '@testing-library/user-event'

describe('Library page', () => {
  const FIRST_EMAIL_TEMPLATE_NAME = 'MEUC - Email Template'
  const SECOND_EMAIL_TEMPLATE_NAME = 'eMonetary - Another Email Template'

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
    const firstLink: HTMLAnchorElement = getByText(FIRST_EMAIL_TEMPLATE_NAME) as any
    expect(firstLink.href).toEqual(urlFor('/email-templates/email-template'))

    const secondLink: HTMLAnchorElement = getByText(SECOND_EMAIL_TEMPLATE_NAME) as any
    expect(secondLink.href).toEqual(urlFor('/email-templates/another-email-template'))
  })

  describe('filtering via search field', () => {
    it('can filter the list of email templates by title', async () => {
      const user = userEvent.setup()
      const { getByLabelText, queryByText } = render(<LibraryPage />)

      expect(queryByText(FIRST_EMAIL_TEMPLATE_NAME)).not.toBeNull()
      expect(queryByText(SECOND_EMAIL_TEMPLATE_NAME)).not.toBeNull()

      await user.type(getByLabelText('Filter'), 'OTHER')

      expect(queryByText(FIRST_EMAIL_TEMPLATE_NAME)).toBeNull()
      expect(queryByText(SECOND_EMAIL_TEMPLATE_NAME)).not.toBeNull()
    })

    it('can filter the list of email templates by description', async () => {
      const user = userEvent.setup()
      const { getByLabelText, queryByText } = render(<LibraryPage />)

      expect(queryByText(SECOND_EMAIL_TEMPLATE_NAME)).not.toBeNull()
      expect(queryByText(FIRST_EMAIL_TEMPLATE_NAME)).not.toBeNull()

      await user.type(getByLabelText('Filter'), 'FIRST')

      expect(queryByText(SECOND_EMAIL_TEMPLATE_NAME)).toBeNull()
      expect(queryByText(FIRST_EMAIL_TEMPLATE_NAME)).not.toBeNull()
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

  describe('filtering by type', () => {
    it('shows all when all is selected', async () => {
      const { getByLabelText, baseElement, queryByText } = render(<LibraryPage />)

      const allCheckbox: HTMLInputElement = getByLabelText('All') as any

      expect(allCheckbox).toBeChecked()
      expect(baseElement.querySelectorAll(':checked')).toHaveLength(1)
      expect(queryByText(FIRST_EMAIL_TEMPLATE_NAME)).not.toBeNull()
      expect(queryByText(SECOND_EMAIL_TEMPLATE_NAME)).not.toBeNull()
    })

    it('filters by the selected types', async () => {
      const user = userEvent.setup()
      const { getByLabelText, queryByText } = render(<LibraryPage />)

      const meucCheckbox: HTMLInputElement = getByLabelText('MEUC') as any
      const monetaryCheckbox: HTMLInputElement = getByLabelText('Monetary') as any

      await user.click(meucCheckbox)

      expect(queryByText(FIRST_EMAIL_TEMPLATE_NAME)).not.toBeNull()
      expect(queryByText(SECOND_EMAIL_TEMPLATE_NAME)).toBeNull()

      await user.click(monetaryCheckbox)

      expect(queryByText(FIRST_EMAIL_TEMPLATE_NAME)).not.toBeNull()
      expect(queryByText(SECOND_EMAIL_TEMPLATE_NAME)).not.toBeNull()

      await user.click(monetaryCheckbox)

      expect(queryByText(FIRST_EMAIL_TEMPLATE_NAME)).not.toBeNull()
      expect(queryByText(SECOND_EMAIL_TEMPLATE_NAME)).toBeNull()
    })

    it('deselects all when other types are selected and deselects those types when all is selected', async () => {
      const user = userEvent.setup()
      const { getByLabelText } = render(<LibraryPage />)

      const allCheckbox: HTMLInputElement = getByLabelText('All') as any
      const meucCheckbox: HTMLInputElement = getByLabelText('MEUC') as any
      const monetaryCheckbox: HTMLInputElement = getByLabelText('Monetary') as any

      expect(allCheckbox).toBeChecked()
      expect(meucCheckbox).not.toBeChecked()
      expect(monetaryCheckbox).not.toBeChecked()

      await user.click(meucCheckbox)
      await user.click(monetaryCheckbox)

      expect(allCheckbox).not.toBeChecked()
      expect(meucCheckbox).toBeChecked()
      expect(monetaryCheckbox).toBeChecked()

      await user.click(allCheckbox)

      expect(allCheckbox).toBeChecked()
      expect(meucCheckbox).not.toBeChecked()
      expect(monetaryCheckbox).not.toBeChecked()
    })
  })
})
