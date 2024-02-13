import { render } from '@testing-library/react'
import React from 'react'
import { StateSeal, StateSealMarkup, StateSealValue } from '../StateSeal'
import { faker } from '@faker-js/faker'
import { buildUniqueEmailComponent, emailPartWrapper } from 'src/testHelpers'

describe('StateSealMarkup', () => {
  it('displays the additional content', () => {
    const text = faker.lorem.paragraph()
    const { baseElement } = render(
      <StateSealMarkup additionalDisclaimer={<span>{text}</span>} stateSealKey="NewJersey" />,
      { wrapper: emailPartWrapper },
    )
    expect(baseElement).toContainHTML(`<span>${text}</span>`)
  })

  it('displays the selected state seal', () => {
    const { getByRole } = render(
      <StateSealMarkup additionalDisclaimer={faker.lorem.paragraph()} stateSealKey="NewJersey" />,
      { wrapper: emailPartWrapper },
    )
    const img: HTMLImageElement = getByRole('img') as any
    expect(img.alt).toEqual('New Jersey')
    expect(img.src).toContain('/state-seals/New-Jersey.png')
  })

  it('displays the title if it exists', () => {
    const { getByText } = render(
      <StateSealMarkup
        additionalDisclaimer={faker.lorem.paragraph()}
        stateSealKey="DistrictOfColumbia"
      />,
      { wrapper: emailPartWrapper },
    )
    expect(getByText('District of Columbia')).not.toBeNull()
  })

  it('displays the default title if title does not exist', () => {
    const { getByText } = render(
      <StateSealMarkup additionalDisclaimer={faker.lorem.paragraph()} stateSealKey="NorthDakota" />,
      { wrapper: emailPartWrapper },
    )
    expect(getByText('State of North Dakota')).not.toBeNull()
  })
})

describe('StateSeal', () => {
  let stateSealValue: StateSealValue

  beforeEach(() => {
    stateSealValue = {
      additionalDisclaimer: faker.lorem.paragraph(),
      stateSealKey: 'NewJersey',
    }
    localStorage.setItem('stateSeal', JSON.stringify(stateSealValue))
  })

  it('displays the additional content', () => {
    const { baseElement } = render(
      <StateSeal emailComponent={buildUniqueEmailComponent('StateSeal')}>{null}</StateSeal>,
      { wrapper: emailPartWrapper },
    )
    expect(baseElement).toContainHTML(stateSealValue.additionalDisclaimer)
  })

  it('displays the selected state seal', () => {
    const { getByRole } = render(
      <StateSeal emailComponent={buildUniqueEmailComponent('StateSeal')}>{null}</StateSeal>,
      { wrapper: emailPartWrapper },
    )
    const img: HTMLImageElement = getByRole('img') as any
    expect(img.alt).toEqual('New Jersey')
    expect(img.src).toContain('/state-seals/New-Jersey.png')
  })

  it('when there is no state seal value saved it renders without issue', () => {
    localStorage.removeItem('stateSeal')
    const { queryByRole, queryByText } = render(
      <StateSeal emailComponent={buildUniqueEmailComponent('StateSeal')}>{null}</StateSeal>,
      { wrapper: emailPartWrapper },
    )
    expect(queryByRole('img')).not.toBeNull()
  })
})
