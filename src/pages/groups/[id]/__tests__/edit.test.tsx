import React from 'react'
import { render } from '@testing-library/react'
import EditGroupPage, { Props } from '../edit'
import {
  asMock,
  buildGroupShow,
  buildUseMutationResult,
  buildUseQueryResult,
} from 'src/testHelpers'
import { useGroup, GroupShow, useUpdateGroup } from 'src/network/groups'
import { faker } from '@faker-js/faker'
import { randomUUID } from 'crypto'
import { SIDEBAR_NAVIGATION_TEST_ID as sidebarNavigationTestId } from 'src/ui/SidebarNavigation'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import userEvent, { UserEvent } from '@testing-library/user-event'
import { navigate } from 'gatsby'

jest.mock('src/network/groups', () => {
  return { useGroup: jest.fn(), useUpdateGroup: jest.fn() }
})

jest.mock('src/utils/useRedirectIfNotAdmin', () => {
  return { useRedirectIfNotAdmin: jest.fn() }
})

describe('Group Edit Page', () => {
  beforeEach(() => {
    const mutationResult = buildUseMutationResult<ReturnType<typeof useUpdateGroup>>()
    asMock(useUpdateGroup).mockReturnValue(mutationResult)
  })

  const renderPage = (props?: Partial<Props>) => {
    return render(
      <QueryClientProvider client={new QueryClient()}>
        <EditGroupPage
          pageContext={null}
          uri=""
          path=""
          location={{} as any}
          pageResources={{} as any}
          params={{ id: faker.lorem.word() }}
          children={undefined}
          data={null}
          serverData={{}}
          {...props}
        />
      </QueryClientProvider>,
    )
  }

  it('is displayed in a layout', () => {
    const query = buildUseQueryResult<GroupShow>({ isLoading: true, data: undefined })
    asMock(useGroup).mockReturnValue(query)
    const { baseElement } = renderPage()
    expect(baseElement.querySelector('.layout')).not.toBeNull()
  })

  it('displays the sidebar navigation', () => {
    const query = buildUseQueryResult<GroupShow>({ isLoading: true, data: undefined })
    asMock(useGroup).mockReturnValue(query)
    const { queryByTestId } = renderPage()
    expect(queryByTestId(sidebarNavigationTestId)).not.toBeNull()
  })

  it('loads the correct group', () => {
    const groupId = randomUUID()
    const query = buildUseQueryResult<GroupShow>({ isLoading: true, data: undefined })
    asMock(useGroup).mockReturnValue(query)
    renderPage({ params: { id: groupId } })
    expect(useGroup).toHaveBeenCalledWith(groupId)
  })

  describe('during initial loading', () => {
    it('displays an loading spinner', () => {
      const query = buildUseQueryResult<GroupShow>({ isLoading: true, data: undefined })
      asMock(useGroup).mockReturnValue(query)
      const { queryByText } = renderPage()
      expect(queryByText('Loading group')).not.toBeNull()
    })
  })

  it('displays a loading spinner while updating', async () => {
    const mutationResult = buildUseMutationResult<ReturnType<typeof useUpdateGroup>>({
      isPending: true,
    })
    asMock(useUpdateGroup).mockReturnValue(mutationResult)
    const { queryByText } = renderPage()
    expect(queryByText('Updating group')).not.toBeNull()
  })

  describe('form fields', () => {
    let group: GroupShow

    beforeEach(() => {
      group = buildGroupShow()
      const query = buildUseQueryResult<GroupShow>({ isLoading: false, data: group })
      asMock(useGroup).mockReturnValue(query)
    })

    it("uses the email template's name as the default value for name", async () => {
      const { getByRole } = await renderPage()
      const input = getByRole('textbox', { name: 'Name' })
      expect(input).toHaveValue(group.name)
    })

    it("uses the email template's description as the default value for description", async () => {
      const { getByRole } = await renderPage()
      const input = getByRole('textbox', { name: 'Description' })
      expect(input).toHaveValue(group.description)
    })
  })

  describe('successful mutation', () => {
    let user: UserEvent

    beforeEach(() => {
      user = userEvent.setup()
    })

    it('updates a group', async () => {
      const mutate = jest.fn()
      const mutationResult = buildUseMutationResult<ReturnType<typeof useUpdateGroup>>({
        mutateAsync: mutate,
      })
      asMock(useUpdateGroup).mockReturnValue(mutationResult)
      const { getByRole, getByLabelText } = await renderPage()

      expect(mutate).not.toHaveBeenCalled()

      const groupName = faker.lorem.words(3)
      const groupDescription = faker.lorem.sentence()
      await user.clear(getByLabelText('Name'))
      await user.type(getByLabelText('Name'), groupName)
      await user.clear(getByLabelText('Description'))
      await user.type(getByLabelText('Description'), groupDescription)
      await user.click(getByRole('button', { name: 'Update' }))

      expect(mutate).toHaveBeenCalledWith({
        name: groupName,
        description: groupDescription,
      })
    })

    it("navigates to the group's page", async () => {
      const mutationResult = buildUseMutationResult<ReturnType<typeof useUpdateGroup>>({
        mutateAsync: jest.fn().mockResolvedValue({ id: '123' }),
      })
      const groupId = randomUUID()
      asMock(useUpdateGroup).mockReturnValue(mutationResult)
      const { getByRole } = await renderPage({ params: { id: groupId } })

      expect(navigate).not.toHaveBeenCalled()
      await user.click(getByRole('button', { name: 'Update' }))
      expect(navigate).toHaveBeenCalledWith(`/groups/${groupId}`)
    })
  })

  describe('unsuccessful mutation', () => {
    let user: UserEvent

    beforeEach(() => {
      user = userEvent.setup()
    })

    it('displays an error message when the request goes wrong', async () => {
      const error = new Error(faker.lorem.sentence())
      const mutationResult = buildUseMutationResult<ReturnType<typeof useUpdateGroup>>({
        error,
      })
      asMock(useUpdateGroup).mockReturnValue(mutationResult)
      const { baseElement } = await renderPage()

      expect(baseElement).toHaveTextContent(error.message)
    })

    it('displays an error message when there are validation errors', async () => {
      const errorsResponse = { errors: { name: faker.lorem.sentence() } }
      const mutateAsync = jest.fn().mockResolvedValue(errorsResponse)
      const mutationResult = buildUseMutationResult<ReturnType<typeof useUpdateGroup>>({
        mutateAsync,
      })
      asMock(useUpdateGroup).mockReturnValue(mutationResult)
      const { baseElement, getByLabelText, getByRole } = await renderPage()
      await user.type(getByLabelText('Name'), faker.lorem.word())
      await user.click(getByRole('button', { name: 'Update' }))

      expect(baseElement).toHaveTextContent(errorsResponse.errors.name)
      expect(navigate).not.toHaveBeenCalled()
    })
  })
})
