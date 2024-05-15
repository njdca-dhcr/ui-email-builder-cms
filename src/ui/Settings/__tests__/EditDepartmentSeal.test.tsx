import React from 'react'
import { render } from '@testing-library/react'
import userEvent, { UserEvent } from '@testing-library/user-event'
import { EditDepartmentSeal } from '../EditDepartmentSeal'
import {
  asMock,
  buildUseMutationResult,
  mockAppMode,
  randomDepartmentSealValue,
  userIsSignedIn,
} from 'src/testHelpers'
import { UserInfoProvider } from 'src/utils/UserInfoContext'
import { useUpdateDepartmentSeal } from 'src/network/useUpdateDepartmentSeal'
import { UserShow } from 'src/network/useUser'
import { AuthProvider } from 'src/utils/AuthContext'
import { faker } from '@faker-js/faker'

jest.mock('src/network/useUpdateDepartmentSeal', () => {
  return { useUpdateDepartmentSeal: jest.fn() }
})

describe('EditDepartmentSeal', () => {
  beforeEach(() => {
    localStorage.clear()
    userIsSignedIn()
  })

  const renderEditDepartmentSeal = (userInfo: UserShow) => {
    return render(
      <AuthProvider>
        <UserInfoProvider userInfo={userInfo}>
          <EditDepartmentSeal />
        </UserInfoProvider>
      </AuthProvider>,
    )
  }

  describe('when in state mode', () => {
    beforeEach(() => {
      const mutationResult = buildUseMutationResult<ReturnType<typeof useUpdateDepartmentSeal>>()
      asMock(useUpdateDepartmentSeal).mockReturnValue(mutationResult)
    })

    it('only provides New Jersey related state seals in the dropdown', async () => {
      mockAppMode('NJ')
      const user = userEvent.setup()
      const { getByRole, queryByRole, baseElement } = renderEditDepartmentSeal({})
      const button = (): Element => baseElement.querySelector('[role="button"] span[data-value]')!
      expect(button()).toHaveTextContent('New Jersey Department of Labor Logo')

      await user.click(button())
      expect(queryByRole('option', { name: 'Alabama Department of Labor Logo' })).toBeNull()
      expect(queryByRole('option', { name: 'Oregon Bureau of Labor & Industries Logo' })).toBeNull()
      expect(queryByRole('option', { name: 'Wyoming Workforce Services' })).toBeNull()

      await user.click(getByRole('option', { name: 'New Jersey Department of Labor Blue Logo' }))
      expect(button()).toHaveTextContent('New Jersey Department of Labor Blue Logo')
    })
  })

  describe('when in all states mode', () => {
    beforeEach(() => {
      const mutationResult = buildUseMutationResult<ReturnType<typeof useUpdateDepartmentSeal>>()
      asMock(useUpdateDepartmentSeal).mockReturnValue(mutationResult)
    })

    it('provides a dropdown for selecting the department seal', async () => {
      mockAppMode('ALL')
      const user = userEvent.setup()
      const { getByRole, queryByRole, baseElement } = renderEditDepartmentSeal({})
      const button = (): Element => baseElement.querySelector('[role="button"] span[data-value]')!
      expect(button()).toHaveTextContent('US Department of Labor Color Logo')

      await user.click(button())
      expect(queryByRole('option', { name: 'Alabama Department of Labor Logo' })).not.toBeNull()
      expect(
        queryByRole('option', { name: 'Oregon Bureau of Labor & Industries Logo' }),
      ).not.toBeNull()
      expect(queryByRole('option', { name: 'Wyoming Workforce Services' })).not.toBeNull()

      await user.click(getByRole('option', { name: 'Wyoming Workforce Services' }))
      expect(button()).toHaveTextContent('Wyoming Workforce Services')
    })
  })

  describe('updating', () => {
    let user: UserEvent

    beforeEach(() => {
      mockAppMode('ALL')
      user = userEvent.setup()
    })

    it('updates the state seal', async () => {
      const mutate = jest.fn()
      const mutationResult = buildUseMutationResult<ReturnType<typeof useUpdateDepartmentSeal>>({
        mutate,
      })
      const originalDepartmentSeal = randomDepartmentSealValue()
      asMock(useUpdateDepartmentSeal).mockReturnValue(mutationResult)
      expect(mutate).not.toHaveBeenCalled()
      const { getByRole, baseElement } = renderEditDepartmentSeal({
        departmentSeal: originalDepartmentSeal,
      })
      const button = (): Element => baseElement.querySelector('[role="button"] span[data-value]')!
      await user.click(button())
      await user.click(getByRole('option', { name: 'Wyoming Workforce Services' }))
      await user.click(getByRole('button', { name: 'Save' }))

      expect(mutate).toHaveBeenCalledWith({
        ...originalDepartmentSeal,
        seal: 'Wyoming.png',
      })
    })

    it('displays a save button', async () => {
      const mutationResult = buildUseMutationResult<ReturnType<typeof useUpdateDepartmentSeal>>()
      const originalDepartmentSeal = randomDepartmentSealValue()
      asMock(useUpdateDepartmentSeal).mockReturnValue(mutationResult)
      const { getByRole } = renderEditDepartmentSeal({ departmentSeal: originalDepartmentSeal })
      expect(getByRole('button', { name: 'Save' })).toHaveClass('save-setting-button')
    })

    it('displays an error message when present', async () => {
      const error = new Error(faker.lorem.sentence())
      const mutationResult = buildUseMutationResult<ReturnType<typeof useUpdateDepartmentSeal>>({
        error,
      })
      const originalDepartmentSeal = randomDepartmentSealValue()
      asMock(useUpdateDepartmentSeal).mockReturnValue(mutationResult)
      const { baseElement } = renderEditDepartmentSeal({ departmentSeal: originalDepartmentSeal })
      expect(baseElement).toHaveTextContent(error.message)
    })
  })
})
