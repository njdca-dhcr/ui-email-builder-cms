import React from 'react'
import { MoreInfoImage } from '../Shared'
import { render } from '@testing-library/react'
import { faker } from '@faker-js/faker'

describe('MoreInfoAboutSubComponent - Shared', () => {
  describe('MoreInfoImage', () => {
    it('renders without issue', () => {
      const { baseElement } = render(
        <MoreInfoImage alt={faker.lorem.words(4)} src={faker.internet.url()} />,
      )
      expect(baseElement.querySelector('img')).not.toBeNull()
    })
  })
})
