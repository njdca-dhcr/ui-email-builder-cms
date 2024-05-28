import { mockBackendFlag, mockBackendUrl } from 'src/testHelpers'
import { backendFlag, backendUrl } from '../backendUrl'
import { faker } from '@faker-js/faker'

describe('backendFlag', () => {
  describe('when there is a backend flag environment variable', () => {
    it('is the given backend url', () => {
      mockBackendFlag(true)
      expect(backendFlag()).toBeTruthy()
    })
  })

  describe('when there is no a backend flag environment variable', () => {
    it('is null', () => {
      mockBackendFlag(false)
      expect(backendFlag()).toBeFalsy()
    })
  })
})
describe('backendUrl', () => {
  describe('when there is a backend url environment variable', () => {
    it('is the given backend url', () => {
      const url = faker.internet.url()
      mockBackendUrl(url)
      expect(backendUrl()).toEqual(url)
    })
  })

  describe('when there is no a backend url environment variable', () => {
    it('is null', () => {
      mockBackendUrl(undefined)
      expect(backendUrl()).toBeNull()
    })
  })
})
