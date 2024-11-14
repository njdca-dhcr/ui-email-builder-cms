import { faker } from '@faker-js/faker'
import { RenderResult, render } from '@testing-library/react'
import userEvent, { UserEvent } from '@testing-library/user-event'
import React, { FC } from 'react'
import { EmailParts, EmailTemplate, RulesRightsRegulationsVariant } from 'src/appTypes'
import {
  buildUniqueEmailSubComponent,
  emailPartWrapper,
  expectActiveEmailPartToBe,
  expectActiveEmailPartToNotBe,
  expectEmailPartContentFor,
  renderEmailPart,
} from 'src/testHelpers'
import { RulesRightsRegulations, useRulesRightsRegulationsValue } from '../RulesRightsRegulations'
import { RulesRightsRegulationsControls } from 'src/templates/EmailEditorSidebar/EmailSubcomponentControls/RulesRightsRegulationsControls'
import { RICH_TEXT_EDITOR_TEST_ID as richTextEditorTestId } from 'src/ui'

describe('RulesRightsRegulations', () => {
  let value: string
  let emailSubComponent: EmailParts.RulesRightsRegulations
  let user: UserEvent
  let rendered: RenderResult
  let key: string

  const clearAndFillWithValue = async (label: string) => {
    const element = rendered.getByLabelText(label)
    await user.clear(element)
    await user.type(element, value)
  }

  beforeEach(() => {
    emailSubComponent = buildUniqueEmailSubComponent({ kind: 'RulesRightsRegulations' })
    key = emailSubComponent.id
    user = userEvent.setup()
    value = faker.lorem.words(4)
  })

  it('activates when clicked', async () => {
    rendered = render(<RulesRightsRegulations emailSubComponent={emailSubComponent} />, {
      wrapper: emailPartWrapper,
    })
    const { getByLabelText, baseElement } = rendered
    expectActiveEmailPartToNotBe(key, baseElement)
    await user.click(getByLabelText('Reminder title'))
    expectActiveEmailPartToBe(key, baseElement)
  })

  describe('variants', () => {
    const VariantSelect: FC = () => {
      const [value, setValue] = useRulesRightsRegulationsValue(emailSubComponent)
      return (
        <label>
          Variant
          <select
            onChange={(event) => setValue({ ...value, variant: event.target.value as any })}
            value={value.variant}
          >
            <option>{RulesRightsRegulationsVariant.Reminder}</option>
            <option>{RulesRightsRegulationsVariant.AppealRights}</option>
            <option>{RulesRightsRegulationsVariant.YourRights}</option>
          </select>
        </label>
      )
    }

    const itHasAnEditable = (testName: string, label: string) => {
      it(`has an editable ${testName}`, async () => {
        await clearAndFillWithValue(label)
        expect(rendered.queryByText(value)).not.toBeNull()
        expectEmailPartContentFor(key, rendered.baseElement)
      })
    }

    const itHasAnEditableRichText = (testName: string, label: string) => {
      it(`has an editable ${testName}`, async () => {
        const input = rendered.getByLabelText(label)
        await user.click(input)
        expect(rendered.queryByTestId(richTextEditorTestId)).not.toBeNull()
      })
    }

    describe('Reminder', () => {
      beforeEach(async () => {
        rendered = renderEmailPart(
          <RulesRightsRegulations emailSubComponent={emailSubComponent} />,
          <RulesRightsRegulationsControls emailSubComponent={emailSubComponent} />,
        )
        await user.click(rendered.getByLabelText('Rules, Rights, and Regulations variant'))
        await user.click(rendered.getByRole('option', { name: 'Reminder' }))
      })

      it('has an icon', () => {
        const { baseElement } = rendered
        expect(baseElement.querySelector('table img')).not.toBeNull()
      })

      itHasAnEditable('title', 'Reminder title')

      itHasAnEditableRichText('reminder description', 'Reminder description')

      it('only has the correct fields', () => {
        const all = rendered.baseElement.querySelectorAll('[aria-label]')
        expect(all).toHaveLength(2)
      })
    })

    describe('Appeal Rights', () => {
      beforeEach(async () => {
        rendered = renderEmailPart(
          <RulesRightsRegulations emailSubComponent={emailSubComponent} />,
          <RulesRightsRegulationsControls emailSubComponent={emailSubComponent} />,
        )
        await user.click(rendered.getByLabelText('Rules, Rights, and Regulations variant'))
        await user.click(rendered.getByRole('option', { name: 'Appeal Rights' }))
      })

      it('has an icon', () => {
        const { baseElement } = rendered
        expect(baseElement.querySelector('table img')).not.toBeNull()
      })

      itHasAnEditable('title', 'Appeal Rights title')

      itHasAnEditableRichText('summary', 'Appeal Rights summary')

      itHasAnEditableRichText('instruction', 'Appeal Rights instruction')

      itHasAnEditable('button', 'Appeal Rights button')

      itHasAnEditable('link', 'Appeal Rights link')

      itHasAnEditable('info label', 'Appeal Rights information label')

      itHasAnEditableRichText('appeal rights information', 'Appeal Rights information')

      it('only has the correct fields', () => {
        const all = rendered.baseElement.querySelectorAll('[aria-label]')
        expect(all).toHaveLength(7)
      })

      it('can have the appealRightsInstruction toggled on and off', async () => {
        const { getByRole, queryByLabelText } = rendered

        expect(queryByLabelText('Appeal Rights instruction')).not.toBeNull()
        await user.click(getByRole('switch', { name: 'Instruction' }))
        expect(queryByLabelText('Appeal Rights instruction')).toBeNull()
        await user.click(getByRole('switch', { name: 'Instruction' }))
        expect(queryByLabelText('Appeal Rights instruction')).not.toBeNull()
      })

      it('can have the appealRightsInfoLabel toggled on and off', async () => {
        const { getByRole, queryByLabelText } = rendered

        expect(queryByLabelText('Appeal Rights information label')).not.toBeNull()
        await user.click(getByRole('switch', { name: 'Information Label' }))
        expect(queryByLabelText('Appeal Rights information label')).toBeNull()
        await user.click(getByRole('switch', { name: 'Information Label' }))
        expect(queryByLabelText('Appeal Rights information label')).not.toBeNull()
      })

      it('can have the appealRightsInfo toggled on and off', async () => {
        const { getByRole, queryByLabelText } = rendered

        expect(queryByLabelText('Appeal Rights information')).not.toBeNull()
        await user.click(getByRole('switch', { name: 'Information' }))
        expect(queryByLabelText('Appeal Rights information')).toBeNull()
        await user.click(getByRole('switch', { name: 'Information' }))
        expect(queryByLabelText('Appeal Rights information')).not.toBeNull()
      })
    })

    describe('Your Rights', () => {
      beforeEach(async () => {
        rendered = renderEmailPart(
          <RulesRightsRegulations emailSubComponent={emailSubComponent} />,
          <VariantSelect />,
        )
        await user.selectOptions(
          rendered.getByLabelText('Variant'),
          RulesRightsRegulationsVariant.YourRights,
        )
      })

      it('lacks an icon', () => {
        const { baseElement } = rendered
        expect(baseElement.querySelector('table img')).toBeNull()
      })

      itHasAnEditable('title', 'Your Rights title')

      itHasAnEditableRichText('description', 'Your Rights description')

      itHasAnEditableRichText('body', 'Your Rights body')

      it('only has the correct fields', () => {
        const all = rendered.baseElement.querySelectorAll('[aria-label]')
        expect(all).toHaveLength(3)
      })
    })
  })
})
