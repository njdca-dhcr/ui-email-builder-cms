import { labelForComponent } from '../labelForComponent'

describe('labelForComponent', () => {
  it('is the kind attribute of the sub component', () => {
    expect(labelForComponent('Banner')).toEqual('Banner')
    expect(labelForComponent('Body')).toEqual('Body')
    expect(labelForComponent('Disclaimer')).toEqual('Disclaimer')
    expect(labelForComponent('Footer')).toEqual('Footer')
    expect(labelForComponent('Header')).toEqual('Header')
    expect(labelForComponent('Name')).toEqual('Name')
  })

  describe('when the subcomponent is StateSeal', () => {
    it('is "State Seal"', () => {
      expect(labelForComponent('StateSeal')).toEqual('State Seal')
    })
  })
})
