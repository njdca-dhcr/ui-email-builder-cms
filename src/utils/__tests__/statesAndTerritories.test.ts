import { stateById } from '../statesAndTerritories'

describe('stateById', () => {
  it('provides the state for the given id', () => {
    expect(stateById('CA')).toEqual(expect.objectContaining({ id: 'CA', name: 'California' }))
    expect(stateById('NJ')).toEqual(expect.objectContaining({ id: 'NJ', name: 'New Jersey' }))
    expect(stateById('KY')).toEqual(expect.objectContaining({ id: 'KY', name: 'Kentucky' }))
  })

  it('throws an error if the state cannot be found', () => {
    expect(() => {
      stateById('foo' as any)
    }).toThrowError('"foo" is not a state or territory')
  })
})
