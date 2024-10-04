import React from 'react'
import { act, render, renderHook } from '@testing-library/react'
import { faker } from '@faker-js/faker'
import { UserInfoProvider, useUserInfo, useUserInfoValue } from '../UserInfoContext'
import { randomBannerValue, randomObject } from 'src/testHelpers'
import { CurrentUserEmailConfig } from 'src/network/useCurrentUser'
import { BannerValue } from 'src/appTypes'

describe('UserInfoProvider', () => {
  it('displays its children', () => {
    const text = faker.lorem.paragraph()
    const { baseElement } = render(
      <UserInfoProvider userInfo={{}}>
        <p>{text}</p>
      </UserInfoProvider>,
    )
    expect(baseElement).toContainHTML(`<p>${text}</p>`)
  })

  it('provides access to user information', () => {
    const givenUserInfo: CurrentUserEmailConfig = {
      banner: randomObject(),
      departmentSeal: randomObject(),
      stateSeal: randomObject(),
      disclaimer: randomObject(),
    }

    const { result } = renderHook(() => useUserInfo(), {
      wrapper: ({ children }) => {
        return <UserInfoProvider userInfo={givenUserInfo}>{children}</UserInfoProvider>
      },
    })
    const [userInfo] = result.current
    expect(userInfo).toEqual(givenUserInfo)
  })

  it('can update the user information', () => {
    const givenUserInfo: CurrentUserEmailConfig = {
      banner: randomObject(),
      departmentSeal: randomObject(),
      stateSeal: randomObject(),
      disclaimer: randomObject(),
    }
    const newUserInfo: CurrentUserEmailConfig = {
      banner: randomObject(),
      departmentSeal: randomObject(),
      stateSeal: randomObject(),
      disclaimer: randomObject(),
    }

    const { result } = renderHook(() => useUserInfo(), {
      wrapper: ({ children }) => {
        return <UserInfoProvider userInfo={givenUserInfo}>{children}</UserInfoProvider>
      },
    })
    let [userInfo, setUserInfo] = result.current
    act(() => {
      setUserInfo(newUserInfo)
    })
    userInfo = result.current[0]
    expect(userInfo).toEqual(newUserInfo)
  })
})

describe('useUserInfoValue', () => {
  const key = 'banner'
  let defaultValue: BannerValue
  let localStorageValue: BannerValue

  beforeEach(() => {
    defaultValue = randomBannerValue()
    localStorageValue = randomBannerValue()
    localStorage.clear()
  })

  const setLocalStorageValue = () => {
    localStorage.setItem(key, JSON.stringify(localStorageValue))
  }

  const renderUseUserInfoValue = <T extends object>(
    key: keyof CurrentUserEmailConfig,
    defaultHookValue: T,
    defaultUserInfo: CurrentUserEmailConfig,
  ) => {
    return renderHook(() => useUserInfoValue(key, defaultHookValue), {
      wrapper: ({ children }) => {
        return <UserInfoProvider userInfo={defaultUserInfo}>{children}</UserInfoProvider>
      },
    })
  }

  describe('value', () => {
    it('is the value in the user info context when present', () => {
      setLocalStorageValue()
      const userInfoBanner = randomBannerValue()
      const { result } = renderUseUserInfoValue(key, defaultValue, { banner: userInfoBanner })
      const [value] = result.current
      expect(value).toEqual(userInfoBanner)
    })

    it('is the value in the local storage when the user info context is blank', () => {
      setLocalStorageValue()
      const { result } = renderUseUserInfoValue(key, defaultValue, {})
      const [value] = result.current
      expect(value).toEqual(localStorageValue)
    })

    it('is the value in the default value when local storage and the user info context are blank', () => {
      const { result } = renderUseUserInfoValue(key, defaultValue, {})
      const [value] = result.current
      expect(value).toEqual(defaultValue)
    })
  })

  describe('setValue', () => {
    it('updates the value', () => {
      const { result } = renderUseUserInfoValue(key, defaultValue, {})
      const [value, setValue] = result.current
      const newBannerValue = randomBannerValue()
      expect(value).toEqual(defaultValue)
      act(() => setValue(newBannerValue))

      const newValue = result.current[0]
      expect(newValue).toEqual(newBannerValue)
    })

    it('updates the value in local storage', () => {
      const { result } = renderUseUserInfoValue(key, defaultValue, {})
      const [_value, setValue] = result.current
      expect(localStorage.getItem(key)).toBeNull()
      act(() => setValue(randomBannerValue()))
      expect(localStorage.getItem(key)).not.toBeNull()
    })
  })

  describe('hasChanges', () => {
    it('is true when the user info for the given key has changed', () => {
      const userInfoBanner = randomBannerValue()
      const { result } = renderUseUserInfoValue(key, defaultValue, { banner: userInfoBanner })
      const [_, setValue] = result.current
      act(() => setValue(randomBannerValue()))
      const { hasChanges } = result.current[2]
      expect(hasChanges).toEqual(true)
    })

    it('is false when the user info for the given key has not changed', () => {
      const userInfoBanner = randomBannerValue()
      const { result } = renderUseUserInfoValue(key, defaultValue, { banner: userInfoBanner })
      const [_, setValue] = result.current
      act(() => setValue(userInfoBanner))
      const { hasChanges } = result.current[2]
      expect(hasChanges).toEqual(false)
    })
  })
})
