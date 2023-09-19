import React, { FC, ReactNode, createRef, useRef } from 'react'
import { useElementsToEmailString } from '../useElementsToEmailString'
import { renderHook } from '@testing-library/react'
import { faker } from '@faker-js/faker'

describe('useElementsToEmailString', () => {
  describe('when the ref lacks a current', () => {
    it('provides a function that returns an empty string', () => {
      const title = faker.lorem.words(2)

      const { result } = renderHook(() => {
        const ref = useRef<HTMLElement>()
        return useElementsToEmailString(ref, title)
      })

      expect(result.current()).toEqual('')
    })
  })

  describe('when the ref has a current', () => {
    let title: string
    let text: string
    let div: HTMLElement
    let resultCallback: ReturnType<typeof useElementsToEmailString>

    beforeEach(() => {
      title = faker.lorem.words(2)
      text = faker.lorem.paragraph()
      div = document.createElement('div')
      div.innerHTML = `<span class="foo">${text}</span>`
      const { result } = renderHook(() => {
        const ref = useRef(div)
        return useElementsToEmailString(ref, title)
      })
      resultCallback = result.current
    })

    it('creates email markup with a title', () => {
      expect(resultCallback()).toContain(`<title>${title}</title>`)
    })

    it('creates email markup with the EmailLayout', () => {
      expect(resultCallback()).toContain('xmlns:v=')
      expect(resultCallback()).toContain('xmlns:o=')
    })

    it('creates email markup with the content of the ref', () => {
      expect(resultCallback()).toContain(text)
      expect(resultCallback()).toContain('<span class="foo"')
    })

    it('creates email markup with a doctype', () => {
      expect(resultCallback()).toContain(
        `<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">`,
      )
    })
  })
})
