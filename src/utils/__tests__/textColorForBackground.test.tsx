import { faker } from '@faker-js/faker'
import { textColorForBackground } from '../textColorForBackground'

describe('textColorForBackground', () => {
  describe('when the given background color is dark', () => {
    it('returns the light option', () => {
      const dark = faker.lorem.words(2)
      const light = faker.lorem.words(3)
      const result = textColorForBackground('#000000', { dark, light })
      expect(result).toEqual(light)
    })
  })

  describe('when the given background color is light', () => {
    it('returns the dark option', () => {
      const dark = faker.lorem.words(2)
      const light = faker.lorem.words(3)
      const result = textColorForBackground('#FFFFFF', { dark, light })
      expect(result).toEqual(dark)
    })
  })
})
