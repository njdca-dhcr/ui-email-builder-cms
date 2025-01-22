import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'
import userEvent, { UserEvent } from '@testing-library/user-event'
import React from 'react'
import { buildGroupShow } from 'src/testHelpers'
import { AuthProvider } from 'src/utils/AuthContext'
import { ManageMembersDialog } from '../ManageMembersDialog'
import { GroupShow } from 'src/network/groups'

describe('ManageMembersDialog', () => {
  let user: UserEvent
  let group: GroupShow

  beforeEach(async () => {
    user = userEvent.setup()
    group = buildGroupShow()
  })

  const renderComponent = () => {
    return render(
      <AuthProvider>
        <QueryClientProvider client={new QueryClient()}>
          <ManageMembersDialog group={group} />
        </QueryClientProvider>
      </AuthProvider>,
    )
  }

  const renderAndOpen = async () => {
    const rendered = renderComponent()
    await user.click(rendered.getByRole('button'))
    return rendered
  }

  it('displays a button that opens the dialog', async () => {
    const { getByRole, baseElement } = renderComponent()
    expect(baseElement.querySelector('[data-state="open"]')).toBeFalsy()
    await user.click(getByRole('button', { name: 'Add User' }))
    expect(baseElement.querySelector('[data-state="open"]')).toBeTruthy()
  })

  describe('the dialog', () => {
    it('has a title', async () => {
      const { baseElement } = await renderAndOpen()
      expect(baseElement.querySelector('.dialog-content')).toHaveTextContent(
        `Manage ${group.name} Users`,
      )
    })

    it('can be canceled', async () => {
      const { baseElement, getByRole } = await renderAndOpen()

      expect(baseElement.querySelector('[data-state="open"]')).toBeTruthy()
      await user.click(getByRole('button', { name: 'Cancel' }))
      expect(baseElement.querySelector('[data-state="open"]')).toBeFalsy()
    })
  })
})
