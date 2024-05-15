import { faker } from '@faker-js/faker'
import { render } from '@testing-library/react'
import React from 'react'
import { WhenSignedOut } from '../WhenSignedOut'
import { AuthProvider } from '../AuthContext'
import { mockBackendUrl, userIsNotSignedIn, userIsSignedIn } from 'src/testHelpers'

describe('WhenSignedOut', () => {
  beforeEach(() => {
    userIsSignedIn()
    mockBackendUrl(faker.internet.url())
  })

  describe('when signed in', () => {
    beforeEach(() => {
      userIsSignedIn()
    })

    it('renders nothing', () => {
      const text = faker.lorem.paragraph()
      const { baseElement } = render(
        <AuthProvider>
          <WhenSignedOut>
            <p>{text}</p>
          </WhenSignedOut>
        </AuthProvider>,
      )
      expect(baseElement).not.toContainHTML(`<p>${text}</p>`)
    })
  })

  describe('when not signed in', () => {
    beforeEach(() => {
      userIsNotSignedIn()
    })

    it('displays its children', () => {
      const text = faker.lorem.paragraph()
      const { baseElement } = render(
        <AuthProvider>
          <WhenSignedOut>
            <p>{text}</p>
          </WhenSignedOut>
        </AuthProvider>,
      )
      expect(baseElement).toContainHTML(`<p>${text}</p>`)
    })
  })

  describe('when signed out but without a backend url', () => {
    beforeEach(() => {
      userIsNotSignedIn()
      mockBackendUrl(undefined)
    })

    it('renders nothing', () => {
      const text = faker.lorem.paragraph()
      const { baseElement } = render(
        <AuthProvider>
          <WhenSignedOut>
            <p>{text}</p>
          </WhenSignedOut>
        </AuthProvider>,
      )
      expect(baseElement).not.toContainHTML(`<p>${text}</p>`)
    })
  })
})
