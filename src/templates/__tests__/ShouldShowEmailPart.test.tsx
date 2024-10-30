import { faker } from '@faker-js/faker'
import { act, renderHook } from '@testing-library/react'
import { useShouldShowEmailPart } from '../ShouldShowEmailPart'
import { buildUniqueEmailSubComponent } from 'src/factories'
import { EmailPartsContent } from '../EmailPartsContent'

describe('useShouldShowEmailPart', () => {
  it('toggles parts on and off', async () => {
    const title = buildUniqueEmailSubComponent({
      kind: 'Title',
      defaultValue: { visible: true, title: faker.lorem.word() },
    })

    const { result } = renderHook(() => useShouldShowEmailPart(title), {
      wrapper: EmailPartsContent,
    })

    expect(result.current.on).toEqual(true)
    expect(result.current.off).toEqual(false)

    act(() => {
      result.current.toggle()
    })
    expect(result.current.on).toEqual(false)
    expect(result.current.off).toEqual(true)

    act(() => {
      result.current.toggle()
    })
    expect(result.current.on).toEqual(true)
    expect(result.current.off).toEqual(false)
  })

  it('if a component/subcomponent lacks a `visible` value it defaults to true and should show', async () => {
    const title = buildUniqueEmailSubComponent({
      kind: 'Title',
      defaultValue: { title: faker.lorem.word() },
    })

    const { result } = renderHook(() => useShouldShowEmailPart(title), {
      wrapper: EmailPartsContent,
    })

    expect(result.current.on).toEqual(true)
    expect(result.current.off).toEqual(false)
  })

  it('if a component/subcomponent has visible false, it should not show', async () => {
    const title = buildUniqueEmailSubComponent({
      kind: 'Title',
      defaultValue: { visible: false, title: faker.lorem.word() },
    })

    const { result } = renderHook(() => useShouldShowEmailPart(title), {
      wrapper: EmailPartsContent,
    })

    expect(result.current.on).toEqual(false)
    expect(result.current.off).toEqual(true)
  })

  describe('when not given an email part', () => {
    it('returns on/off/toggle placeholder values', async () => {
      const { result } = renderHook(() => useShouldShowEmailPart(undefined), {
        wrapper: EmailPartsContent,
      })

      expect(result.current.on).toEqual(false)
      expect(result.current.off).toEqual(true)
      expect(result.current.toggle).toEqual(expect.any(Function))
    })
  })
})
