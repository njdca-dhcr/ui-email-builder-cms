import { faker } from '@faker-js/faker'
import { RenderResult, render } from '@testing-library/react'
import userEvent, { UserEvent } from '@testing-library/user-event'
import React, { FC } from 'react'
import { EmailTemplate } from 'src/appTypes'
import {
  buildEmailTemplateSubComponent,
  emailPartWrapper,
  expectActiveEmailPartToBe,
  expectActiveEmailPartToNotBe,
  expectEmailPartContentFor,
  renderEmailPart,
} from 'src/testHelpers'
import { buildSubComponentKey } from 'src/utils/emailPartKeys'
import {
  RulesRightsRegulations,
  RulesRightsRegulationsVariant,
  useRulesRightsRegulationsValue,
} from '../RulesRightsRegulations'

describe('RulesRightsRegulations', () => {
  let value: string
  let componentId: string
  let id: string
  let emailSubComponent: EmailTemplate.SubComponent<'Body'>
  let user: UserEvent
  let rendered: RenderResult
  let key: string

  const clearAndFillWithValue = async (label: string) => {
    const element = rendered.getByLabelText(label)
    await user.clear(element)
    await user.type(element, value)
  }

  beforeEach(() => {
    componentId = faker.lorem.words(2)
    id = faker.lorem.words(3)
    key = buildSubComponentKey(componentId, id)
    emailSubComponent = buildEmailTemplateSubComponent('Body', { kind: 'RulesRightsRegulations' })
    user = userEvent.setup()
    value = faker.lorem.words(4)
  })

  it('has an editable title', async () => {
    rendered = render(
      <RulesRightsRegulations
        componentId={componentId}
        id={id}
        emailSubComponent={emailSubComponent}
      />,
      { wrapper: emailPartWrapper },
    )
    await clearAndFillWithValue('Reminder title')
    expect(rendered.queryByText(value)).not.toBeNull()
    expectEmailPartContentFor(key, rendered.baseElement)
  })

  it('activates when clicked', async () => {
    rendered = render(
      <RulesRightsRegulations
        componentId={componentId}
        id={id}
        emailSubComponent={emailSubComponent}
      />,
      { wrapper: emailPartWrapper },
    )
    const { getByLabelText, baseElement } = rendered
    expectActiveEmailPartToNotBe(key, baseElement)
    await user.click(getByLabelText('Reminder title'))
    expectActiveEmailPartToBe(key, baseElement)
  })

  describe('variants', () => {
    const VariantSelect: FC = () => {
      const [value, setValue] = useRulesRightsRegulationsValue(componentId, id)
      return (
        <label>
          Variant
          <select
            onChange={(event) => setValue({ ...value, variant: parseInt(event.target.value) })}
            value={value.variant}
          >
            <option>{RulesRightsRegulationsVariant.Reminder}</option>
            <option>{RulesRightsRegulationsVariant.AppealRights}</option>
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

    describe('Reminder', () => {
      beforeEach(async () => {
        rendered = renderEmailPart(
          <RulesRightsRegulations
            componentId={componentId}
            id={id}
            emailSubComponent={emailSubComponent}
          />,
          <VariantSelect />,
        )
        await user.selectOptions(
          rendered.getByLabelText('Variant'),
          RulesRightsRegulationsVariant.Reminder + '',
        )
      })

      itHasAnEditable('title', 'Reminder title')

      itHasAnEditable('eligibility label', 'Eligibility label')

      itHasAnEditable('eligibility condition 1', 'Eligibility condition 1')

      itHasAnEditable('eligibility condition 2', 'Eligibility condition 2')

      itHasAnEditable('reminder is for', 'Reminder is for')

      itHasAnEditable('footnote', 'Reminder footnote')

      it('only has the correct fields', () => {
        const all = rendered.baseElement.querySelectorAll('[aria-label]')
        expect(all).toHaveLength(6)
      })
    })

    describe('Appeal Rights', () => {
      beforeEach(async () => {
        rendered = renderEmailPart(
          <RulesRightsRegulations
            componentId={componentId}
            id={id}
            emailSubComponent={emailSubComponent}
          />,
          <VariantSelect />,
        )
        await user.selectOptions(
          rendered.getByLabelText('Variant'),
          RulesRightsRegulationsVariant.AppealRights + '',
        )
      })

      itHasAnEditable('title', 'Appeal Rights title')

      itHasAnEditable('summary', 'Appeal Rights summary')

      itHasAnEditable('instruction', 'Appeal Rights instruction')

      itHasAnEditable('button', 'Appeal Rights button')

      itHasAnEditable('info label', 'Appeal Rights information label')

      itHasAnEditable('program code label', 'Appeal Rights program code label')

      itHasAnEditable('program code value', 'Appeal Rights program code value')

      itHasAnEditable('claim date label', 'Appeal Rights claim date label')

      itHasAnEditable('claim date value', 'Appeal Rights claim date value')

      itHasAnEditable('determination date label', 'Appeal Rights determination date label')

      itHasAnEditable('determination date value', 'Appeal Rights determination date value')

      it('only has the correct fields', () => {
        const all = rendered.baseElement.querySelectorAll('[aria-label]')
        expect(all).toHaveLength(11)
      })
    })
  })
})
