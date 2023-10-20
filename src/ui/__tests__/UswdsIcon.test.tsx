import React from 'react'
import { render } from '@testing-library/react'
import { UswdsIcon } from '../UswdsIcon'
import { urlFor } from 'src/testHelpers'

describe('UswdsIcon', () => {
  it('displays the icon for the given key', () => {
    const { queryByRole } = render(<UswdsIcon icon="AccountBalance" />)
    const img: HTMLImageElement | null = queryByRole('img') as any
    expect(img).not.toBeNull()
    expect(img?.alt).toEqual('')
    expect(img?.src).toEqual(urlFor('/icons/account_balance.png'))
  })
})
