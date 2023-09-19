import '@testing-library/jest-dom'
import { TextEncoder, TextDecoder } from 'node:util'

global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder as any

jest.mock('./src/utils/useEmailTemplatesData')

beforeEach(() => {
  jest.clearAllMocks()
})
