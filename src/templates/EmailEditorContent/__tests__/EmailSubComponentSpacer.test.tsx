import { render } from '@testing-library/react'
import React from 'react'
import { buildUniqueEmailSubComponent, emailPartWrapper } from 'src/testHelpers'
import { spacingCellSizes } from 'src/templates/styles'
import { EmailTemplate } from 'src/appTypes'
import { EmailSubComponentSpacer } from '../EmailSubComponentSpacer'
import { ShouldShowEmailPart } from 'src/templates/ShouldShowEmailPart'

describe('EmailSubComponentSpacer', () => {
  const renderWithSubComponents = ({
    currentSubComponent,
    nextSubComponent,
  }: {
    currentSubComponent: EmailTemplate.SubComponentKind
    nextSubComponent: EmailTemplate.SubComponentKind | undefined
  }) => {
    const { baseElement } = render(
      <EmailSubComponentSpacer
        currentSubComponent={buildUniqueEmailSubComponent('Body', { kind: currentSubComponent })}
        nextSubComponent={
          nextSubComponent && buildUniqueEmailSubComponent('Body', { kind: nextSubComponent })
        }
      />,
      {
        wrapper: emailPartWrapper,
      },
    )

    const spacer = baseElement.querySelector('td')
    return spacer?.style.height
  }

  it('is nothing when the component should not be shown', () => {
    const currentSubComponent = buildUniqueEmailSubComponent('Body', { kind: 'Intro' })
    const { baseElement } = render(
      <ShouldShowEmailPart initialData={{ [currentSubComponent.id]: false }}>
        <EmailSubComponentSpacer
          currentSubComponent={currentSubComponent}
          nextSubComponent={buildUniqueEmailSubComponent('Body', { kind: 'Status' })}
        />
      </ShouldShowEmailPart>,
      {
        wrapper: emailPartWrapper,
      },
    )
    expect(baseElement.querySelector('td')).toBeNull()
  })

  it('is nothing when the subcomponent is DepartmentSeal', () => {
    const size = renderWithSubComponents({
      currentSubComponent: 'DepartmentSeal',
      nextSubComponent: 'Title',
    })
    expect(size).toBeUndefined()
  })

  describe('Title', () => {
    it('is large when the next subcomponent should be shown', () => {
      const size = renderWithSubComponents({
        currentSubComponent: 'Title',
        nextSubComponent: 'ProgramName',
      })
      expect(size).toEqual(`${spacingCellSizes.large}px`)
    })

    it('is nothing when the next subcomponent should not be shown', () => {
      const nextSubComponent = buildUniqueEmailSubComponent('Body', {
        kind: 'ProgramName',
      })
      const { baseElement } = render(
        <ShouldShowEmailPart initialData={{ [nextSubComponent.id]: false }}>
          <EmailSubComponentSpacer
            currentSubComponent={buildUniqueEmailSubComponent('Body', {
              kind: 'Title',
            })}
            nextSubComponent={nextSubComponent}
          />
        </ShouldShowEmailPart>,
        {
          wrapper: emailPartWrapper,
        },
      )
      const spacer = baseElement.querySelector('td')
      expect(spacer).toBeNull()
    })
  })

  it('is nothing when the subcomponent is ProgramName', () => {
    const size = renderWithSubComponents({
      currentSubComponent: 'ProgramName',
      nextSubComponent: undefined,
    })
    expect(size).toBeUndefined()
  })

  it('is medium when the subcomponent is Intro', () => {
    const size = renderWithSubComponents({
      currentSubComponent: 'Intro',
      nextSubComponent: 'Status',
    })
    expect(size).toEqual(`${spacingCellSizes.medium}px`)
  })

  it('is extraLarge when the subcomponent is RulesRightsRegulations', () => {
    const size = renderWithSubComponents({
      currentSubComponent: 'RulesRightsRegulations',
      nextSubComponent: 'Status',
    })
    expect(size).toEqual(`${spacingCellSizes.extraLarge}px`)
  })

  it('is nothing when the subcomponent is Status (configurable in controls)', () => {
    const size = renderWithSubComponents({
      currentSubComponent: 'Status',
      nextSubComponent: 'RulesRightsRegulations',
    })
    expect(size).toBeUndefined()
  })

  describe('SupplementalContent', () => {
    it('is extraLarge when not followed by SupplementalContent', () => {
      const size = renderWithSubComponents({
        currentSubComponent: 'SupplementalContent',
        nextSubComponent: 'LoginDetails',
      })
      expect(size).toEqual(`${spacingCellSizes.extraLarge}px`)
    })

    it('is large when followed by SupplementalContent', () => {
      const size = renderWithSubComponents({
        currentSubComponent: 'SupplementalContent',
        nextSubComponent: 'SupplementalContent',
      })
      expect(size).toEqual(`${spacingCellSizes.large}px`)
    })

    it('is extraLarge when followed by supplemental content that will not be shown', () => {
      const nextSubComponent = buildUniqueEmailSubComponent('Body', {
        kind: 'SupplementalContent',
      })
      const { baseElement } = render(
        <ShouldShowEmailPart initialData={{ [nextSubComponent.id]: false }}>
          <EmailSubComponentSpacer
            currentSubComponent={buildUniqueEmailSubComponent('Body', {
              kind: 'SupplementalContent',
            })}
            nextSubComponent={nextSubComponent}
          />
        </ShouldShowEmailPart>,
        {
          wrapper: emailPartWrapper,
        },
      )
      const spacer = baseElement.querySelector('td')
      expect(spacer).not.toBeNull()
      expect(spacer?.style.height).toEqual(`${spacingCellSizes.extraLarge}px`)
    })
  })

  it('is extraLarge when the subcomponent is Directive', () => {
    const size = renderWithSubComponents({
      currentSubComponent: 'Directive',
      nextSubComponent: 'LoginDetails',
    })
    expect(size).toEqual(`${spacingCellSizes.extraLarge}px`)
  })

  it('is extraLarge when the subcomponent is LoginDetails', () => {
    const size = renderWithSubComponents({
      currentSubComponent: 'LoginDetails',
      nextSubComponent: undefined,
    })
    expect(size).toEqual(`${spacingCellSizes.extraLarge}px`)
  })

  it('is extraLarge when the subcomponent is BenefitAmount', () => {
    const size = renderWithSubComponents({
      currentSubComponent: 'BenefitAmount',
      nextSubComponent: 'LoginDetails',
    })
    expect(size).toEqual(`${spacingCellSizes.extraLarge}px`)
  })

  it('is nothing when the subcomponent is AdditionalContent', () => {
    const size = renderWithSubComponents({
      currentSubComponent: 'AdditionalContent',
      nextSubComponent: undefined,
    })
    expect(size).toBeUndefined()
  })
})
