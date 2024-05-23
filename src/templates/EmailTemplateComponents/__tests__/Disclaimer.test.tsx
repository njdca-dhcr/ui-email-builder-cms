import React, { FC, ReactNode } from 'react'
import { Disclaimer, useDisclaimerValue } from '../Disclaimer'
import { render, renderHook } from '@testing-library/react'
import { DisclaimerValue, EmailTemplate } from 'src/appTypes'
import { buildUniqueEmailComponent, emailPartWrapper, mockAppMode } from 'src/testHelpers'
import { faker } from '@faker-js/faker'
import { RichTextValue } from 'src/ui'
import { UserInfoProvider } from 'src/utils/UserInfoContext'

describe('Disclaimer', () => {
  let emailComponent: EmailTemplate.Disclaimer

  beforeEach(() => {
    emailComponent = buildUniqueEmailComponent('Disclaimer')
  })

  it('displays the disclaimer that was configured in settings', () => {
    const disclaimerText = faker.lorem.paragraph()
    const disclaimerValue: DisclaimerValue = {
      content: [{ type: 'paragraph', children: [{ text: disclaimerText }] }],
    }
    localStorage.setItem('disclaimer', JSON.stringify(disclaimerValue))
    const { baseElement } = render(
      <Disclaimer emailComponent={emailComponent}>{null}</Disclaimer>,
      { wrapper: emailPartWrapper },
    )
    expect(baseElement.querySelector('td')).toHaveTextContent(disclaimerText)
  })
})

describe('useDisclaimerValue', () => {
  let value: DisclaimerValue

  const richTextToText = (value: RichTextValue): string => {
    return value
      .map((node: any) => node.children.map((child: any) => child.text).join(' '))
      .join(' ')
  }

  beforeEach(() => {
    localStorage.clear()
  })

  const emptyUserInfo: FC<{ children: ReactNode }> = ({ children }) => {
    return <UserInfoProvider userInfo={{}}>{children}</UserInfoProvider>
  }

  describe('in all states mode', () => {
    beforeEach(() => {
      localStorage.clear()
      mockAppMode('ALL')
      const { result } = renderHook(() => useDisclaimerValue(), { wrapper: emptyUserInfo })
      value = result.current[0]
    })

    it('does not mention any specific state', () => {
      expect(richTextToText(value.content)).not.toContain('New Jersey')
    })

    it('only mentions the US', () => {
      expect(richTextToText(value.content)).toContain('United States')
    })
  })

  describe('in state mode', () => {
    describe('for example NJ', () => {
      beforeEach(() => {
        mockAppMode('NJ')
        const { result } = renderHook(() => useDisclaimerValue(), { wrapper: emptyUserInfo })
        value = result.current[0]
      })

      it('does not mention any other specific state', () => {
        expect(richTextToText(value.content)).not.toContain('Kentucky')
      })

      it('only mentions the specific state', () => {
        expect(richTextToText(value.content)).toContain('New Jersey')
      })
    })

    describe('for example KY', () => {
      beforeEach(() => {
        mockAppMode('KY')
        const { result } = renderHook(() => useDisclaimerValue(), { wrapper: emptyUserInfo })
        value = result.current[0]
      })

      it('does not mention any other specific state', () => {
        expect(richTextToText(value.content)).not.toContain('New Jersey')
      })

      it('only mentions the specific state', () => {
        expect(richTextToText(value.content)).toContain('Kentucky')
      })
    })
  })

  describe('when there is disclaimer information in the user information', () => {
    it('uses the content from user info', () => {
      const disclaimerValue = {
        content: [
          {
            type: 'paragraph',
            children: [{ text: faker.lorem.words(3) }],
          },
        ],
      }
      const { result } = renderHook(() => useDisclaimerValue(), {
        wrapper: ({ children }) => {
          return (
            <UserInfoProvider userInfo={{ disclaimer: disclaimerValue }}>
              {children}
            </UserInfoProvider>
          )
        },
      })
      const [value] = result.current
      expect(value.content).toEqual(disclaimerValue.content)
    })
  })
})
