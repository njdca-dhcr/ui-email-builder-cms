import { faker } from '@faker-js/faker'
import { render } from '@testing-library/react'
import React from 'react'
import { OnlyWithBackendFlagAndUrl } from '../OnlyWithBackendUrl'
import { mockBackendFlag, mockBackendUrl } from 'src/testHelpers'

describe('OnlyWithBackendFlagAndUrl', () => {
  describe('when there is a backend url', () => {
    beforeEach(() => {
      mockBackendFlag(true)
      mockBackendUrl(faker.internet.url())
    })

    it('displays its children', () => {
      const text = faker.lorem.paragraph()
      const { baseElement } = render(
        <OnlyWithBackendFlagAndUrl>
          <p>{text}</p>
        </OnlyWithBackendFlagAndUrl>,
      )
      expect(baseElement).toContainHTML(`<p>${text}</p>`)
    })
  })

  describe('when there is no backend url', () => {
    beforeEach(() => {
      mockBackendFlag(false)
      mockBackendUrl(undefined)
    })

    it('renders nothing', () => {
      const text = faker.lorem.paragraph()
      const { baseElement } = render(
        <OnlyWithBackendFlagAndUrl>
          <p>{text}</p>
        </OnlyWithBackendFlagAndUrl>,
      )
      expect(baseElement).not.toContainHTML(`<p>${text}</p>`)
    })
  })
})
