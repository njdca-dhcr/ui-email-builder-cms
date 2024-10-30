import React, { FC } from 'react'
import { SupplementalContent, useSupplementalContentValue } from '../SupplementalContent'
import userEvent, { UserEvent } from '@testing-library/user-event'
import { RenderResult, render } from '@testing-library/react'
import { EmailTemplate, SupplementalContentVariant } from 'src/appTypes'
import { faker } from '@faker-js/faker'
import {
  buildUniqueEmailSubComponent,
  emailPartWrapper,
  expectActiveEmailPartToBe,
  expectActiveEmailPartToNotBe,
  expectEmailPartContentFor,
  renderEmailPart,
} from 'src/testHelpers'
import { RICH_TEXT_EDITOR_TEST_ID as richTextEditorTestId } from 'src/ui'

describe('SupplementalContent', () => {
  let value: string
  let emailSubComponent: EmailTemplate.SupplementalContent
  let user: UserEvent
  let rendered: RenderResult
  let key: string

  const clearAndFillWithValue = async (label: string) => {
    const element = rendered.getByLabelText(label)
    await user.clear(element)
    await user.type(element, value)
  }

  beforeEach(() => {
    emailSubComponent = buildUniqueEmailSubComponent({ kind: 'SupplementalContent' })
    key = emailSubComponent.id
    user = userEvent.setup()
    value = faker.lorem.words(4)
  })

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

  it('activates when clicked', async () => {
    rendered = render(<SupplementalContent emailSubComponent={emailSubComponent} />, {
      wrapper: emailPartWrapper,
    })
    const { getByLabelText, baseElement } = rendered
    expectActiveEmailPartToNotBe(key, baseElement)
    await user.click(getByLabelText('Supplemental content title'))
    expectActiveEmailPartToBe(key, baseElement)
  })

  describe('variants', () => {
    const VariantSelect: FC = () => {
      const [value, setValue] = useSupplementalContentValue(emailSubComponent)
      return (
        <label>
          Variant
          <select
            onChange={(event) => setValue({ ...value, variant: event.target.value as any })}
            value={value.variant}
          >
            <option>{SupplementalContentVariant.BenefitAmount}</option>
            <option>{SupplementalContentVariant.SingleSupplementalContent}</option>
            <option>{SupplementalContentVariant.DoubleSupplementalContent}</option>
            <option>{SupplementalContentVariant.TripleSupplementalContent}</option>
          </select>
        </label>
      )
    }

    describe('Single Supplemental Content', () => {
      beforeEach(async () => {
        rendered = renderEmailPart(
          <SupplementalContent emailSubComponent={emailSubComponent} />,
          <VariantSelect />,
        )
        await user.selectOptions(
          rendered.getByLabelText('Variant'),
          SupplementalContentVariant.SingleSupplementalContent,
        )
      })

      itHasAnEditable('title', 'Supplemental content title')

      itHasAnEditableRichText('description', 'Supplemental content description')

      it('only has the correct fields', () => {
        const all = rendered.baseElement.querySelectorAll('[aria-label]')
        expect(all).toHaveLength(2)
      })
    })

    describe('Double Supplemental Content', () => {
      beforeEach(async () => {
        rendered = renderEmailPart(
          <SupplementalContent emailSubComponent={emailSubComponent} />,
          <VariantSelect />,
        )
        await user.selectOptions(
          rendered.getByLabelText('Variant'),
          SupplementalContentVariant.DoubleSupplementalContent,
        )
      })

      itHasAnEditable('title', 'Supplemental content title')

      itHasAnEditableRichText('description', 'Supplemental content description')

      itHasAnEditable('second title', 'Supplemental content title 2')

      itHasAnEditableRichText('second description', 'Supplemental content description 2')

      it('only has the correct fields', () => {
        const all = rendered.baseElement.querySelectorAll('[aria-label]')
        expect(all).toHaveLength(4)
      })
    })

    describe('Triple Supplemental Content', () => {
      beforeEach(async () => {
        rendered = renderEmailPart(
          <SupplementalContent emailSubComponent={emailSubComponent} />,
          <VariantSelect />,
        )
        await user.selectOptions(
          rendered.getByLabelText('Variant'),
          SupplementalContentVariant.TripleSupplementalContent,
        )
      })

      itHasAnEditable('title', 'Supplemental content title')

      itHasAnEditableRichText('description', 'Supplemental content description')

      itHasAnEditable('second title', 'Supplemental content title 2')

      itHasAnEditableRichText('second description', 'Supplemental content description 2')

      itHasAnEditable('third title', 'Supplemental content title 3')

      itHasAnEditableRichText('third description', 'Supplemental content description 3')

      it('only has the correct fields', () => {
        const all = rendered.baseElement.querySelectorAll('[aria-label]')
        expect(all).toHaveLength(6)
      })
    })

    describe('Benefit Amount', () => {
      beforeEach(async () => {
        rendered = renderEmailPart(
          <SupplementalContent emailSubComponent={emailSubComponent} />,
          <VariantSelect />,
        )
        await user.selectOptions(
          rendered.getByLabelText('Variant'),
          SupplementalContentVariant.BenefitAmount,
        )
      })

      itHasAnEditable('benefit amount title', 'Benefit amount title')

      itHasAnEditableRichText('benefit amount description', 'Benefit amount description')

      itHasAnEditable('box title', 'Benefit amount box title')

      itHasAnEditableRichText('main box copy', 'Benefit amount box copy')

      itHasAnEditableRichText('supplemental box copy', 'Benefit amount supplemental box copy')

      itHasAnEditableRichText('supportive information', 'Benefit amount box supportive information')

      itHasAnEditable('title', 'Supplemental content title')

      itHasAnEditableRichText('description', 'Supplemental content description')

      it('only has the correct fields', () => {
        const all = rendered.baseElement.querySelectorAll('[aria-label]')
        expect(all).toHaveLength(8)
      })
    })
  })
})
