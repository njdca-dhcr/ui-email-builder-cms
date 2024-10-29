import { render } from '@testing-library/react'
import React from 'react'
import {
  buildUniqueEmailComponent,
  buildUniqueEmailConfig,
  buildUniqueEmailSubComponent,
  emailPartWrapper,
} from 'src/testHelpers'
import { spacingCellSizes } from 'src/templates/styles'
import { EmailTemplate } from 'src/appTypes'
import { EmailSubComponentSpacer } from '../EmailSubComponentSpacer'
import { ShouldShowEmailPart } from 'src/templates/ShouldShowEmailPart'
import { EmailTemplateConfig } from 'src/templates/EmailTemplateConfig'

describe('EmailSubComponentSpacer', () => {
  const renderWithSubComponents = <T extends EmailTemplate.Kinds.Component>({
    currentSubComponent,
    nextSubComponent,
    parentComponent,
    shouldShowNextComponent,
  }: {
    currentSubComponent: EmailTemplate.Kinds.SubComponent<T>
    nextSubComponent: EmailTemplate.Kinds.SubComponent<T> | undefined
    parentComponent: T
    shouldShowNextComponent?: boolean
  }) => {
    const nextOne =
      nextSubComponent && buildUniqueEmailSubComponent(parentComponent, { kind: nextSubComponent })
    const { baseElement } = render(
      <ShouldShowEmailPart
        initialData={nextOne ? { [nextOne.id]: shouldShowNextComponent ?? true } : {}}
      >
        <EmailSubComponentSpacer
          currentSubComponent={buildUniqueEmailSubComponent(parentComponent, {
            kind: currentSubComponent,
          })}
          nextSubComponent={nextOne}
        />
      </ShouldShowEmailPart>,
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
      const size = renderWithSubComponents({
        currentSubComponent: 'Title',
        nextSubComponent: 'ProgramName',
        parentComponent: 'Header',
        shouldShowNextComponent: false,
      })
      expect(size).toBeUndefined()
    })
  })

  describe('ProgramName', () => {
    it('is nothing when it should not show the next subcomponent', () => {
      const size = renderWithSubComponents({
        currentSubComponent: 'ProgramName',
        nextSubComponent: 'DirectiveButton',
        parentComponent: 'Header',
        shouldShowNextComponent: false,
      })
      expect(size).toBeUndefined()
    })

    it('is nothing when it there is no next subcomponent', () => {
      const size = renderWithSubComponents({
        currentSubComponent: 'ProgramName',
        nextSubComponent: undefined,
        parentComponent: 'Header',
        shouldShowNextComponent: true,
      })
      expect(size).toBeUndefined()
    })

    it('is medium when it there is a next subcomponent that should be shown', () => {
      const size = renderWithSubComponents({
        currentSubComponent: 'ProgramName',
        nextSubComponent: 'DirectiveButton',
        parentComponent: 'Header',
        shouldShowNextComponent: true,
      })
      expect(size).toEqual(`${spacingCellSizes.medium}px`)
    })

    it('is nothing when the next component should that should be shown is DirectiveButton but the Directive is hidden', () => {
      const directive = buildUniqueEmailSubComponent('Body', { kind: 'Directive' })
      const directiveButton = buildUniqueEmailSubComponent('Header', { kind: 'DirectiveButton' })
      const programName = buildUniqueEmailSubComponent('Header', { kind: 'ProgramName' })

      const emailTemplateConfig = buildUniqueEmailConfig({
        components: [
          buildUniqueEmailComponent('Header', { subComponents: [programName, directiveButton] }),
          buildUniqueEmailComponent('Body', { subComponents: [directive] }),
        ],
      })

      const { baseElement } = render(
        <EmailTemplateConfig emailTemplateConfig={emailTemplateConfig}>
          <ShouldShowEmailPart initialData={{ [directive.id]: false, [directiveButton.id]: true }}>
            <EmailSubComponentSpacer
              currentSubComponent={programName}
              nextSubComponent={directiveButton}
            />
          </ShouldShowEmailPart>
        </EmailTemplateConfig>,
        {
          wrapper: emailPartWrapper,
        },
      )
      const spacer = baseElement.querySelector('td')
      expect(spacer?.style.height).toBeUndefined()
    })
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
