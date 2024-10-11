import { faker } from '@faker-js/faker'
import { render } from '@testing-library/react'
import React from 'react'
import { WhenAdmin } from '../WhenAdmin'
import { AuthProvider } from '../AuthContext'
import { asMock } from 'src/testHelpers'
import { useCurrentRole } from '../useCurrentRole'

jest.mock('../useCurrentRole', () => {
  return { useCurrentRole: jest.fn() }
})

describe('WhenAdmin', () => {
  describe('when an admin', () => {
    beforeEach(() => {
      asMock(useCurrentRole).mockReturnValue({ isAdmin: true, role: 'admin', isLoading: false })
    })

    it('displays its children', () => {
      const text = faker.lorem.paragraph()
      const { baseElement } = render(
        <AuthProvider>
          <WhenAdmin>
            <p>{text}</p>
          </WhenAdmin>
        </AuthProvider>,
      )
      expect(baseElement).toContainHTML(`<p>${text}</p>`)
    })
  })

  describe('when a member', () => {
    beforeEach(() => {
      asMock(useCurrentRole).mockReturnValue({ isAdmin: false, role: 'member', isLoading: false })
    })

    it('renders nothing', () => {
      const text = faker.lorem.paragraph()
      const { baseElement } = render(
        <AuthProvider>
          <WhenAdmin>
            <p>{text}</p>
          </WhenAdmin>
        </AuthProvider>,
      )
      expect(baseElement).not.toContainHTML(`<p>${text}</p>`)
    })
  })
})
