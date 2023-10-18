import React from 'react'
import { Banner, BannerMarkup, BannerValue } from '../Banner'
import { render } from '@testing-library/react'
import { EmailTemplate } from 'src/appTypes'
import { buildEmailTemplateComponent, emailPartWrapper } from 'src/testHelpers'
import { faker } from '@faker-js/faker'

describe('BannerMarkup', () => {
  it('displays the primary text', () => {
    const value = faker.lorem.paragraph()
    const { queryByText } = render(
      <BannerMarkup
        primaryLink={faker.internet.url()}
        primaryText={value}
        secondaryLink={faker.internet.url()}
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
      />,
      { wrapper: emailPartWrapper },
    )
    expect(baseElement.querySelector(`[href="${value}"]`)).not.toBeNull()
  })

  describe('when links are disabled', () => {
    it('uses spans instead of anchor tags', () => {
      const { baseElement } = render(
        <BannerMarkup
          disableLinks
          primaryLink={faker.internet.url()}
          primaryText={faker.lorem.paragraph()}
          secondaryLink={faker.internet.url()}
        />,
        { wrapper: emailPartWrapper },
      )

      expect(baseElement.querySelectorAll('tr a')).toHaveLength(0)
      expect(baseElement.querySelectorAll('tr span')).toHaveLength(2)
    })
  })
})

describe('Banner', () => {
  let id: string
  let emailComponent: EmailTemplate.Component<'Banner'>
  let bannerValue: BannerValue
  let secondaryLinkHost: string

  beforeEach(() => {
    id = faker.lorem.word()
    emailComponent = buildEmailTemplateComponent('Banner')
    secondaryLinkHost = 'www.example.org'
    bannerValue = {
      primaryText: faker.lorem.paragraph(),
      primaryLink: `https://www.${faker.internet.domainName()}/`,
      secondaryLink: `https://${secondaryLinkHost}/`,
    }
    localStorage.setItem('banner', JSON.stringify(bannerValue))
  })

  it('displays the primary text and link', () => {
    const { queryByText } = render(
      <Banner emailComponent={emailComponent} id={id}>
        {null}
      </Banner>,
      { wrapper: emailPartWrapper },
    )
    const link: HTMLAnchorElement | null = queryByText(bannerValue.primaryText) as any
    expect(link).not.toBeNull()
    expect(link?.href).toEqual(bannerValue.primaryLink)
  })

  it('displays the secondary link', () => {
    const { queryByText } = render(
      <Banner emailComponent={emailComponent} id={id}>
        {null}
      </Banner>,
      { wrapper: emailPartWrapper },
    )
    const link: HTMLAnchorElement | null = queryByText(secondaryLinkHost) as any
    expect(link).not.toBeNull()
    expect(link?.href).toEqual(bannerValue.secondaryLink)
  })

  it('when there is no banner value saved it renders without issue', () => {
    const { queryAllByRole } = render(
      <Banner emailComponent={emailComponent} id={id}>
        {null}
      </Banner>,
      { wrapper: emailPartWrapper },
    )
    expect(queryAllByRole('link')).toHaveLength(2)
  })
})
