import { render } from '@testing-library/react'
import React from 'react'
import { EmailComponentSpacer } from '../EmailComponentSpacer'
import { buildEmailTemplateComponent, emailPartWrapper } from 'src/testHelpers'
import { spacingCellSizes } from 'src/templates/styles'
import { EmailTemplate } from 'src/appTypes'

describe('EmailComponentSpacer', () => {
  const renderWithComponents = (props: {
    currentComponent: EmailTemplate.Component
    nextComponent: EmailTemplate.Component | undefined
  }) => {
    const { baseElement } = render(<EmailComponentSpacer {...props} />, {
      wrapper: emailPartWrapper,
    })

    const spacer = baseElement.querySelector('td')
    return spacer?.style.height
  }

  it(`is large when the current component is Banner`, () => {
    const size = renderWithComponents({
      currentComponent: buildEmailTemplateComponent('Banner'),
      nextComponent: buildEmailTemplateComponent('Header'),
    })

    expect(size).toEqual(`${spacingCellSizes.large}px`)
  })

  it(`is large when the current component is Header`, () => {
    const size = renderWithComponents({
      currentComponent: buildEmailTemplateComponent('Header'),
      nextComponent: buildEmailTemplateComponent('Name'),
    })

    expect(size).toEqual(`${spacingCellSizes.large}px`)
  })

  it(`is medium when the current component is Name`, () => {
    const size = renderWithComponents({
      currentComponent: buildEmailTemplateComponent('Name'),
      nextComponent: buildEmailTemplateComponent('Body'),
    })

    expect(size).toEqual(`${spacingCellSizes.medium}px`)
  })

  it('is nothing when the current component is Body', () => {
    const size = renderWithComponents({
      currentComponent: buildEmailTemplateComponent('Body'),
      nextComponent: buildEmailTemplateComponent('Body'),
    })

    expect(size).toBeUndefined()
  })

  it(`is large when the current component is StateSeal`, () => {
    const size = renderWithComponents({
      currentComponent: buildEmailTemplateComponent('StateSeal'),
      nextComponent: buildEmailTemplateComponent('Disclaimer'),
    })

    expect(size).toEqual(`${spacingCellSizes.large}px`)
  })

  it(`is medium when the current component is Footer`, () => {
    const size = renderWithComponents({
      currentComponent: buildEmailTemplateComponent('Footer'),
      nextComponent: buildEmailTemplateComponent('Disclaimer'),
    })

    expect(size).toEqual(`${spacingCellSizes.medium}px`)
  })

  it('is nothing when the current component is Disclaimer', () => {
    const size = renderWithComponents({
      currentComponent: buildEmailTemplateComponent('Disclaimer'),
      nextComponent: undefined,
    })

    expect(size).toBeUndefined()
  })
})
