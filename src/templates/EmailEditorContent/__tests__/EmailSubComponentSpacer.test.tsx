import { render } from '@testing-library/react'
import React from 'react'
import { buildEmailTemplateSubComponent, emailPartWrapper } from 'src/testHelpers'
import { spacingCellSizes } from 'src/templates/styles'
import { EmailTemplate } from 'src/appTypes'
import { EmailSubComponentSpacer } from '../EmailSubComponentSpacer'
import { ShouldShowEmailPart } from 'src/templates/ShouldShowEmailPart'
import { faker } from '@faker-js/faker'
import { buildSubComponentKey } from 'src/utils/emailPartKeys'

describe('EmailSubComponentSpacer', () => {
  let id: string
  let nextId: string
  let componentId: string
  let key: string
  let nextKey: string

  beforeEach(() => {
    id = faker.lorem.word()
    nextId = faker.lorem.word()
    componentId = faker.lorem.word()
    key = buildSubComponentKey(componentId, id)
    nextKey = buildSubComponentKey(componentId, nextId)
  })

  const renderWithSubComponents = ({
    currentSubComponent,
    nextSubComponent,
  }: {
    currentSubComponent: EmailTemplate.SubComponentKind
    nextSubComponent: EmailTemplate.SubComponentKind | undefined
  }) => {
    const { baseElement } = render(
      <EmailSubComponentSpacer
        id={id}
        nextId={nextId}
        componentId={componentId}
        currentSubComponent={buildEmailTemplateSubComponent('Body', { kind: currentSubComponent })}
        nextSubComponent={
          nextSubComponent && buildEmailTemplateSubComponent('Body', { kind: nextSubComponent })
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
    const { baseElement } = render(
      <ShouldShowEmailPart initialData={{ [key]: false }}>
        <EmailSubComponentSpacer
          id={id}
          nextId={nextId}
          componentId={componentId}
          currentSubComponent={buildEmailTemplateSubComponent('Body', { kind: 'Intro' })}
          nextSubComponent={buildEmailTemplateSubComponent('Body', { kind: 'Status' })}
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

  it('is large when the subcomponent is Title', () => {
    const size = renderWithSubComponents({
      currentSubComponent: 'Title',
      nextSubComponent: 'ProgramName',
    })
    expect(size).toEqual(`${spacingCellSizes.large}px`)
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
      const { baseElement } = render(
        <ShouldShowEmailPart initialData={{ [nextKey]: false }}>
          <EmailSubComponentSpacer
            id={id}
            nextId={nextId}
            componentId={componentId}
            currentSubComponent={buildEmailTemplateSubComponent('Body', {
              kind: 'SupplementalContent',
            })}
            nextSubComponent={buildEmailTemplateSubComponent('Body', {
              kind: 'SupplementalContent',
            })}
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
