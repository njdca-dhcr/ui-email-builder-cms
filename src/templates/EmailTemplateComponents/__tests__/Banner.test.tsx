import React, { FC, ReactNode } from 'react'
import { Banner, BannerMarkup, useBannerValue } from '../Banner'
import { render, renderHook } from '@testing-library/react'
import { BannerValue, EmailParts } from 'src/appTypes'
import { buildUniqueEmailComponent, emailPartWrapper, mockAppMode } from 'src/testHelpers'
import { faker } from '@faker-js/faker'
import { Colors } from 'src/templates/styles'
import { UserInfoProvider } from 'src/utils/UserInfoContext'

describe('BannerMarkup', () => {
  it('displays the primary text', () => {
    const value = faker.lorem.paragraph()
    const { queryByText } = render(
      <BannerMarkup
        primaryLink={faker.internet.url()}
        primaryText={value}
        secondaryLink={faker.internet.url()}
        backgroundColor={faker.color.rgb()}
      />,
      { wrapper: emailPartWrapper },
    )
    expect(queryByText(value)).not.toBeNull()
  })

  it('displays the primary text when it is a react element', () => {
    const value = faker.lorem.paragraph()
    const { baseElement } = render(
      <BannerMarkup
        primaryLink={faker.internet.url()}
        primaryText={<span>{value}</span>}
        secondaryLink={faker.internet.url()}
        backgroundColor={faker.color.rgb()}
      />,
      { wrapper: emailPartWrapper },
    )
    expect(baseElement).toContainHTML(`<span>${value}</span>`)
  })

  it('has an anchor to the primary link', () => {
    const value = faker.internet.url()
    const { baseElement } = render(
      <BannerMarkup
        primaryLink={value}
        primaryText={faker.lorem.paragraph()}
        secondaryLink={faker.internet.url()}
        backgroundColor={faker.color.rgb()}
      />,
      { wrapper: emailPartWrapper },
    )
    expect(baseElement.querySelector(`[href="${value}"]`)).not.toBeNull()
  })

  it('displays the secondary link', () => {
    const domain = faker.internet.domainName()
    const value = `https://www.${domain}/`
    const { queryByText } = render(
      <BannerMarkup
        primaryLink={faker.internet.url()}
        primaryText={faker.lorem.paragraph()}
        secondaryLink={value}
        backgroundColor={faker.color.rgb()}
      />,
      { wrapper: emailPartWrapper },
    )
    expect(queryByText(`www.${domain}`)).not.toBeNull()
  })

  it('has an anchor to the secondary link', () => {
    const value = faker.internet.url()
    const { baseElement } = render(
      <BannerMarkup
        primaryLink={faker.internet.url()}
        primaryText={faker.lorem.paragraph()}
        secondaryLink={value}
        backgroundColor={faker.color.rgb()}
      />,
      { wrapper: emailPartWrapper },
    )
    expect(baseElement.querySelector(`[href="${value}"]`)).not.toBeNull()
  })

  it('is displayed in the given color', () => {
    const backgroundColor = '#e2fcae'
    const { baseElement } = render(
      <BannerMarkup
        primaryLink={faker.internet.url()}
        primaryText={faker.lorem.paragraph()}
        secondaryLink={faker.internet.url()}
        backgroundColor={backgroundColor}
      />,
      { wrapper: emailPartWrapper },
    )
    const cell = baseElement.querySelectorAll('td')[0]
    expect(cell).not.toBeNull()
    expect(cell?.attributes.getNamedItem('style')?.value).toContain(
      `background-color: rgb(226, 252, 174);`,
    )
  })

  describe('when links are disabled', () => {
    it('uses spans instead of anchor tags', () => {
      const { baseElement } = render(
        <BannerMarkup
          disableLinks
          primaryLink={faker.internet.url()}
          primaryText={faker.lorem.paragraph()}
          secondaryLink={faker.internet.url()}
          backgroundColor={faker.color.rgb()}
        />,
        { wrapper: emailPartWrapper },
      )

      expect(baseElement.querySelectorAll('tr a')).toHaveLength(0)
      expect(baseElement.querySelectorAll('tr span')).toHaveLength(2)
    })
  })
})

