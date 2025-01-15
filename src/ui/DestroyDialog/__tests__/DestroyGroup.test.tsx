import React from 'react'
import { buildGroupShow, buildUseMutationResult } from 'src/factories'
import { GroupShow, useDestroyGroup } from 'src/network/groups'
import { asMock } from 'src/testHelpers'
import { DestroyGroup } from '../DestroyGroup'
import { render } from '@testing-library/react'
import userEvent, { UserEvent } from '@testing-library/user-event'
import { randomUUID } from 'crypto'
import { faker } from '@faker-js/faker'

jest.mock('src/network/groups')

describe('DestroyGroup', () => {
  let user: UserEvent
  let id: string
  let group: GroupShow

  beforeEach(() => {
    user = userEvent.setup()
    id = randomUUID()
    group = buildGroupShow({ id })
  })

  describe('when closed', () => {
    beforeEach(() => {
      const mutationResult = buildUseMutationResult<ReturnType<typeof useDestroyGroup>>()
      asMock(useDestroyGroup).mockReturnValue(mutationResult)
    })

    it('can be opened', async () => {
      const { getByRole, queryByRole } = render(<DestroyGroup group={group} />)
      expect(queryByRole('dialog')).toBeNull()
      await user.click(getByRole('button', { name: 'Delete' }))
      expect(queryByRole('dialog')).not.toBeNull()
    })
  })

  describe('when open', () => {
    const renderAndOpen = async () => {
      const rendered = render(<DestroyGroup group={group} />)
      await user.click(rendered.getByRole('button', { name: 'Delete' }))
      return rendered
    }

    it('confirms and destroys the group successfully and closes the modal', async () => {
      const mutateAsync = jest.fn()
      const mutationResult = buildUseMutationResult<ReturnType<typeof useDestroyGroup>>({
        mutateAsync,
      })
      asMock(useDestroyGroup).mockReturnValue(mutationResult)
      const { getByRole, queryByRole } = await renderAndOpen()

      expect(mutateAsync).not.toHaveBeenCalled()
      expect(queryByRole('dialog')).not.toBeNull()

      await user.click(getByRole('button', { name: 'Delete' }))

      expect(mutateAsync).toHaveBeenCalledWith(id)
      expect(queryByRole('dialog')).toBeNull()
    })

    it('displays a loading spinner when destroying the group', async () => {
      const mutationResult = buildUseMutationResult<ReturnType<typeof useDestroyGroup>>({
        isPending: true,
      })
      asMock(useDestroyGroup).mockReturnValue(mutationResult)
      const { baseElement } = await renderAndOpen()
      expect(baseElement).toHaveTextContent('Deleting group')
    })

    it('displays an error when destroying the group fails', async () => {
      const errorMessage = faker.lorem.sentence()
      const mutationResult = buildUseMutationResult<ReturnType<typeof useDestroyGroup>>({
        error: new Error(errorMessage),
      })
      asMock(useDestroyGroup).mockReturnValue(mutationResult)
      const { baseElement } = await renderAndOpen()
      expect(baseElement).toHaveTextContent(errorMessage)
    })
  })
})
