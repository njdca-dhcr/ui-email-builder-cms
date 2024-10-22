import '@testing-library/jest-dom'
import { TextEncoder, TextDecoder } from 'node:util'
import fetchMock from 'jest-fetch-mock'

global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder as any

fetchMock.enableMocks()

jest.mock('./src/utils/useEmailTemplatesData')

beforeEach(() => {
  jest.clearAllMocks()
  fetchMock.resetMocks()
  window.HTMLElement.prototype.hasPointerCapture = jest.fn()
  window.HTMLElement.prototype.scrollIntoView = jest.fn()
})
