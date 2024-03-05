import { render } from '@testing-library/react'
import React from 'react'
import { buildUniqueEmailSubComponent, emailPartWrapper } from 'src/testHelpers'
import { spacingCellSizes } from 'src/templates/styles'
import { EmailTemplate } from 'src/appTypes'
import { EmailSubComponentSpacer } from '../EmailSubComponentSpacer'
import { ShouldShowEmailPart } from 'src/templates/ShouldShowEmailPart'

describe('EmailSubComponentSpacer', () => {
  const renderWithSubComponents = <T extends EmailTemplate.ComponentKind>({
    currentSubComponent,
    nextSubComponent,
    parentComponent,
  }: {
    currentSubComponent: EmailTemplate.SubComponentKind<T>
    nextSubComponent: EmailTemplate.SubComponentKind<T> | undefined
    parentComponent: T
  }) => {
    const { baseElement } = render(
      <EmailSubComponentSpacer
        currentSubComponent={buildUniqueEmailSubComponent(parentComponent, {
          kind: currentSubComponent,
        })}
        nextSubComponent={
          nextSubComponent &&
          buildUniqueEmailSubComponent(parentComponent, { kind: nextSubComponent })
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

  it('is large when the subcomponent is DepartmentSeal', () => {
    const size = renderWithSubComponents({
      currentSubComponent: 'DepartmentSeal',
      nextSubComponent: 'Title',
      parentComponent: 'Header',
    })
    expect(size).toEqual(`${spacingCellSizes.large}px`)
  })

  describe('Title', () => {
    it('is medium when the next subcomponent should be shown', () => {
      const size = renderWithSubComponents({
        currentSubComponent: 'Title',
        nextSubComponent: 'ProgramName',
        parentComponent: 'Header',
      })
      expect(size).toEqual(`${spacingCellSizes.medium}px`)
    })

    it('is nothing when the next subcomponent should not be shown', () => {
      const nextSubComponent = buildUniqueEmailSubComponent('Header', {
        kind: 'ProgramName',
      })
      const { baseElement } = render(
        <ShouldShowEmailPart initialData={{ [nextSubComponent.id]: false }}>
          <EmailSubComponentSpacer
            currentSubComponent={buildUniqueEmailSubComponent('Header', {
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
      parentComponent: 'Header',
    })
    expect(size).toBeUndefined()
  })

  it('is medium when the subcomponent is Intro', () => {
    const size = renderWithSubComponents({
      currentSubComponent: 'Intro',
      nextSubComponent: 'Status',
      parentComponent: 'Body',
    })
    expect(size).toEqual(`${spacingCellSizes.medium}px`)
  })

  it('is extraLarge when the subcomponent is RulesRightsRegulations', () => {
    const size = renderWithSubComponents({
      currentSubComponent: 'RulesRightsRegulations',
      nextSubComponent: 'Status',
      parentComponent: 'Body',
    })
    expect(size).toEqual(`${spacingCellSizes.extraLarge}px`)
  })

  it('is nothing when the subcomponent is Status (configurable in controls)', () => {
    const size = renderWithSubComponents({
      currentSubComponent: 'Status',
      nextSubComponent: 'RulesRightsRegulations',
      parentComponent: 'Body',
    })
    expect(size).toBeUndefined()
  })

  it('is extraLarge when the subcomponent is SupplementalContent', () => {
    const size = renderWithSubComponents({
      currentSubComponent: 'SupplementalContent',
      nextSubComponent: 'LoginDetails',
      parentComponent: 'Body',
    })
    expect(size).toEqual(`${spacingCellSizes.extraLarge}px`)
  })

  it('is extraLarge when the subcomponent is Directive', () => {
    const size = renderWithSubComponents({
      currentSubComponent: 'Directive',
      nextSubComponent: 'LoginDetails',
      parentComponent: 'Body',
    })
    expect(size).toEqual(`${spacingCellSizes.extraLarge}px`)
  })

  it('is extraLarge when the subcomponent is LoginDetails', () => {
    const size = renderWithSubComponents({
      currentSubComponent: 'LoginDetails',
      nextSubComponent: undefined,
      parentComponent: 'Body',
    })
    expect(size).toEqual(`${spacingCellSizes.extraLarge}px`)
  })

  it('is extraLarge when the subcomponent is InformationalBox', () => {
    const size = renderWithSubComponents({
      currentSubComponent: 'InformationalBox',
      nextSubComponent: 'LoginDetails',
      parentComponent: 'Body',
    })
    expect(size).toEqual(`${spacingCellSizes.extraLarge}px`)
  })

  it('is nothing when the subcomponent is AdditionalContent', () => {
    const size = renderWithSubComponents({
      currentSubComponent: 'AdditionalContent',
      nextSubComponent: undefined,
      parentComponent: 'Footer',
    })
    expect(size).toBeUndefined()
  })
})
