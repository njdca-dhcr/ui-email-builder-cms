import React from 'react'
import { buildUniqueEmailSubComponent, emailPartWrapper } from 'src/testHelpers'
import { DepartmentSeal, DepartmentSealMarkup } from '../DepartmentSeal'
import { EmailTemplate } from 'src/appTypes'
import { render } from '@testing-library/react'
import { buildSiteUrl } from 'src/utils/siteUrl'

describe('DepartmentSealMarkup', () => {
  it('displays the given image', () => {
    const { queryByTestId } = render(<DepartmentSealMarkup departmentSealKey={'New-Jersey'} />, {
      wrapper: emailPartWrapper,
    })

    const departmentSeal = queryByTestId('department-seal')
    expect(departmentSeal).not.toBeNull()
    const img = departmentSeal?.querySelector('img')
    expect(img).not.toBeNull()
    expect(img?.src).toEqual(buildSiteUrl('/department-seals/New-Jersey.png'))
  })
})

describe('DepartmentSeal', () => {
  let emailSubComponent: EmailTemplate.DepartmentSeal

  beforeEach(() => {
    emailSubComponent = buildUniqueEmailSubComponent('Header', { kind: 'DepartmentSeal' })
  })

  it('displays the selected seal', () => {
    localStorage.setItem('department-seal', JSON.stringify('New-Jersey'))
    const { queryByTestId, rerender } = render(
      <DepartmentSeal key="1" emailSubComponent={emailSubComponent} />,
      { wrapper: emailPartWrapper },
    )

    let departmentSeal = queryByTestId('department-seal')
    expect(departmentSeal).not.toBeNull()
    let img = departmentSeal?.querySelector('img')
    expect(img).not.toBeNull()
    expect(img?.src).toEqual(buildSiteUrl('/department-seals/New-Jersey.png'))

    localStorage.setItem('department-seal', JSON.stringify('New-Jersey-Blue'))
    rerender(<DepartmentSeal key="2" emailSubComponent={emailSubComponent} />)

    departmentSeal = queryByTestId('department-seal')
    expect(departmentSeal).not.toBeNull()
    img = departmentSeal?.querySelector('img')
    expect(img).not.toBeNull()
    expect(img?.src).toEqual(buildSiteUrl('/department-seals/New-Jersey-Blue.png'))
  })
})
