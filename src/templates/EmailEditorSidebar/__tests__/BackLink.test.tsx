import React from 'react'
import { render } from '@testing-library/react'
import { BackLink } from '../BackLink'
import { faker } from '@faker-js/faker'
import { urlFor } from 'src/testHelpers'

describe('BackLink', () => {
  it('is a link that goes back when clicked', async () => {
    const path = `/${faker.lorem.word()}`
    const { baseElement } = render(<BackLink to={path} />)
    const link: HTMLAnchorElement = baseElement.querySelector('a') as any
    expect(link).toHaveTextContent('Back')
    expect(link.href).toEqual(urlFor(path))
  })
})
