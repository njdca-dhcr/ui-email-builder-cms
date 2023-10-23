import React, { FC } from 'react'
import userEvent, { UserEvent } from '@testing-library/user-event'
import { RenderResult, render } from '@testing-library/react'
import { faker } from '@faker-js/faker'
import { RulesRightsRegulationsControls } from '../RulesRightsRegulationsControls'
import { EmailPartsContent } from 'src/templates/EmailPartsContent'
import { useRulesRightsRegulationsValue } from 'src/templates/EmailTemplateSubComponents/RulesRightsRegulations'

describe('RulesRightsRegulationsControls', () => {
  let componentId: string
  let id: string
  let rendered: RenderResult
  let user: UserEvent

  const AppealRightsHref: FC = () => {
    const [value] = useRulesRightsRegulationsValue(componentId, id)

    return <div data-testid="appeal-rights-href">{value.appealRightsHref}</div>
  }

  beforeEach(() => {
    componentId = faker.lorem.word()
    id = faker.lorem.word()
    user = userEvent.setup()
    rendered = render(
      <EmailPartsContent>
        <RulesRightsRegulationsControls componentId={componentId} id={id} />,
        <AppealRightsHref />,
      </EmailPartsContent>,
    )
  })

  it('provides a dropdown for selecting an icon', async () => {
    const { getByRole, queryByRole, queryByText } = rendered
    let button = queryByText('Flag', { selector: 'span' })
    expect(button).not.toBeNull()
    expect(button).toHaveTextContent('Flag')

    await user.click(button!)
    expect(queryByRole('option', { name: 'Flag' })).not.toBeNull()
    expect(queryByRole('option', { name: 'Device Thermostat' })).not.toBeNull()
    await user.click(getByRole('option', { name: 'Device Thermostat' }))

    button = queryByText('Device Thermostat', { selector: 'span' })
    expect(button).not.toBeNull()
    expect(button).toHaveTextContent('Device Thermostat')
  })

  it('provides a dropdown for selecting a variant', async () => {
    const user = userEvent.setup()
    const { getByRole, queryByRole, queryByText } = rendered
    let button = queryByText('Reminder', { selector: 'span' })
    expect(button).not.toBeNull()
    expect(button).toHaveTextContent('Reminder')

    await user.click(button!)
    expect(queryByRole('option', { name: 'Reminder' })).not.toBeNull()
    expect(queryByRole('option', { name: 'Appeal Rights' })).not.toBeNull()
    await user.click(getByRole('option', { name: 'Appeal Rights' }))

    button = queryByText('Appeal Rights', { selector: 'span' })
    expect(button).not.toBeNull()
    expect(button).toHaveTextContent('Appeal Rights')
  })

  describe('variants', () => {
    describe('Reminder', () => {
      beforeEach(async () => {
        await user.click(rendered.getByText('Reminder', { selector: 'span' }))
        await user.click(rendered.getByRole('option', { name: 'Reminder' }))
      })

      it('does not render any inputs', () => {
        expect(rendered.baseElement.querySelectorAll('input')).toHaveLength(0)
      })
    })

    describe('Appeal Rights', () => {
      beforeEach(async () => {
        await user.click(rendered.getByText('Reminder', { selector: 'span' }))
        await user.click(rendered.getByRole('option', { name: 'Appeal Rights' }))
      })

      it('displays an input for the button link', async () => {
        const { queryByLabelText, getByTestId } = rendered
        const input: HTMLInputElement | null = queryByLabelText('Button Link') as any
        expect(input).not.toBeNull()
        const value = `https://${faker.lorem.word()}.gov/appeal`
        await user.type(input!, value)
        expect(getByTestId('appeal-rights-href')).toHaveTextContent(value)
      })
    })
  })
})
