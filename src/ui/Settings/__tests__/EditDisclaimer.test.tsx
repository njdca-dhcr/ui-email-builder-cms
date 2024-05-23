import React from 'react'
import { render } from '@testing-library/react'
import userEvent, { UserEvent } from '@testing-library/user-event'
import { EditDisclaimer } from '../EditDisclaimer'
import { RICH_TEXT_EDITOR_TEST_ID as richTextEditorTestId } from 'src/ui'
import { useUpdateDisclaimer } from 'src/network/useUpdateDisclaimer'
import {
  asMock,
  buildUseMutationResult,
  randomDisclaimerValue,
  userIsSignedIn,
} from 'src/testHelpers'
import { faker } from '@faker-js/faker'
import { UserShow } from 'src/network/useUser'
import { AuthProvider } from 'src/utils/AuthContext'
import { UserInfoProvider } from 'src/utils/UserInfoContext'

jest.mock('src/network/useUpdateDisclaimer', () => {
  return { useUpdateDisclaimer: jest.fn() }
})

describe('EditDisclaimer', () => {
  let user: UserEvent

  beforeEach(() => {
    user = userEvent.setup()
    userIsSignedIn()
  })

  const renderEditDisclaimer = (userInfo: UserShow) => {
    return render(
      <AuthProvider>
        <UserInfoProvider userInfo={userInfo}>
          <EditDisclaimer />
        </UserInfoProvider>
      </AuthProvider>,
    )
  }

  describe('form fields', () => {
    it('is editable', async () => {
      const mutationResult = buildUseMutationResult<ReturnType<typeof useUpdateDisclaimer>>({})
      asMock(useUpdateDisclaimer).mockReturnValue(mutationResult)
      const { queryByTestId, getByLabelText } = renderEditDisclaimer({})

      const disclaimerField = getByLabelText('Disclaimer')
      await user.click(disclaimerField)
      expect(queryByTestId(richTextEditorTestId)).not.toBeNull()
    })
  })

  describe('updating', () => {
    // Normally there would be a test to enforce that the mutate function
    // is called properly, but since the disclaimer is just one rich text
    // area it is difficult to set up

    it('displays an error message when present', async () => {
      const error = new Error(faker.lorem.sentence())
      const mutationResult = buildUseMutationResult<ReturnType<typeof useUpdateDisclaimer>>({
        error,
      })
      const originalDisclaimer = randomDisclaimerValue()
      asMock(useUpdateDisclaimer).mockReturnValue(mutationResult)

      const { baseElement } = renderEditDisclaimer({ disclaimer: originalDisclaimer })

      expect(baseElement).toHaveTextContent(error.message)
    })
  })
})
