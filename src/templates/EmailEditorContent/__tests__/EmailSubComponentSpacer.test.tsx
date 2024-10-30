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
import { EmailTemplateConfig } from 'src/templates/EmailTemplateConfig'
import { EmailPartsContent } from 'src/templates/EmailPartsContent'

describe('EmailSubComponentSpacer', () => {
  const renderWithSubComponents = ({
    currentSubComponent,
    nextSubComponent,
    shouldShowNextComponent,
  }: {
    currentSubComponent: EmailTemplate.Kinds.SubComponent
    nextSubComponent: EmailTemplate.Kinds.SubComponent | undefined
    shouldShowNextComponent?: boolean
  }) => {
    const nextOne = nextSubComponent && buildUniqueEmailSubComponent({ kind: nextSubComponent })
    const { baseElement } = render(
      <EmailPartsContent
        initialData={nextOne ? { [nextOne.id]: { visible: shouldShowNextComponent ?? true } } : {}}
      >
        <EmailSubComponentSpacer
          currentSubComponent={buildUniqueEmailSubComponent({
            kind: currentSubComponent,
          })}
          nextSubComponent={nextOne}
        />
      </EmailPartsContent>,
      {
        wrapper: emailPartWrapper,
      },
    )

    const spacer = baseElement.querySelector('td')
    return spacer?.style.height
  }

  it('is nothing when the component should not be shown', () => {
    const currentSubComponent = buildUniqueEmailSubComponent({ kind: 'Intro' })
    const { baseElement } = render(
      <EmailPartsContent initialData={{ [currentSubComponent.id]: { visible: false } }}>
        <EmailSubComponentSpacer
          currentSubComponent={currentSubComponent}
          nextSubComponent={buildUniqueEmailSubComponent({ kind: 'Status' })}
        />
      </EmailPartsContent>,
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
    })
    expect(size).toEqual(`${spacingCellSizes.large}px`)
  })

  describe('Title', () => {
    it('is medium when the next subcomponent should be shown', () => {
      const size = renderWithSubComponents({
        currentSubComponent: 'Title',
        nextSubComponent: 'ProgramName',
      })
      expect(size).toEqual(`${spacingCellSizes.medium}px`)
    })

    it('is nothing when the next subcomponent should not be shown', () => {
      const size = renderWithSubComponents({
        currentSubComponent: 'Title',
        nextSubComponent: 'ProgramName',
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
        shouldShowNextComponent: false,
      })
      expect(size).toBeUndefined()
    })

    it('is nothing when it there is no next subcomponent', () => {
      const size = renderWithSubComponents({
        currentSubComponent: 'ProgramName',
        nextSubComponent: undefined,
        shouldShowNextComponent: true,
      })
      expect(size).toBeUndefined()
    })

    it('is medium when it there is a next subcomponent that should be shown', () => {
      const size = renderWithSubComponents({
        currentSubComponent: 'ProgramName',
        nextSubComponent: 'DirectiveButton',
        shouldShowNextComponent: true,
      })
      expect(size).toEqual(`${spacingCellSizes.medium}px`)
    })

    it('is nothing when the next component should that should be shown is DirectiveButton but the Directive is hidden', () => {
      const directive = buildUniqueEmailSubComponent({ kind: 'Directive' })
      const directiveButton = buildUniqueEmailSubComponent({ kind: 'DirectiveButton' })
      const programName = buildUniqueEmailSubComponent({ kind: 'ProgramName' })

      const emailTemplateConfig = buildUniqueEmailConfig({
        components: [
          buildUniqueEmailComponent('Header', { subComponents: [programName, directiveButton] }),
          buildUniqueEmailComponent('Body', { subComponents: [directive] }),
        ],
      })

      const { baseElement } = render(
        <EmailTemplateConfig emailTemplateConfig={emailTemplateConfig}>
          <EmailPartsContent
            initialData={{
              [directive.id]: { visible: false },
              [directiveButton.id]: { visible: true },
            }}
          >
            <EmailSubComponentSpacer
              currentSubComponent={programName}
              nextSubComponent={directiveButton}
            />
          </EmailPartsContent>
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

  it('is extraLarge when the subcomponent is SupplementalContent', () => {
    const size = renderWithSubComponents({
      currentSubComponent: 'SupplementalContent',
      nextSubComponent: 'LoginDetails',
    })
    expect(size).toEqual(`${spacingCellSizes.extraLarge}px`)
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

  it('is extraLarge when the subcomponent is InformationalBox', () => {
    const size = renderWithSubComponents({
      currentSubComponent: 'InformationalBox',
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
