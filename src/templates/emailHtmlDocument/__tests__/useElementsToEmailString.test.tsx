import { useRef } from 'react'
import { useElementsToEmailString } from '../useElementsToEmailString'
import { renderHook } from '@testing-library/react'
import { faker } from '@faker-js/faker'

describe('useElementsToEmailString', () => {
  describe('when the ref lacks a current', () => {
    it('provides a function that returns an empty string', () => {
      const { result } = renderHook(() => {
        const ref = useRef<HTMLElement>()
        return useElementsToEmailString(ref)
      })

      expect(result.current(faker.lorem.word())).toEqual('')
    })
  })

  describe('when the ref has a current', () => {
    let text: string
    let title: string
    let div: HTMLElement
    let resultCallback: ReturnType<typeof useElementsToEmailString>

    beforeEach(() => {
      text = faker.lorem.paragraph()
      title = faker.lorem.word()
      div = document.createElement('div')
      div.innerHTML = `<span class="foo" contenteditable="true" aria-label="Reminder title">${text}</span>`
      const { result } = renderHook(() => {
        const ref = useRef(div)
        return useElementsToEmailString(ref)
      })
      resultCallback = result.current
    })

    it('creates email markup with the EmailLayout', () => {
      expect(resultCallback(title)).toContain('xmlns:v=')
      expect(resultCallback(title)).toContain('xmlns:o=')
      expect(resultCallback(title)).toContain(title)
    })

    it('creates email markup with the content of the ref', () => {
      expect(resultCallback(title)).toContain(text)
      expect(resultCallback(title)).toContain('<span class="foo"  >')
    })

    it('creates email markup with a doctype', () => {
      expect(resultCallback(title)).toContain(
        `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">`,
      )
    })

    it('removes any content editable attributes', () => {
      expect(resultCallback(title)).not.toContain('contenteditable="true"')
      expect(resultCallback(title)).not.toContain('aria-label="Reminder title"')
      expect(resultCallback(title)).not.toContain('contenteditable')
      expect(resultCallback(title)).not.toContain('aria-label')
    })
  })
})
