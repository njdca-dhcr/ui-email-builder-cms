import React from 'react'
import { buildUniqueEmailSubComponent, emailPartWrapper, mockAppMode } from 'src/testHelpers'
import { DepartmentSeal, DepartmentSealMarkup, useDepartmentSealValue } from '../DepartmentSeal'
import { EmailTemplate } from 'src/appTypes'
import { render, renderHook } from '@testing-library/react'
import { buildDepartmentSealUrl } from 'src/utils/siteUrl'

describe('DepartmentSealMarkup', () => {
  it('displays the given image', () => {
    const { queryByTestId } = render(
      <DepartmentSealMarkup departmentSealImageName="New-Jersey.png" />,
      {
        wrapper: emailPartWrapper,
      },
    )

    const departmentSeal = queryByTestId('department-seal')
    expect(departmentSeal).not.toBeNull()
    const img = departmentSeal?.querySelector('img')
    expect(img).not.toBeNull()
    expect(img?.src).toEqual(buildDepartmentSealUrl('/New-Jersey.png'))
  })
})

describe('DepartmentSeal', () => {
  let emailSubComponent: EmailTemplate.DepartmentSeal

  beforeEach(() => {
    emailSubComponent = buildUniqueEmailSubComponent('Header', { kind: 'DepartmentSeal' })
  })

  it('displays the selected seal', () => {
    localStorage.setItem('department-seal', JSON.stringify('New-Jersey.png'))
    const { queryByTestId, rerender } = render(
      <DepartmentSeal emailSubComponent={emailSubComponent} />,
      { wrapper: emailPartWrapper },
    )

    let departmentSeal = queryByTestId('department-seal')
    expect(departmentSeal).not.toBeNull()
    let img = departmentSeal?.querySelector('img')
    expect(img).not.toBeNull()
    expect(img?.src).toEqual(buildDepartmentSealUrl('/New-Jersey.png'))

    localStorage.setItem('department-seal', JSON.stringify('New-Jersey-Blue.png'))
    rerender(<DepartmentSeal key="2" emailSubComponent={emailSubComponent} />)

    departmentSeal = queryByTestId('department-seal')
    expect(departmentSeal).not.toBeNull()
    img = departmentSeal?.querySelector('img')
    expect(img).not.toBeNull()
    expect(img?.src).toEqual(buildDepartmentSealUrl('/New-Jersey-Blue.png'))
  })
})

describe('useDepartmentSealValue', () => {
  let value: string

  beforeEach(() => {
    localStorage.clear()
  })

  describe('when in all states mode', () => {
    beforeEach(() => {
      mockAppMode('ALL')
      const { result } = renderHook(() => useDepartmentSealValue())
      value = result.current[0]
    })

    it('is the image for the US DOL', () => {
      expect(value).toEqual('US-DOL.png')
    })
  })

  describe('when in state mode', () => {
    describe('for example NJ', () => {
      beforeEach(() => {
        mockAppMode('NJ')
        const { result } = renderHook(() => useDepartmentSealValue())
        value = result.current[0]
      })

      it('is the image for the NJ DOL', () => {
        expect(value).toEqual('New-Jersey.png')
      })
    })

    describe('for example KY', () => {
      beforeEach(() => {
        mockAppMode('KY')
        const { result } = renderHook(() => useDepartmentSealValue())
        value = result.current[0]
      })

      it('is the image for the KY DOL', () => {
        expect(value).toEqual('Kentucky.png')
      })
    })
  })
})
