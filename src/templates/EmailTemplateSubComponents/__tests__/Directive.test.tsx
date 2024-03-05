import React, { FC } from 'react'
import userEvent, { UserEvent } from '@testing-library/user-event'
import { RenderResult, render } from '@testing-library/react'
import { DirectiveVariant, EmailTemplate } from 'src/appTypes'
import { faker } from '@faker-js/faker'
import {
  buildUniqueEmailSubComponent,
  emailPartWrapper,
  expectActiveEmailPartToBe,
  expectActiveEmailPartToNotBe,
  expectEmailPartContentFor,
  renderEmailPart,
} from 'src/testHelpers'
import { Directive, useDirectiveValue } from '../Directive'
import { TEST_ID as richTextEditorTestId } from 'src/ui/RichTextEditor'

describe('Directive', () => {
  let value: string
  let emailSubComponent: EmailTemplate.Directive
  let user: UserEvent
  let rendered: RenderResult
  let key: string

  const clearAndFillWithValue = async (label: string) => {
    const element = rendered.getByLabelText(label)
    await user.clear(element)
    await user.type(element, value)
  }

  beforeEach(() => {
    emailSubComponent = buildUniqueEmailSubComponent('Body', { kind: 'Directive' })
    key = emailSubComponent.id
    user = userEvent.setup()
    value = faker.lorem.words(4)
  })

  it('activates when clicked', async () => {
    rendered = render(<Directive emailSubComponent={emailSubComponent} />, {
      wrapper: emailPartWrapper,
    })
    const { getByLabelText, baseElement } = rendered
    expectActiveEmailPartToNotBe(key, baseElement)
    await user.click(getByLabelText('Directive Title'))
    expectActiveEmailPartToBe(key, baseElement)
  })

  describe('variants', () => {
    const VariantSelect: FC = () => {
      const [value, setValue] = useDirectiveValue(emailSubComponent)
      return (
        <label>
          Variant
          <select
            onChange={(event) => setValue({ ...value, variant: event.target.value as any })}
            value={value.variant}
          >
            <option>{DirectiveVariant.OneStep}</option>
            <option>{DirectiveVariant.ThreeStep}</option>
            <option>{DirectiveVariant.StepTwoExpansion}</option>
            <option>{DirectiveVariant.PayOnline}</option>
          </select>
        </label>
      )
    }

    const itHasAnEditable = (testName: string, label: string) => {
      it(`has an editable ${testName}`, async () => {
        await clearAndFillWithValue(label)
        expect(rendered.queryByText(value)).not.toBeNull()
        expectEmailPartContentFor(emailSubComponent.id, rendered.baseElement)
      })
    }

    const itHasAnEditableRichText = (testName: string, label: string) => {
      it(`has an editable ${testName}`, async () => {
        const input = rendered.getByLabelText(label)
        await user.click(input)
        expect(rendered.queryByTestId(richTextEditorTestId)).not.toBeNull()
      })
    }

    describe('One Step', () => {
      beforeEach(async () => {
        rendered = renderEmailPart(
          <Directive emailSubComponent={emailSubComponent} />,
          <VariantSelect />,
        )
        await user.selectOptions(rendered.getByLabelText('Variant'), DirectiveVariant.OneStep + '')
      })

      itHasAnEditable('directive title', 'Directive Title')

      itHasAnEditable('directive button', 'Directive Button')

      itHasAnEditable('directive link', 'Directive Link')

      itHasAnEditableRichText('supportive information', 'Supportive information')

      it('only has the correct fields', () => {
        const all = rendered.baseElement.querySelectorAll('[aria-label]')
        expect(all).toHaveLength(4)
      })
    })

    describe('Three Steps', () => {
      beforeEach(async () => {
        rendered = renderEmailPart(
          <Directive emailSubComponent={emailSubComponent} />,
          <VariantSelect />,
        )
        await user.selectOptions(
          rendered.getByLabelText('Variant'),
          DirectiveVariant.ThreeStep + '',
        )
      })

      itHasAnEditableRichText('label for the directive', 'Label for the Directive')

      itHasAnEditable('directive button', 'Directive Button')

      itHasAnEditable('directive link', 'Directive Link')

      itHasAnEditable('step 1 label', 'Label for Step 1')

      itHasAnEditableRichText('step 1 additional information', 'Additional information for Step 1')

      itHasAnEditable('step 2 label', 'Label for Step 2')

      itHasAnEditableRichText('step 2 additional information', 'Additional information for Step 2')

      itHasAnEditable('step 3 label', 'Label for Step 3')

      itHasAnEditableRichText('step 3 additional information', 'Additional information for Step 3')

      it('only has the correct fields', () => {
        const all = rendered.baseElement.querySelectorAll('[aria-label]')
        expect(all).toHaveLength(10)
      })
    })

    describe('Three Steps w/ Step 2 Expansion', () => {
      beforeEach(async () => {
        rendered = renderEmailPart(
          <Directive emailSubComponent={emailSubComponent} />,
          <VariantSelect />,
        )
        await user.selectOptions(
          rendered.getByLabelText('Variant'),
          DirectiveVariant.StepTwoExpansion + '',
        )
      })

      itHasAnEditableRichText('label for the directive', 'Label for the Directive')

      itHasAnEditable('directive button', 'Directive Button')

      itHasAnEditable('directive link', 'Directive Link')

      itHasAnEditable('step 1 label', 'Label for Step 1')

      itHasAnEditableRichText('step 1 additional information', 'Additional information for Step 1')

      itHasAnEditable('step 2 label', 'Label for Step 2')

      itHasAnEditableRichText('step 2 additional information', 'Additional information for Step 2')

      itHasAnEditableRichText('Step 2 tertiary content', 'Tertiary information for Step 2')

      itHasAnEditableRichText('Step 2 case number information', 'Case number information')

      itHasAnEditable('step 3 label', 'Label for Step 3')

      itHasAnEditableRichText('step 3 additional information', 'Additional information for Step 3')

      it('only has the correct fields', () => {
        const all = rendered.baseElement.querySelectorAll('[aria-label]')
        expect(all).toHaveLength(12)
      })
    })

    describe('Pay Online', () => {
      beforeEach(async () => {
        rendered = renderEmailPart(
          <Directive emailSubComponent={emailSubComponent} />,
          <VariantSelect />,
        )
        await user.selectOptions(
          rendered.getByLabelText('Variant'),
          DirectiveVariant.PayOnline + '',
        )
      })

      itHasAnEditable('directive button', 'Directive Button')

      itHasAnEditable('directive link', 'Directive Link')

      itHasAnEditable('alternative payment information', 'Alternative payment information')

      itHasAnEditable('alternative payment information', 'Alternative payment information')

      itHasAnEditableRichText('supportive information', 'Supportive information')

      it('only has the correct fields', () => {
        const all = rendered.baseElement.querySelectorAll('[aria-label]')
        expect(all).toHaveLength(4)
      })
    })
  })
})
