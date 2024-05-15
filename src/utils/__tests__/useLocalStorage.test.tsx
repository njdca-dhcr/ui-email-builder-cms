import { faker } from '@faker-js/faker'
import { act, renderHook } from '@testing-library/react'
import { useLocalStorage, useLocalStorageJSON } from '../useLocalStorage'
import { randomBannerValue, randomObject } from 'src/factories'
import { BannerValue, bannerSchema } from '../userInfoSchemas'

describe('useLocalStorage', () => {
  let key: string

  beforeEach(() => {
    key = faker.lorem.word()
  })

  afterEach(() => {
    localStorage.removeItem(key)
  })

  describe('value', () => {
    it('provides the value for the given key from local storage', () => {
      const storageValue = faker.lorem.word()
      localStorage.setItem(key, storageValue)
      const { result } = renderHook(() => useLocalStorage(key, ''))
      const [value] = result.current
      expect(value).toEqual(storageValue)
    })

    it('provides the default value for the given key when there is no value in localStorage', () => {
      const defaultValue = faker.lorem.word()
      const { result } = renderHook(() => useLocalStorage(key, defaultValue))
      const [value] = result.current
      expect(value).toEqual(defaultValue)
    })
  })

  describe('setValue', () => {
    it('provides a function to update the value in local storage', () => {
      const storageValue = faker.lorem.word()
      const { result } = renderHook(() => useLocalStorage(key, ''))
      const [_value, setValue] = result.current
      act(() => setValue(storageValue))
      expect(localStorage.getItem(key)).toEqual(storageValue)
    })

    it('provides a function to update the value in the hook', () => {
      const storageValue = faker.lorem.word()
      const { result } = renderHook(() => useLocalStorage(key, ''))
      const [_value, setValue] = result.current
      act(() => setValue(storageValue))
      const [value] = result.current
      expect(value).toEqual(storageValue)
    })
  })
})

describe('useLocalStorageJSON', () => {
  let key: string

  const saveItem = (key: string, value: any) => localStorage.setItem(key, JSON.stringify(value))

  beforeEach(() => {
    key = faker.lorem.word()
  })

  afterEach(() => {
    localStorage.removeItem(key)
  })

  describe('value', () => {
    it('provides a json value (object)', () => {
      const storedValue = { [faker.lorem.word()]: faker.lorem.word() }
      saveItem(key, storedValue)
      const { result } = renderHook(() => useLocalStorageJSON(key, {}))
      const [value] = result.current
      expect(value).toEqual(storedValue)
    })

    it('provides a json value (number)', () => {
      const storedValue = Math.random()
      saveItem(key, storedValue)
      const { result } = renderHook(() => useLocalStorageJSON(key, 0))
      const [value] = result.current
      expect(value).toEqual(storedValue)
    })

    it('provides a json value (string)', () => {
      const storedValue = faker.lorem.word()
      saveItem(key, storedValue)
      const { result } = renderHook(() => useLocalStorageJSON(key, ''))
      const [value] = result.current
      expect(value).toEqual(storedValue)
    })

    it('provides a json value (null)', () => {
      const storedValue = null
      saveItem(key, storedValue)
      const { result } = renderHook(() => useLocalStorageJSON<string | null>(key, ''))
      const [value] = result.current
      expect(value).toEqual(storedValue)
    })

    it('provides a json value (array)', () => {
      const storedValue = [
        faker.lorem.word(),
        Math.random(),
        { [faker.lorem.word()]: faker.lorem.word() },
      ]
      saveItem(key, storedValue)
      const { result } = renderHook(() => useLocalStorageJSON(key, []))
      const [value] = result.current
      expect(value).toEqual(storedValue)
    })

    it('provides the default value for the given key when there is no value in localStorage', () => {
      const { result } = renderHook(() => useLocalStorageJSON(key, []))
      const [value] = result.current
      expect(value).toEqual([])
    })
  })

  describe('setValue', () => {
    it('provides a function to update a json value', () => {
      const storageValue = {
        [faker.lorem.word()]: faker.lorem.word(),
        number: Math.random(),
        list: [{}, faker.lorem.word(), null],
      }
      const { result } = renderHook(() => useLocalStorageJSON(key, {}))
      const [_value, setValue] = result.current
      act(() => setValue(storageValue))
      const [value] = result.current
      expect(value).toEqual(storageValue)
    })
  })

  describe('when the json value is not parse-able', () => {
    it('uses the default value', () => {
      localStorage.setItem(key, 'invalid json')
      const defaultValue = randomObject()
      const { result } = renderHook(() => useLocalStorageJSON(key, defaultValue))
      const [value] = result.current
      expect(value).toEqual(defaultValue)
    })
  })

  describe('when given a schema', () => {
    it('is the stored value when it matches the schema', () => {
      const storedValue: BannerValue = randomBannerValue()
      localStorage.setItem(key, JSON.stringify(storedValue))
      const defaultValue = randomBannerValue()
      const { result } = renderHook(() => useLocalStorageJSON(key, defaultValue, bannerSchema))
      const [value] = result.current
      expect(value).toEqual(storedValue)
    })

    it('is the default value when the stored value does not match the schema', () => {
      const storedValue: Partial<BannerValue> = randomBannerValue()
      delete storedValue.primaryLink
      localStorage.setItem(key, JSON.stringify(storedValue))

      const defaultValue = randomBannerValue()
      const { result } = renderHook(() => useLocalStorageJSON(key, defaultValue, bannerSchema))
      const [value] = result.current
      expect(value).toEqual(defaultValue)
    })
  })
})
