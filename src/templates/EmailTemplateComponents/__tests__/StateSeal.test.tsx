import { render, renderHook } from '@testing-library/react'
import React from 'react'
import { StateSeal, StateSealMarkup, useStateSealValue } from '../StateSeal'
import { faker } from '@faker-js/faker'
import { buildUniqueEmailComponent, emailPartWrapper, mockAppMode } from 'src/testHelpers'
import { StateSealValue } from 'src/appTypes'

describe('StateSealMarkup', () => {
  it('displays the additional content', () => {
    const text = faker.lorem.paragraph()
    const { baseElement } = render(
      <StateSealMarkup additionalDisclaimer={<span>{text}</span>} stateAbbreviation="NJ" />,
      { wrapper: emailPartWrapper },
    )
    expect(baseElement).toContainHTML(`<span>${text}</span>`)
  })

  it('displays the selected state seal', () => {
    const { getByRole } = render(
      <StateSealMarkup additionalDisclaimer={faker.lorem.paragraph()} stateAbbreviation="NY" />,
      { wrapper: emailPartWrapper },
    )
    const img: HTMLImageElement = getByRole('img') as any
    expect(img.alt).toEqual('The seal of the State of New York')
    expect(img.src).toContain('/state-seals/New-York.png')
  })

  it('displays the title if it exists', () => {
    const { getByText } = render(
      <StateSealMarkup additionalDisclaimer={faker.lorem.paragraph()} stateAbbreviation="US" />,
      { wrapper: emailPartWrapper },
    )
    expect(getByText('United States of America')).not.toBeNull()
  })

  it('displays the default title if title does not exist', () => {
    const { getByText } = render(
      <StateSealMarkup additionalDisclaimer={faker.lorem.paragraph()} stateAbbreviation="ND" />,
      { wrapper: emailPartWrapper },
    )
    expect(getByText('State of North Dakota')).not.toBeNull()
  })

  describe('without a leftJustify prop', () => {
    it('is narrow', () => {
      const { baseElement } = render(
        <StateSealMarkup
          leftJustify={false}
          additionalDisclaimer={faker.lorem.paragraph()}
          stateAbbreviation="ND"
        />,
        { wrapper: emailPartWrapper },
      )
      expect(baseElement.querySelector('.narrow')).not.toBeNull()
    })
  })

  describe('with a leftJustify prop', () => {
    it('is not narrow', () => {
      const { baseElement } = render(
        <StateSealMarkup
          leftJustify={true}
          additionalDisclaimer={faker.lorem.paragraph()}
          stateAbbreviation="ND"
        />,
        { wrapper: emailPartWrapper },
      )
      expect(baseElement.querySelector('.narrow')).toBeNull()
    })
  })

  describe('when there is a state seal for dark mode', () => {
    it('displays the light and the dark mode images', () => {
      const { getAllByRole, baseElement } = render(
        <StateSealMarkup additionalDisclaimer={faker.lorem.paragraph()} stateAbbreviation="NJ" />,
        { wrapper: emailPartWrapper },
      )
      const imgs: HTMLImageElement[] = getAllByRole('img') as any
      expect(imgs).toHaveLength(2)
      imgs.forEach((img) => {
        expect(img.alt).toEqual('The seal of the State of New Jersey')
      })
      expect(imgs.map((img) => img.className)).toEqual(['lightmode', 'darkmode'])

      const lightModeImage: HTMLImageElement = baseElement.querySelector('.lightmode') as any
      expect(lightModeImage.src).toContain('/state-seals/New-Jersey.png')
      const darkModeImage: HTMLImageElement = baseElement.querySelector('.darkmode') as any
      expect(darkModeImage.src).toContain('/state-seals/New-Jersey-White.png')
    })
  })
})

describe('StateSeal', () => {
  let stateSealValue: StateSealValue

  beforeEach(() => {
    stateSealValue = {
      additionalDisclaimer: faker.lorem.paragraph(),
      stateAbbreviation: 'NJ',
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
    const { getAllByRole } = render(
      <StateSeal emailComponent={buildUniqueEmailComponent('StateSeal')}>{null}</StateSeal>,
      { wrapper: emailPartWrapper },
    )
    const imgs: HTMLImageElement[] = getAllByRole('img') as any
    expect(imgs).toHaveLength(2)
    imgs.forEach((img) => {
      expect(img.alt).toEqual('The seal of the State of New Jersey')
    })
    expect(imgs.map((img) => img.className)).toEqual(['lightmode', 'darkmode'])
  })

  it('when there is no state seal value saved it renders without issue', () => {
    localStorage.removeItem('stateSeal')
    const { queryAllByRole } = render(
      <StateSeal emailComponent={buildUniqueEmailComponent('StateSeal')}>{null}</StateSeal>,
      { wrapper: emailPartWrapper },
    )
    expect(queryAllByRole('img')).toHaveLength(2)
  })
})

describe('useStateSealValue', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  describe('when in all states mode', () => {
    beforeEach(() => {
      mockAppMode('ALL')
    })

    it('uses US as the state seal key', () => {
      const { result } = renderHook(() => useStateSealValue())
      const [value] = result.current
      expect(value.stateAbbreviation).toEqual('US')
    })

    it('has disclaimer with an insert state placeholder', () => {
      const { result } = renderHook(() => useStateSealValue())
      const [value] = result.current
      expect(value.additionalDisclaimer).toContain('[Insert State]')
    })
  })

  describe('when in state mode', () => {
    describe('for example NY', () => {
      beforeEach(() => {
        mockAppMode('NY')
      })

      it('uses the current app mode to find the state seal key', () => {
        const { result } = renderHook(() => useStateSealValue())
        const [value] = result.current
        expect(value.stateAbbreviation).toEqual('NY')
      })

      it('has specific disclaimer', () => {
        const { result } = renderHook(() => useStateSealValue())
        const [value] = result.current
        expect(value.additionalDisclaimer).not.toContain('[Insert State]')
      })
    })

    describe('for example NJ', () => {
      beforeEach(() => {
        mockAppMode('NJ')
      })

      it('uses the current app mode to find the state seal key', () => {
        const { result } = renderHook(() => useStateSealValue())
        const [value] = result.current
        expect(value.stateAbbreviation).toEqual('NJ')
      })

      it('has specific disclaimer', () => {
        const { result } = renderHook(() => useStateSealValue())
        const [value] = result.current
        expect(value.additionalDisclaimer).not.toContain('[Insert State]')
      })
    })
  })
})
