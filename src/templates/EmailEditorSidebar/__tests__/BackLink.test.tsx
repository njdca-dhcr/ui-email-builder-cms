import React from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { navigate } from 'gatsby'
import { BackLink } from '../BackLink'

describe('BackLink', () => {
  it('is a link that goes back when clicked', async () => {
    const user = userEvent.setup()
    const { baseElement } = render(<BackLink />)
    const link = baseElement.querySelector('a')
    expect(link).toHaveTextContent('Back')
    expect(navigate).not.toHaveBeenCalled()
    await user.click(link!)
    expect(navigate).toHaveBeenCalledWith(-1)
  })
})
