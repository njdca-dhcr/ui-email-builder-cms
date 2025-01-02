import { render } from '@testing-library/react'
import React from 'react'
import { SidebarNavigation } from '../SidebarNavigation'
import { asMock, mockBackendUrl, urlFor, userIsNotSignedIn, userIsSignedIn } from 'src/testHelpers'
import { AuthProvider } from 'src/utils/AuthContext'
import { faker } from '@faker-js/faker'
import { useCurrentRole } from 'src/utils/useCurrentRole'

jest.mock('src/utils/useCurrentRole', () => {
  return { useCurrentRole: jest.fn() }
})

describe('SidebarNavigation', () => {
  beforeEach(() => {
    asMock(useCurrentRole).mockReturnValue({ isAdmin: true, role: 'admin', isLoading: false })
  })

  it('displays a home link', () => {
    const { getByRole } = render(<SidebarNavigation />)
    const link: HTMLAnchorElement = getByRole('link', { name: 'Home' }) as any
    expect(link.tagName).toEqual('A')
    expect(link.href).toEqual(urlFor('/'))
  })

  it('displays a library link', () => {
    const { getByRole } = render(<SidebarNavigation />)
    const link: HTMLAnchorElement = getByRole('link', { name: 'Library' }) as any
    expect(link.tagName).toEqual('A')
    expect(link.href).toEqual(urlFor('/library'))
  })

  it('displays a tips and tricks link', () => {
    const { getByRole } = render(<SidebarNavigation />)
    const link: HTMLAnchorElement = getByRole('link', { name: 'Tips & Tricks' }) as any
    expect(link.tagName).toEqual('A')
    expect(link.href).toEqual(urlFor('/tips-and-tricks'))
  })

  describe('when signed in', () => {
    beforeEach(() => {
      mockBackendUrl(faker.internet.url())
      userIsSignedIn()
    })

    it('displays a my drafts link', () => {
      const { getByRole } = render(
        <AuthProvider>
          <SidebarNavigation />
        </AuthProvider>,
      )
      const link: HTMLAnchorElement = getByRole('link', { name: 'My Drafts' }) as any
      expect(link.tagName).toEqual('A')
      expect(link.href).toEqual(urlFor('/my-drafts'))
    })

    it('displays a users link', () => {
      const { getByRole } = render(
        <AuthProvider>
          <SidebarNavigation />
        </AuthProvider>,
      )
      const link: HTMLAnchorElement = getByRole('link', { name: 'Users' }) as any
      expect(link.tagName).toEqual('A')
      expect(link.href).toEqual(urlFor('/users'))
    })

    it('displays a groups link', () => {
      const { getByRole } = render(
        <AuthProvider>
          <SidebarNavigation />
        </AuthProvider>,
      )
      const link: HTMLAnchorElement = getByRole('link', { name: 'Groups' }) as any
      expect(link.tagName).toEqual('A')
      expect(link.href).toEqual(urlFor('/groups'))
    })
  })

  describe('when signed out', () => {
    beforeEach(() => {
      mockBackendUrl(faker.internet.url())
      userIsNotSignedIn()
    })

    it('does not display a my library link', () => {
      const { queryByText } = render(
        <AuthProvider>
          <SidebarNavigation />
        </AuthProvider>,
      )
      expect(queryByText('My Library')).toBeNull()
    })

    it('does not display a users link', () => {
      const { queryByText } = render(
        <AuthProvider>
          <SidebarNavigation />
        </AuthProvider>,
      )
      expect(queryByText('Users')).toBeNull()
    })

    it('does not display a groups link', () => {
      const { queryByText } = render(
        <AuthProvider>
          <SidebarNavigation />
        </AuthProvider>,
      )
      expect(queryByText('Groups')).toBeNull()
    })
  })
})
