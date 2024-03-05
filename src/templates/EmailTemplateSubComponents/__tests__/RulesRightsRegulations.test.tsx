import { faker } from '@faker-js/faker'
import { RenderResult, render } from '@testing-library/react'
import userEvent, { UserEvent } from '@testing-library/user-event'
import React, { FC } from 'react'
import { EmailTemplate, RulesRightsRegulationsVariant } from 'src/appTypes'
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
import { TEST_ID as richTextEditorTestId } from 'src/ui/RichTextEditor'

describe('RulesRightsRegulations', () => {
  let value: string
  let emailSubComponent: EmailTemplate.RulesRightsRegulations
  let user: UserEvent
  let rendered: RenderResult
  let key: string

  const clearAndFillWithValue = async (label: string) => {
    const element = rendered.getByLabelText(label)
    await user.clear(element)
    await user.type(element, value)
  }

  beforeEach(() => {
    emailSubComponent = buildUniqueEmailSubComponent('Body', { kind: 'RulesRightsRegulations' })
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
        await user.click(rendered.getByText('Reminder', { selector: 'span' }))
        await user.click(rendered.getByRole('option', { name: 'Reminder' }))
      })

      it('has an icon', () => {
        const { baseElement } = rendered
        expect(baseElement.querySelector('table img')).not.toBeNull()
      })

      itHasAnEditable('title', 'Reminder title')

      itHasAnEditable('eligibility label', 'Eligibility label')

      itHasAnEditable('eligibility condition 1', 'Eligibility condition 1')

      itHasAnEditable('eligibility condition 2', 'Eligibility condition 2')

      itHasAnEditableRichText('reminder is for', 'Reminder is for')

      itHasAnEditableRichText('footnote', 'Reminder footnote')

      it('only has the correct fields', () => {
        const all = rendered.baseElement.querySelectorAll('[aria-label]')
        expect(all).toHaveLength(6)
      })

      it('can have reminder is for toggled on and off', async () => {
        const { getByRole, queryByLabelText } = rendered

        expect(queryByLabelText('Reminder is for')).not.toBeNull()
        await user.click(getByRole('switch', { name: 'Reminder Is For' }))
        expect(queryByLabelText('Reminder is for')).toBeNull()
        await user.click(getByRole('switch', { name: 'Reminder Is For' }))
        expect(queryByLabelText('Reminder is for')).not.toBeNull()
      })

      it('can have the footnote toggled on and off', async () => {
        const { getByRole, queryByLabelText } = rendered

        expect(queryByLabelText('Reminder footnote')).not.toBeNull()
        await user.click(getByRole('switch', { name: '+ Footnote' }))
        expect(queryByLabelText('Reminder footnote')).toBeNull()
        await user.click(getByRole('switch', { name: '+ Footnote' }))
        expect(queryByLabelText('Reminder footnote')).not.toBeNull()
      })
    })

    describe('Appeal Rights', () => {
      beforeEach(async () => {
        rendered = renderEmailPart(
          <RulesRightsRegulations emailSubComponent={emailSubComponent} />,
          <RulesRightsRegulationsControls emailSubComponent={emailSubComponent} />,
        )
        await user.click(rendered.getByText('Reminder', { selector: 'span' }))
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

      itHasAnEditable('table label 1', 'Appeal Rights row label 1')

      itHasAnEditable('table value 1', 'Appeal Rights row value 1')

      itHasAnEditable('table label 2', 'Appeal Rights row label 2')

      itHasAnEditable('table value 2', 'Appeal Rights row value 2')

      itHasAnEditable('table label 3', 'Appeal Rights row label 3')

      itHasAnEditable('table value 3', 'Appeal Rights row value 3')

      it('only has the correct fields', () => {
        const all = rendered.baseElement.querySelectorAll('[aria-label]')
        expect(all).toHaveLength(12)
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

      it('can have the appealRightsInfoLabel toggled on and off', async () => {
        const { getByRole, queryByLabelText } = rendered

        expect(queryByLabelText('Appeal Rights row label 1')).not.toBeNull()
        await user.click(getByRole('switch', { name: 'Information' }))
        expect(queryByLabelText('Appeal Rights row label 1')).toBeNull()
        await user.click(getByRole('switch', { name: 'Information' }))
        expect(queryByLabelText('Appeal Rights row label 1')).not.toBeNull()
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
          RulesRightsRegulationsVariant.YourRights + '',
        )
      })

      it('lacks an icon', () => {
        const { baseElement } = rendered
        expect(baseElement.querySelector('table img')).toBeNull()
      })

      itHasAnEditable('title', 'Your Rights title')

      itHasAnEditable('right 1', 'Your Rights 1')

      itHasAnEditable('right 2', 'Your Rights 2')

      itHasAnEditable('right 3', 'Your Rights 3')

      itHasAnEditable('right 4', 'Your Rights 4')

      itHasAnEditable('right 5', 'Your Rights 5')

      itHasAnEditable('right 6', 'Your Rights 6')
    })
  })
})
