import { render } from '@testing-library/react'
import React from 'react'
import { SidebarNavigation } from '../SidebarNavigation'
import { asMock, urlFor } from 'src/testHelpers'
import { availableFeatures, Features } from 'src/features'

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
