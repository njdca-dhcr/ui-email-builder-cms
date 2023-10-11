import React, { FC } from 'react'
import userEvent, { UserEvent } from '@testing-library/user-event'
import { RenderResult, render } from '@testing-library/react'
import { faker } from '@faker-js/faker'
import { RulesRightsRegulationsControls } from '../RulesRightsRegulationsControls'
import { EmailPartsContent } from 'src/templates/EmailPartsContent'
import {
  RulesRightsRegulationsVariant,
  useRulesRightsRegulationsValue,
} from 'src/templates/EmailTemplateSubComponents/RulesRightsRegulations'
import { buildSubComponentKey } from 'src/utils/emailPartKeys'

describe('RulesRightsRegulationsControls', () => {
  let componentId: string
  let id: string

  beforeEach(() => {
    componentId = faker.lorem.word()
    id = faker.lorem.word()
  })

  it('provides a dropdown for selecting a variant', async () => {
    const user = userEvent.setup()
    const { getByRole, queryByRole } = render(
      <EmailPartsContent>
        <RulesRightsRegulationsControls componentId={componentId} id={id} />,
      </EmailPartsContent>,
    )
    let button = queryByRole('button')
    expect(button).not.toBeNull()
    expect(button).toHaveTextContent('Reminder')

    await user.click(button!)
    expect(queryByRole('option', { name: 'Reminder' })).not.toBeNull()
    expect(queryByRole('option', { name: 'Appeal Rights' })).not.toBeNull()
    await user.click(getByRole('option', { name: 'Appeal Rights' }))

    button = queryByRole('button')
    expect(button).not.toBeNull()
    expect(button).toHaveTextContent('Appeal Rights')
  })

  describe('variants', () => {
    let rendered: RenderResult
    let user: UserEvent

    const AppealRightsHref: FC = () => {
      const [value] = useRulesRightsRegulationsValue(componentId, id)

      return <div data-testid="appeal-rights-href">{value.appealRightsHref}</div>
    }

    beforeEach(() => {
      user = userEvent.setup()
      rendered = render(
        <EmailPartsContent>
          <RulesRightsRegulationsControls componentId={componentId} id={id} />,
          <AppealRightsHref />
        </EmailPartsContent>,
      )
    })

    describe('Reminder', () => {
      beforeEach(async () => {
        await user.click(rendered.getByRole('button'))
        await user.click(rendered.getByRole('option', { name: 'Reminder' }))
      })

      it('does not render any inputs', () => {
        expect(rendered.baseElement.querySelectorAll('input')).toHaveLength(0)
      })
    })

    describe('Appeal Rights', () => {
      beforeEach(async () => {
        await user.click(rendered.getByRole('button'))
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
