import { mockBackendUrl } from 'src/testHelpers'
import { backendUrl } from '../backendUrl'
import { faker } from '@faker-js/faker'

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
