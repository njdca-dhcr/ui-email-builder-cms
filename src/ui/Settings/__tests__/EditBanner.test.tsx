import React from 'react'
import { faker } from '@faker-js/faker'
import { render } from '@testing-library/react'
import userEvent, { UserEvent } from '@testing-library/user-event'
import { EditBanner } from '../EditBanner'
import { useUpdateBanner } from 'src/network/useUpdateBanner'
import { asMock, buildUseMutationResult, randomBannerValue, userIsSignedIn } from 'src/testHelpers'
import { UserInfoProvider } from 'src/utils/UserInfoContext'
import { CurrentUser } from 'src/network/useCurrentUser'
import { AuthProvider } from 'src/utils/AuthContext'

jest.mock('src/network/useUpdateBanner', () => {
  return { useUpdateBanner: jest.fn() }
})

describe('EditBanner', () => {
  let user: UserEvent

  beforeEach(() => {
    user = userEvent.setup()
  })

  const renderEditBanner = (userInfo: CurrentUser) => {
    return render(
      <AuthProvider>
        <UserInfoProvider userInfo={userInfo}>
          <EditBanner />
        </UserInfoProvider>
      </AuthProvider>,
    )
  }

  describe('form fields', () => {
    beforeEach(() => {
      userIsSignedIn()
      const mutationResult = buildUseMutationResult<ReturnType<typeof useUpdateBanner>>()
      asMock(useUpdateBanner).mockReturnValue(mutationResult)
    })

    it('has an editable banner primary text', async () => {
      const value = faker.lorem.paragraph()
      const { queryByText, getByLabelText } = renderEditBanner({})

      await user.clear(getByLabelText('Primary Text'))
      await user.type(getByLabelText('Primary Text'), value)
      expect(queryByText(value)).not.toBeNull()
    })

    it('has an editable banner primary link', async () => {
      const value = faker.internet.url()
      const { getByLabelText } = renderEditBanner({})

      await user.clear(getByLabelText('Primary Link'))
      await user.type(getByLabelText('Primary Link'), value)
    })

    it('has an editable banner secondary link', async () => {
      const value = faker.internet.url()
      const { getByLabelText } = renderEditBanner({})

      await user.clear(getByLabelText('Secondary Link'))
      await user.type(getByLabelText('Secondary Link'), value)
    })

    it('has an editable background color', async () => {
      localStorage.removeItem('banner')
      const color = faker.color.rgb()
      const { queryByText, baseElement, getByLabelText } = renderEditBanner({})
      expect(queryByText('Background Color')).not.toBeNull()
      expect(baseElement.querySelector('input[type="color"]')).not.toBeNull()

      const hexInput = getByLabelText('Background Color Hex Code')
      await user.clear(hexInput)
      await user.type(hexInput, color.replace('#', ''))
    })
  })

  describe('updating', () => {
    beforeEach(() => {
      userIsSignedIn()
    })

    it('updates the banner', async () => {
      const mutate = jest.fn()
      const mutationResult = buildUseMutationResult<ReturnType<typeof useUpdateBanner>>({ mutate })
      const originalBanner = randomBannerValue()
      const primaryLink = faker.internet.url()
      asMock(useUpdateBanner).mockReturnValue(mutationResult)

      expect(mutate).not.toHaveBeenCalled()

      const { getByRole, getByLabelText } = renderEditBanner({ banner: originalBanner })

      await user.clear(getByLabelText('Primary Link'))
      await user.type(getByLabelText('Primary Link'), primaryLink)
      await user.click(getByRole('button', { name: 'Save' }))
      expect(mutate).toHaveBeenCalledWith({ ...originalBanner, primaryLink })
    })

    it('displays a save button when there are changes', async () => {
      const mutationResult = buildUseMutationResult<ReturnType<typeof useUpdateBanner>>()
      const originalBanner = randomBannerValue()
      asMock(useUpdateBanner).mockReturnValue(mutationResult)

      const { getByRole } = renderEditBanner({ banner: originalBanner })

      expect(getByRole('button', { name: 'Save' })).toHaveClass('save-setting-button')
    })

    it('displays an error message when present', async () => {
      const error = new Error(faker.lorem.sentence())
      const mutationResult = buildUseMutationResult<ReturnType<typeof useUpdateBanner>>({
        error,
      })
      const originalBanner = randomBannerValue()
      asMock(useUpdateBanner).mockReturnValue(mutationResult)

      const { baseElement } = renderEditBanner({ banner: originalBanner })

      expect(baseElement).toHaveTextContent(error.message)
    })
  })
})
