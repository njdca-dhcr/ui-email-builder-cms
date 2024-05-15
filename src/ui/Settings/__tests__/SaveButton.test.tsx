import { render } from '@testing-library/react'
import React from 'react'
import { SaveButton, SaveButtonProps } from '../SaveButton'
import { AuthProvider } from 'src/utils/AuthContext'
import { userIsNotSignedIn, userIsSignedIn } from 'src/testHelpers'

describe('SaveButton', () => {
  const renderSaveButton = (props: SaveButtonProps) => {
    return render(<SaveButton {...props} />, {
      wrapper: ({ children }) => {
        return <AuthProvider>{children}</AuthProvider>
      },
    })
  }

  describe('when not signed in', () => {
    beforeEach(() => {
      userIsNotSignedIn()
    })

    it('is nothing', () => {
      const { queryByRole } = renderSaveButton({ hasChanges: true, isPending: false })
      expect(queryByRole('button')).toBeNull()
    })
  })

  describe('when signed in', () => {
    beforeEach(() => {
      userIsSignedIn()
    })

    it('is a save button', () => {
      const { queryByRole } = renderSaveButton({ hasChanges: true, isPending: false })
      expect(queryByRole('button', { name: 'Save' })).not.toBeNull()
    })

    it('has a type of "submit"', () => {
      const { getByRole } = renderSaveButton({ hasChanges: true, isPending: false })
      const button: HTMLButtonElement = getByRole('button') as any
      expect(button.type).toEqual('submit')
    })

    it('is disabled when there are no changes', () => {
      const { getByRole } = renderSaveButton({ hasChanges: false, isPending: false })
      expect(getByRole('button')).toBeDisabled()
    })

    it('is disabled when pending', () => {
      const { getByRole } = renderSaveButton({ hasChanges: true, isPending: true })
      expect(getByRole('button')).toBeDisabled()
    })

    it('is enabled when there are changes but it is not pending', () => {
      const { getByRole } = renderSaveButton({ hasChanges: true, isPending: false })
      expect(getByRole('button')).not.toBeDisabled()
    })

    it('is disabled when pending and there are no changes', () => {
      const { getByRole } = renderSaveButton({ hasChanges: false, isPending: true })
      expect(getByRole('button')).toBeDisabled()
    })
  })
})
