import React from 'react'
import { Disclaimer, useDisclaimerValue } from '../Disclaimer'
import { render, renderHook } from '@testing-library/react'
import { EmailTemplate } from 'src/appTypes'
import { buildUniqueEmailComponent, emailPartWrapper, mockAppMode } from 'src/testHelpers'
import { faker } from '@faker-js/faker'
import { RichTextValue } from 'src/ui/RichTextEditor'

describe('Disclaimer', () => {
  let emailComponent: EmailTemplate.Disclaimer

  beforeEach(() => {
    emailComponent = buildUniqueEmailComponent('Disclaimer')
  })

  it('displays the disclaimer that was configured in settings', () => {
    const disclaimerText = faker.lorem.paragraph()
    const richTextValue: RichTextValue = [
      { type: 'paragraph', children: [{ text: disclaimerText }] },
    ]
    localStorage.setItem('disclaimer', JSON.stringify(richTextValue))
    const { baseElement } = render(
      <Disclaimer emailComponent={emailComponent}>{null}</Disclaimer>,
      { wrapper: emailPartWrapper },
    )
    expect(baseElement.querySelector('td')).toHaveTextContent(disclaimerText)
  })
})

describe('useDisclaimerValue', () => {
  let value: RichTextValue

  const richTextToText = (value: RichTextValue): string => {
    return value
      .map((node: any) => node.children.map((child: any) => child.text).join(' '))
      .join(' ')
  }

  beforeEach(() => {
    localStorage.clear()
  })

  describe('in all states mode', () => {
    beforeEach(() => {
      localStorage.clear()
      mockAppMode('ALL')
      const { result } = renderHook(() => useDisclaimerValue())
      value = result.current[0]
    })

    it('does not mention any specific state', () => {
      expect(richTextToText(value)).not.toContain('New Jersey')
    })

    it('only mentions the US', () => {
      expect(richTextToText(value)).toContain('United States')
    })
  })

  describe('in state mode', () => {
    describe('for example NJ', () => {
      beforeEach(() => {
        mockAppMode('NJ')
        const { result } = renderHook(() => useDisclaimerValue())
        value = result.current[0]
      })

      it('does not mention any other specific state', () => {
        expect(richTextToText(value)).not.toContain('Kentucky')
      })

      it('only mentions the specific state', () => {
        expect(richTextToText(value)).toContain('New Jersey')
      })
    })

    describe('for example KY', () => {
      beforeEach(() => {
        mockAppMode('KY')
        const { result } = renderHook(() => useDisclaimerValue())
        value = result.current[0]
      })

      it('does not mention any other specific state', () => {
        expect(richTextToText(value)).not.toContain('New Jersey')
      })

      it('only mentions the specific state', () => {
        expect(richTextToText(value)).toContain('Kentucky')
      })
    })
  })
})
