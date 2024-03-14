import { departmentSealByImageName, departmentSealsForState } from '../departmentSeals'

describe('departmentSealsForState', () => {
  it('is all of the department seals associated with a given state', () => {
    expect(departmentSealsForState('NJ')).toHaveLength(2)
    expect(departmentSealsForState('CA')).toHaveLength(1)
  })
})

describe('departmentSealByImageName', () => {
  it('is the department seal for the given image name', () => {
    expect(departmentSealByImageName('West-Virginia.png')).toEqual(
      expect.objectContaining({ imageName: 'West-Virginia.png', state: 'WV' }),
    )
    expect(departmentSealByImageName('Wisconsin.png')).toEqual(
      expect.objectContaining({ imageName: 'Wisconsin.png', state: 'WI' }),
    )
    expect(departmentSealByImageName('Wyoming.png')).toEqual(
      expect.objectContaining({ imageName: 'Wyoming.png', state: 'WY' }),
    )
  })

  it('is null when there is no image with that name', () => {
    expect(departmentSealByImageName('not_found.png')).toBeNull()
  })
})
