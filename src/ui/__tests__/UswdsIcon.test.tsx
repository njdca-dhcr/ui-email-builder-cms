import React from 'react'
import { render } from '@testing-library/react'
import { UswdsIcon } from '../UswdsIcon'
import { buildIconUrl } from 'src/utils/siteUrl'

describe('UswdsIcon', () => {
  it('displays the icon for the given key', () => {
    const { queryByRole, baseElement } = render(<UswdsIcon icon="AccountBalance" />)
    const img: HTMLImageElement | null = baseElement.querySelector('img')
    expect(img).not.toBeNull()
    expect(img?.alt).toEqual('')
    expect(img?.src).toEqual(buildIconUrl('/account_balance.png'))
  })
})
