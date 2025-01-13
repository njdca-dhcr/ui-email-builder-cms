import React, { FC } from 'react'
import { render } from '@testing-library/react'
import { currentAuthCredentials, mockAppMode, urlFor, userIsSignedIn } from 'src/testHelpers'
import { Header, LogOutButton } from '../Header'
import { AuthProvider, useAuth } from 'src/utils/AuthContext'
import userEvent from '@testing-library/user-event'
import { navigate } from 'gatsby'

describe('Header', () => {
  describe('when in all states mode', () => {
    beforeEach(() => {
      mockAppMode('ALL')
    })

    it('does not display a NJ department seal', () => {
      const { baseElement } = render(
        <Header>
          <div />
        </Header>,
      )
      expect(baseElement.querySelector('.department-seal-container')).toBeNull()
    })

    it('displays a generic title', () => {
      const { baseElement } = render(
        <Header>
          <div />
        </Header>,
      )
      const headerTitle = baseElement.querySelector('.header-title')
      expect(headerTitle).not.toBeNull()
      expect(headerTitle).not.toHaveTextContent('New Jersey')
      expect(headerTitle).toHaveTextContent('Email Builder (Beta)')
    })
  })

  describe('when in a state mode mode', () => {
    describe('NJ for example', () => {
      beforeEach(() => {
        mockAppMode('NJ')
      })

      it('displays a NJ department seal', () => {
        const { baseElement } = render(
          <Header>
            <div />
          </Header>,
        )
        expect(baseElement.querySelector('a > img')).not.toBeNull()
      })

      it('displays a specific title ', () => {
        const { baseElement } = render(
          <Header>
            <div />
          </Header>,
        )
        const headerTitle = baseElement.querySelector('.header-title')
        expect(headerTitle).not.toBeNull()
        expect(headerTitle).toHaveTextContent('New Jersey Email Builder (Beta)')
      })
    })

    describe('KY for example', () => {
      beforeEach(() => {
        mockAppMode('KY')
      })

      it('displays a KY department seal', () => {
        const { baseElement } = render(
          <Header>
            <div />
          </Header>,
        )
        expect(baseElement.querySelector('a > img')).not.toBeNull()
      })

      it('displays a specific title ', () => {
        const { baseElement } = render(
          <Header>
            <div />
          </Header>,
        )
        const headerTitle = baseElement.querySelector('.header-title')
        expect(headerTitle).not.toBeNull()
        expect(headerTitle).toHaveTextContent('Kentucky Email Builder (Beta)')
      })
    })
  })

  it('displays a settings button', () => {
    const { getByRole } = render(
      <Header>
        <div />
      </Header>,
    )
    const link: HTMLAnchorElement = getByRole('link', { name: 'Settings' }) as any
    expect(link.tagName).toEqual('A')
    expect(link.href).toEqual(urlFor('/settings/email'))
  })
})

describe('LogOutButton', () => {
  const Dummy: FC = () => {
    const [auth] = useAuth()
    return auth ? 'is logged in' : 'is logged out'
  }

  beforeEach(() => {
    userIsSignedIn()
  })

  it('clears the auth info', async () => {
    const user = userEvent.setup()
    const { baseElement, getByRole } = render(
      <AuthProvider>
        <LogOutButton />
        <Dummy />
      </AuthProvider>,
    )
    expect(baseElement).toHaveTextContent('is logged in')
    await user.click(getByRole('button'))
    expect(baseElement).toHaveTextContent('is logged out')
    expect(currentAuthCredentials()).toBeNull()
  })

  it('navigates to the home page', async () => {
    const user = userEvent.setup()
    const { getByRole } = render(
      <AuthProvider>
        <LogOutButton />
        <Dummy />
      </AuthProvider>,
    )
    expect(navigate).not.toHaveBeenCalled()
    await user.click(getByRole('button'))
    expect(navigate).toHaveBeenCalledWith('/')
  })
})
