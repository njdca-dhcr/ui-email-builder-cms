import { currentTimestamp } from '../currentTimestamp'

describe('currentTimestamp', () => {
  it('is the current time in milliseconds', async () => {
    const result = currentTimestamp()
    expect(result).toMatch(/^\d+$/)
  })
})
