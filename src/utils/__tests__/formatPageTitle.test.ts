import { formatPageTitle } from '../formatPageTitle'

describe('formatPageTitle', () => {
  it('appends the app name', () => {
    expect(formatPageTitle('Home')).toEqual('Home - Email Builder (Beta)')
    expect(formatPageTitle('Library')).toEqual('Library - Email Builder (Beta)')
    expect(formatPageTitle('Tips & Tricks')).toEqual('Tips & Tricks - Email Builder (Beta)')
  })
})
