import { stateSealFor } from '../StateSeal'

fdescribe('stateSealFor', () => {
  it('is the state seal information when information is available', () => {
    expect(stateSealFor('CA')).toEqual(expect.objectContaining({ image: 'California' }))
    expect(stateSealFor('NJ')).toEqual(expect.objectContaining({ image: 'New-Jersey' }))
    expect(stateSealFor('DC')).toEqual(expect.objectContaining({ image: 'District-of-Columbia' }))
  })

  it('is null when information is unavailable', () => {
    expect(stateSealFor('TT')).toBeNull()
    expect(stateSealFor('' as any)).toBeNull()
  })
})
