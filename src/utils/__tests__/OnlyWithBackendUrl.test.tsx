import { faker } from '@faker-js/faker'
import { render } from '@testing-library/react'
import React from 'react'
import { OnlyWithBackendUrl } from '../OnlyWithBackendUrl'
import { mockBackendUrl } from 'src/testHelpers'

describe('OnlyWithBackendUrl', () => {
  describe('when there is a backend url', () => {
    beforeEach(() => {
      mockBackendUrl(faker.internet.url())
    })

    it('displays its children', () => {
      const text = faker.lorem.paragraph()
      const { baseElement } = render(
        <OnlyWithBackendUrl>
          <p>{text}</p>
        </OnlyWithBackendUrl>,
      )
      expect(baseElement).toContainHTML(`<p>${text}</p>`)
    })
  })

  describe('when there is no backend url', () => {
    beforeEach(() => {
      mockBackendUrl(undefined)
    })

    it('renders nothing', () => {
      const text = faker.lorem.paragraph()
      const { baseElement } = render(
        <OnlyWithBackendUrl>
          <p>{text}</p>
        </OnlyWithBackendUrl>,
      )
      expect(baseElement).not.toContainHTML(`<p>${text}</p>`)
    })
  })
})
