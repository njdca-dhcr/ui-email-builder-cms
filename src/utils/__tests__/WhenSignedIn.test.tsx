import { faker } from '@faker-js/faker'
import { render } from '@testing-library/react'
import React from 'react'
import { WhenSignedIn } from '../WhenSignedIn'
import { AuthProvider } from '../AuthContext'
import { mockBackendUrl, userIsNotSignedIn, userIsSignedIn } from 'src/testHelpers'

describe('WhenSignedIn', () => {
  beforeEach(() => {
    userIsSignedIn()
    mockBackendUrl(faker.internet.url())
  })

  describe('when signed in', () => {
    beforeEach(() => {
      userIsSignedIn()
    })

    it('displays its children', () => {
      const text = faker.lorem.paragraph()
      const { baseElement } = render(
        <AuthProvider>
          <WhenSignedIn>
            <p>{text}</p>
          </WhenSignedIn>
        </AuthProvider>,
      )
      expect(baseElement).toContainHTML(`<p>${text}</p>`)
    })
  })

  describe('when not signed in', () => {
    beforeEach(() => {
      userIsNotSignedIn()
    })

    it('renders nothing', () => {
      const text = faker.lorem.paragraph()
      const { baseElement } = render(
        <AuthProvider>
          <WhenSignedIn>
            <p>{text}</p>
          </WhenSignedIn>
        </AuthProvider>,
      )
      expect(baseElement).not.toContainHTML(`<p>${text}</p>`)
    })
  })

  describe('when signed in but without a backend url', () => {
    beforeEach(() => {
      userIsSignedIn()
      mockBackendUrl(undefined)
    })

    it('renders nothing', () => {
      const text = faker.lorem.paragraph()
      const { baseElement } = render(
        <AuthProvider>
          <WhenSignedIn>
            <p>{text}</p>
          </WhenSignedIn>
        </AuthProvider>,
      )
      expect(baseElement).not.toContainHTML(`<p>${text}</p>`)
    })
  })
})
