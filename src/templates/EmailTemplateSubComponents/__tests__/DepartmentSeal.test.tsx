import React, { FC, ReactNode } from 'react'
import { buildUniqueEmailSubComponent, emailPartWrapper, mockAppMode } from 'src/testHelpers'
import { DepartmentSeal, DepartmentSealMarkup, useDepartmentSealValue } from '../DepartmentSeal'
import { DepartmentSealValue, EmailTemplate } from 'src/appTypes'
import { render, renderHook } from '@testing-library/react'
import { buildDepartmentSealUrl } from 'src/utils/siteUrl'
import { UserInfoProvider } from 'src/utils/UserInfoContext'
import { faker } from '@faker-js/faker'

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
    emailSubComponent = buildUniqueEmailSubComponent({ kind: 'DepartmentSeal' })
  })

  it('displays the selected seal', () => {
    localStorage.setItem('department-seal', JSON.stringify({ seal: 'New-Jersey.png' }))
    const { queryByTestId } = render(<DepartmentSeal emailSubComponent={emailSubComponent} />, {
      wrapper: emailPartWrapper,
    })

    const departmentSeal = queryByTestId('department-seal')
    expect(departmentSeal).not.toBeNull()
    const img = departmentSeal?.querySelector('img')
    expect(img).not.toBeNull()
    expect(img?.src).toEqual(buildDepartmentSealUrl('/New-Jersey.png'))
  })
})

describe('useDepartmentSealValue', () => {
  let value: DepartmentSealValue

  beforeEach(() => {
    localStorage.clear()
  })

  const emptyUserInfo: FC<{ children: ReactNode }> = ({ children }) => {
    return <UserInfoProvider userInfo={{}}>{children}</UserInfoProvider>
  }

  describe('when in all states mode', () => {
    beforeEach(() => {
      mockAppMode('ALL')
      const { result } = renderHook(() => useDepartmentSealValue(), { wrapper: emptyUserInfo })
      value = result.current[0]
    })

    it('is the image for the US DOL', () => {
      expect(value.seal).toEqual('US-DOL.png')
    })
  })

  describe('when in state mode', () => {
    describe('for example NJ', () => {
      beforeEach(() => {
        mockAppMode('NJ')
        const { result } = renderHook(() => useDepartmentSealValue(), { wrapper: emptyUserInfo })
        value = result.current[0]
      })

      it('is the image for the NJ DOL', () => {
        expect(value.seal).toEqual('New-Jersey.png')
      })
    })

    describe('for example KY', () => {
      beforeEach(() => {
        mockAppMode('KY')
        const { result } = renderHook(() => useDepartmentSealValue(), { wrapper: emptyUserInfo })
        value = result.current[0]
      })

      it('is the image for the KY DOL', () => {
        expect(value.seal).toEqual('Kentucky.png')
      })
    })
  })

  describe('when there is department seal information in the user information', () => {
    it('is the seal from the user info', () => {
      const departmentSealValue: DepartmentSealValue = { seal: faker.lorem.words(3) }

      const { result } = renderHook(() => useDepartmentSealValue(), {
        wrapper: ({ children }) => {
          return (
            <UserInfoProvider userInfo={{ departmentSeal: departmentSealValue }}>
              {children}
            </UserInfoProvider>
          )
        },
      })
      value = result.current[0]
      expect(value).toEqual(departmentSealValue)
    })
  })
})
