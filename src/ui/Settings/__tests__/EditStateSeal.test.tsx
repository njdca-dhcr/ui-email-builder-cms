import React from 'react'
import { render } from '@testing-library/react'
import userEvent, { UserEvent } from '@testing-library/user-event'
import { EditStateSeal } from '../EditStateSeal'
import { faker } from '@faker-js/faker'
import {
  asMock,
  buildUseMutationResult,
  mockAppMode,
  randomStateSealValue,
  userIsSignedIn,
} from 'src/testHelpers'
import { useUpdateStateSeal } from 'src/network/useUpdateStateSeal'
import { UserShow } from 'src/network/useUser'
import { AuthProvider } from 'src/utils/AuthContext'
import { UserInfoProvider } from 'src/utils/UserInfoContext'

jest.mock('src/network/useUpdateStateSeal', () => {
  return { useUpdateStateSeal: jest.fn() }
})

describe('EditStateSeal', () => {
  beforeEach(() => {
    userIsSignedIn()
    localStorage.removeItem('stateSeal')
  })

  const renderEditStateSeal = (userInfo: UserShow) => {
    return render(
      <AuthProvider>
        <UserInfoProvider userInfo={userInfo}>
          <EditStateSeal />
        </UserInfoProvider>
      </AuthProvider>,
    )
  }

  describe('form fields', () => {
    beforeEach(() => {
      const mutationResult = buildUseMutationResult<ReturnType<typeof useUpdateStateSeal>>()
      asMock(useUpdateStateSeal).mockReturnValue(mutationResult)
    })

    it('has an editable additional disclaimer text', async () => {
      const user = userEvent.setup()
      const { getByLabelText } = renderEditStateSeal({})

      const value = faker.lorem.paragraph()
      const additionalDisclaimerField = () => getByLabelText('Additional Disclaimer')

      await user.clear(additionalDisclaimerField())
      await user.type(additionalDisclaimerField(), value)
      expect(additionalDisclaimerField()).toHaveTextContent(value)
    })

    describe('in all states mode', () => {
      it('has an editable state seal dropdown', async () => {
        mockAppMode('ALL')
        const user = userEvent.setup()
        const { getByRole, baseElement } = renderEditStateSeal({})
        const stateSealSelect = () => baseElement.querySelector('.select span[data-value]')!
        expect(stateSealSelect()).toHaveTextContent('US')

        await user.click(stateSealSelect())
        await user.click(getByRole('option', { name: 'California' }))

        expect(stateSealSelect()).toHaveTextContent('California')
      })
    })

    describe('in state mode', () => {
      it('lacks an editable state seal dropdown', () => {
        mockAppMode('NJ')
        const { baseElement } = renderEditStateSeal({})
        expect(baseElement.querySelector('.select span[data-value]')).toBeNull()
      })
    })
  })

  describe('updating', () => {
    let user: UserEvent

    beforeEach(() => {
      user = userEvent.setup()
    })

    it('updates the state seal', async () => {
      const mutate = jest.fn()
      const mutationResult = buildUseMutationResult<ReturnType<typeof useUpdateStateSeal>>({
        mutate,
      })
      const originalStateSeal = randomStateSealValue()
      asMock(useUpdateStateSeal).mockReturnValue(mutationResult)
      expect(mutate).not.toHaveBeenCalled()
      const { getByRole, getByLabelText } = renderEditStateSeal({ stateSeal: originalStateSeal })
      const additionalDisclaimerField = () => getByLabelText('Additional Disclaimer')
      const additionalDisclaimer = faker.lorem.paragraph()

      await user.clear(additionalDisclaimerField())
      await user.type(additionalDisclaimerField(), additionalDisclaimer)
      await user.click(getByRole('button', { name: 'Save' }))

      expect(mutate).toHaveBeenCalledWith({ ...originalStateSeal, additionalDisclaimer })
    })

    it('displays a save button when there are changes', async () => {
      const mutationResult = buildUseMutationResult<ReturnType<typeof useUpdateStateSeal>>()
      const originalStateSeal = randomStateSealValue()
      asMock(useUpdateStateSeal).mockReturnValue(mutationResult)
      const { getByRole } = renderEditStateSeal({ stateSeal: originalStateSeal })
      expect(getByRole('button', { name: 'Save' })).toHaveClass('save-setting-button')
    })

    it('displays an error message when present', async () => {
      const error = new Error(faker.lorem.sentence())
      const mutationResult = buildUseMutationResult<ReturnType<typeof useUpdateStateSeal>>({
        error,
      })
      const originalStateSeal = randomStateSealValue()
      asMock(useUpdateStateSeal).mockReturnValue(mutationResult)
      const { baseElement } = renderEditStateSeal({ stateSeal: originalStateSeal })
      expect(baseElement).toHaveTextContent(error.message)
    })
  })
})
