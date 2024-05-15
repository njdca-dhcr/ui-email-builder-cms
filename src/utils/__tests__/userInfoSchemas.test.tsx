import {
  randomBannerValue,
  randomDepartmentSealValue,
  randomDisclaimerValue,
  randomStateSealValue,
} from 'src/factories'
import {
  bannerSchema,
  departmentSealSchema,
  disclaimerSchema,
  stateSealSchema,
} from '../userInfoSchemas'
import { BannerValue, DepartmentSealValue, DisclaimerValue, StateSealValue } from 'src/appTypes'

describe('userInfoSchemas', () => {
  describe('bannerSchema', () => {
    it('parses successfully when given a valid value', () => {
      const validValue = randomBannerValue()
      const result = bannerSchema.safeParse(validValue)
      expect(result.success).toEqual(true)
    })

    it('parses unsuccessfully when given a null value', () => {
      let result = bannerSchema.safeParse(null)
      expect(result.success).toEqual(false)
    })

    it('parses unsuccessfully when given a invalid value', () => {
      const invalidvalue: Partial<BannerValue> = randomBannerValue()
      delete invalidvalue.backgroundColor
      const result = bannerSchema.safeParse(invalidvalue)
      expect(result.success).toEqual(false)
    })
  })

  describe('departmentSealSchema', () => {
    it('parses successfully when given a valid value', () => {
      const validValue = randomDepartmentSealValue()
      const result = departmentSealSchema.safeParse(validValue)
      expect(result.success).toEqual(true)
    })

    it('parses unsuccessfully when given a null value', () => {
      let result = departmentSealSchema.safeParse(null)
      expect(result.success).toEqual(false)
    })

    it('parses unsuccessfully when given a invalid value', () => {
      const invalidValue: Partial<DepartmentSealValue> = randomDepartmentSealValue()
      delete invalidValue.seal
      const result = departmentSealSchema.safeParse(invalidValue)
      expect(result.success).toEqual(false)
    })
  })

  describe('stateSealSchema', () => {
    it('parses successfully when given a valid value', () => {
      const validValue = randomStateSealValue()
      const result = stateSealSchema.safeParse(validValue)
      expect(result.success).toEqual(true)
    })

    it('parses unsuccessfully when given a null value', () => {
      let result = stateSealSchema.safeParse(null)
      expect(result.success).toEqual(false)
    })

    it('parses unsuccessfully when given a invalid value', () => {
      const invalidValue: Partial<StateSealValue> = randomStateSealValue()
      invalidValue.stateAbbreviation = 'foo' as any
      const result = stateSealSchema.safeParse(invalidValue)
      expect(result.success).toEqual(false)
    })
  })

  describe('disclaimerSchema', () => {
    it('parses successfully when given a valid value', () => {
      const validValue = randomDisclaimerValue()
      const result = disclaimerSchema.safeParse(validValue)
      expect(result.success).toEqual(true)
    })

    it('parses unsuccessfully when given a null value', () => {
      let result = disclaimerSchema.safeParse(null)
      expect(result.success).toEqual(false)
    })

    it('parses unsuccessfully when given a invalid value', () => {
      const invalidValue: Partial<DisclaimerValue> = randomDisclaimerValue()
      delete invalidValue.content
      const result = disclaimerSchema.safeParse(invalidValue)
      expect(result.success).toEqual(false)
    })
  })
})