describe('Banner', () => {
  let emailComponent: EmailParts.Banner
  let bannerValue: BannerValue
  let secondaryLinkHost: string

  beforeEach(() => {
    emailComponent = buildUniqueEmailComponent('Banner')
    secondaryLinkHost = 'www.example.org'
    bannerValue = {
      backgroundColor: '#e2fcae',
      primaryText: faker.lorem.paragraph(),
      primaryLink: `https://www.${faker.internet.domainName()}/`,
      secondaryLink: `https://${secondaryLinkHost}/`,
    }
    localStorage.setItem('banner', JSON.stringify(bannerValue))
  })

  it('displays the primary text and link', () => {
    const { queryByText } = render(<Banner emailComponent={emailComponent}>{null}</Banner>, {
      wrapper: emailPartWrapper,
    })
    const link: HTMLAnchorElement | null = queryByText(bannerValue.primaryText) as any
    expect(link).not.toBeNull()
    expect(link?.href).toEqual(bannerValue.primaryLink)
  })

  it('displays the secondary link', () => {
    const { queryByText } = render(<Banner emailComponent={emailComponent}>{null}</Banner>, {
      wrapper: emailPartWrapper,
    })
    const link: HTMLAnchorElement | null = queryByText(secondaryLinkHost) as any
    expect(link).not.toBeNull()
    expect(link?.href).toEqual(bannerValue.secondaryLink)
  })

  it('displays the background color', () => {
    const { baseElement } = render(<Banner emailComponent={emailComponent}>{null}</Banner>, {
      wrapper: emailPartWrapper,
    })
    const cell = baseElement.querySelectorAll('td')[0]
    expect(cell).not.toBeNull()
    expect(cell?.attributes.getNamedItem('style')?.value).toContain(
      `background-color: rgb(226, 252, 174);`,
    )
  })

  it('when there is no banner value saved it renders without issue', () => {
    localStorage.removeItem('banner')
    const { queryAllByRole } = render(<Banner emailComponent={emailComponent}>{null}</Banner>, {
      wrapper: emailPartWrapper,
    })
    expect(queryAllByRole('link')).toHaveLength(2)
  })
})

describe('useBannerValue', () => {
  let value: BannerValue

  beforeEach(() => {
    localStorage.clear()
  })

  const emptyUserInfo: FC<{ children: ReactNode }> = ({ children }) => {
    return <UserInfoProvider userInfo={{}}>{children}</UserInfoProvider>
  }

  describe('in all states mode', () => {
    beforeEach(() => {
      mockAppMode('ALL')
      const { result } = renderHook(() => useBannerValue(), { wrapper: emptyUserInfo })
      value = result.current[0]
    })

    it('has primary text', () => {
      expect(value.primaryText).toEqual(
        'United States Department of Labor and Workforce Development',
      )
    })

    it('has a primary link', () => {
      expect(value.primaryLink).toEqual('https://www.us.gov/labor/')
    })

    it('has a secondary link', () => {
      expect(value.secondaryLink).toEqual('https://myunemployment.us.gov/')
    })

    it('has a color', () => {
      expect(value.backgroundColor).toEqual(Colors.black)
    })
  })

  describe('in state mode', () => {
    describe('for example NJ', () => {
      beforeEach(() => {
        mockAppMode('NJ')
        const { result } = renderHook(() => useBannerValue(), { wrapper: emptyUserInfo })
        value = result.current[0]
      })

      it('has primary text', () => {
        expect(value.primaryText).toEqual(
          'New Jersey Department of Labor and Workforce Development',
        )
      })

      it('has a primary link', () => {
        expect(value.primaryLink).toEqual('https://www.nj.gov/labor/')
      })

      it('has a secondary link', () => {
        expect(value.secondaryLink).toEqual('https://myunemployment.nj.gov/')
      })

      it('has a color', () => {
        expect(value.backgroundColor).toEqual(Colors.black)
      })
    })

    describe('for example KY', () => {
      beforeEach(() => {
        mockAppMode('KY')
        const { result } = renderHook(() => useBannerValue())
        value = result.current[0]
      })

      it('has primary text', () => {
        expect(value.primaryText).toEqual('Kentucky Department of Labor and Workforce Development')
      })

      it('has a primary link', () => {
        expect(value.primaryLink).toEqual('https://www.ky.gov/labor/')
      })

      it('has a secondary link', () => {
        expect(value.secondaryLink).toEqual('https://myunemployment.ky.gov/')
      })

      it('has a color', () => {
        expect(value.backgroundColor).toEqual(Colors.black)
      })
    })
  })

  describe('when there is banner information in the user information', () => {
    let userInfoBannerValue: BannerValue

    beforeEach(() => {
      userInfoBannerValue = {
        primaryText: faker.lorem.sentence(),
        backgroundColor: faker.color.rgb(),
        primaryLink: faker.internet.url(),
        secondaryLink: faker.internet.url(),
      }
      const { result } = renderHook(() => useBannerValue(), {
        wrapper: ({ children }) => {
          return (
            <UserInfoProvider userInfo={{ banner: userInfoBannerValue }}>
              {children}
            </UserInfoProvider>
          )
        },
      })
      value = result.current[0]
    })

    it('uses the primary text from user info', () => {
      expect(value.primaryText).toEqual(userInfoBannerValue.primaryText)
    })

    it('uses the primary link from user info', () => {
      expect(value.primaryLink).toEqual(userInfoBannerValue.primaryLink)
    })

    it('uses the secondary link from user info', () => {
      expect(value.secondaryLink).toEqual(userInfoBannerValue.secondaryLink)
    })

    it('uses the color from user info', () => {
      expect(value.backgroundColor).toEqual(userInfoBannerValue.backgroundColor)
    })
  })
})
