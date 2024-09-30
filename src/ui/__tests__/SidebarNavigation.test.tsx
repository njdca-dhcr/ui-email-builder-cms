import { render } from '@testing-library/react'
import React from 'react'
import { SidebarNavigation } from '../SidebarNavigation'
import { asMock, mockBackendUrl, urlFor, userIsNotSignedIn, userIsSignedIn } from 'src/testHelpers'
import { availableFeatures, Features } from 'src/features'
import { AuthProvider } from 'src/utils/AuthContext'
import { faker } from '@faker-js/faker'

jest.mock('src/features', () => {
  return {
    availableFeatures: {
      settings: jest.fn().mockReturnValue(true),
    } as Features,
  }
})

describe('SidebarNavigation', () => {
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

    it('displays a my library link', () => {
      const { getByRole } = render(
        <AuthProvider>
          <SidebarNavigation />
        </AuthProvider>,
      )
      const link: HTMLAnchorElement = getByRole('link', { name: 'My Library' }) as any
      expect(link.tagName).toEqual('A')
      expect(link.href).toEqual(urlFor('/my-library'))
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
  })

  describe('settings is available', () => {
    beforeEach(() => {
      asMock(availableFeatures.settings).mockReturnValue(true)
    })

    it('displays a settings link', () => {
      const { getByRole } = render(<SidebarNavigation />)
      const link: HTMLAnchorElement = getByRole('link', { name: 'Settings' }) as any
      expect(link.tagName).toEqual('A')
      expect(link.href).toEqual(urlFor('/settings'))
    })
  })

  describe('settings is not available', () => {
    beforeEach(() => {
      asMock(availableFeatures.settings).mockReturnValue(false)
    })

    it('does not display a settings link', () => {
      const { queryByText } = render(<SidebarNavigation />)
      expect(queryByText('Settings')).toBeNull()
    })
  })
})
