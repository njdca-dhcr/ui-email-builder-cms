import React, { FC } from 'react'
import userEvent, { UserEvent } from '@testing-library/user-event'
import { RenderResult, render } from '@testing-library/react'
import { EmailTemplate, StatusVariant } from 'src/appTypes'
import { faker } from '@faker-js/faker'
import {
  buildUniqueEmailSubComponent,
  emailPartWrapper,
  expectActiveEmailPartToBe,
  expectActiveEmailPartToNotBe,
  expectEmailPartContentFor,
  renderEmailPart,
} from 'src/testHelpers'
import { Status, useStatusValue } from '../Status'
import { VisibilityToggle } from 'src/ui/VisibilityToggle'
import { TEST_ID as richTextEditorTestId } from 'src/ui/RichTextEditor'

describe('Status', () => {
  let value: string
  let emailSubComponent: EmailTemplate.Status
  let user: UserEvent
  let rendered: RenderResult
  let key: string

  const clearAndFillWithValue = async (label: string) => {
    const element = rendered.getByLabelText(label)
    await user.clear(element)
    await user.type(element, value)
  }

  const ToggleSupportiveInformation: FC = () => {
    const [value, setValue] = useStatusValue(emailSubComponent)
    return (
      <label>
        toggle
        <VisibilityToggle
          id=""
          onChange={(showSupportiveInformation) =>
            setValue({ ...value, showSupportiveInformation })
          }
          value={value.showSupportiveInformation}
        />
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

  beforeEach(() => {
    emailSubComponent = buildUniqueEmailSubComponent('Body', { kind: 'Status' })
    key = emailSubComponent.id
    user = userEvent.setup()
    value = faker.lorem.words(4)
  })

  it('only displays supportive information when it is toggled on', async () => {
    const { getByLabelText, queryByLabelText } = renderEmailPart(
      <Status emailSubComponent={emailSubComponent} />,
      <ToggleSupportiveInformation />,
    )
    expect(queryByLabelText('Status supportive information')).not.toBeNull()
    await user.click(getByLabelText('toggle'))
    expect(queryByLabelText('Status supportive information')).toBeNull()
    await user.click(getByLabelText('toggle'))
    expect(queryByLabelText('Status supportive information')).not.toBeNull()
  })

  it('activates when clicked', async () => {
    rendered = render(<Status emailSubComponent={emailSubComponent} />, {
      wrapper: emailPartWrapper,
    })
    const { getByLabelText, baseElement } = rendered
    expectActiveEmailPartToNotBe(key, baseElement)
    await user.click(getByLabelText('Status title'))
    expectActiveEmailPartToBe(key, baseElement)
  })

  describe('variants', () => {
    const VariantSelect: FC = () => {
      const [value, setValue] = useStatusValue(emailSubComponent)
      return (
        <label>
          Variant
          <select
            onChange={(event) => setValue({ ...value, variant: event.target.value as any })}
            value={value.variant}
          >
            <option>{StatusVariant.Overview}</option>
            <option>{StatusVariant.OverviewWithReason}</option>
            <option>{StatusVariant.MissingDocument}</option>
            <option>{StatusVariant.OverviewWithReasonAndAmountDue}</option>
            <option>{StatusVariant.OverviewWithReasonAndAmountBreakdown}</option>
          </select>
        </label>
      )
    }

    describe('Overview', () => {
      beforeEach(async () => {
        rendered = renderEmailPart(
          <Status emailSubComponent={emailSubComponent} />,
          <VariantSelect />,
        )
        await user.selectOptions(rendered.getByLabelText('Variant'), StatusVariant.Overview)
      })

      itHasAnEditable('title', 'Status title')

      itHasAnEditableRichText('description', 'Status description')

      itHasAnEditableRichText('supportive information', 'Status supportive information')

      it('only has the correct fields', () => {
        const all = rendered.baseElement.querySelectorAll('[aria-label]')
        expect(all).toHaveLength(3)
      })
    })

    describe('Overview w/ Reason', () => {
      beforeEach(async () => {
        rendered = renderEmailPart(
          <Status emailSubComponent={emailSubComponent} />,
          <VariantSelect />,
        )
        await user.selectOptions(
          rendered.getByLabelText('Variant'),
          StatusVariant.OverviewWithReason,
        )
      })

      itHasAnEditable('title', 'Status title')

      itHasAnEditableRichText('description', 'Status description')

      itHasAnEditableRichText('supportive information', 'Status supportive information')

      itHasAnEditable('status due to', 'Status due to label')

      it('only has the correct fields', () => {
        const all = rendered.baseElement.querySelectorAll('[aria-label]')
        expect(all).toHaveLength(4)
      })
    })

    describe('Missing Document', () => {
      beforeEach(async () => {
        rendered = renderEmailPart(
          <Status emailSubComponent={emailSubComponent} />,
          <VariantSelect />,
        )
        await user.selectOptions(rendered.getByLabelText('Variant'), StatusVariant.MissingDocument)
      })

      itHasAnEditable('title', 'Status title')

      itHasAnEditable('documents needed label', 'Documents needed label')

      itHasAnEditable('documents needed value', 'Documents needed value')

      itHasAnEditableRichText('supportive information', 'Status supportive information')

      itHasAnEditable('email to label', 'Email to label')

      itHasAnEditable('email to value', 'Email to value')

      itHasAnEditable('subject line label', 'Subject line label')

      itHasAnEditable('subject line value', 'Subject line value')

      itHasAnEditable('missing document deadline', 'Status deadline description')

      it('only has the correct fields', () => {
        const all = rendered.baseElement.querySelectorAll('[aria-label]')
        expect(all).toHaveLength(9)
      })
    })

    describe('Overview w/ Reason + Amount Due', () => {
      beforeEach(async () => {
        rendered = renderEmailPart(
          <Status emailSubComponent={emailSubComponent} />,
          <VariantSelect />,
        )
        await user.selectOptions(
          rendered.getByLabelText('Variant'),
          StatusVariant.OverviewWithReasonAndAmountDue,
        )
      })

      itHasAnEditable('title', 'Status title')

      itHasAnEditableRichText('description', 'Status description')

      itHasAnEditableRichText('supportive information', 'Status supportive information')

      itHasAnEditable('status due to', 'Status due to label')

      itHasAnEditable('amount label', 'Amount label')

      it('only has the correct fields', () => {
        const all = rendered.baseElement.querySelectorAll('[aria-label]')
        expect(all).toHaveLength(5)
      })
    })

    describe('Overview w/ Reason + Amount Breakdown', () => {
      beforeEach(async () => {
        rendered = renderEmailPart(
          <Status emailSubComponent={emailSubComponent} />,
          <VariantSelect />,
        )
        await user.selectOptions(
          rendered.getByLabelText('Variant'),
          StatusVariant.OverviewWithReasonAndAmountBreakdown,
        )
      })

      itHasAnEditable('title', 'Status title')

      itHasAnEditableRichText('description', 'Status description')

      itHasAnEditableRichText('supportive information', 'Status supportive information')

      itHasAnEditable('status due to', 'Status due to label')

      itHasAnEditable('amount label', 'Amount label')

      itHasAnEditable('line item label 1', 'Line item label 1')

      itHasAnEditable('line item label 2', 'Line item label 2')

      itHasAnEditable('line item value 1', 'Line item value 1')

      itHasAnEditable('line item value 2', 'Line item value 2')

      itHasAnEditable('total label', 'Total label')

      itHasAnEditable('total value', 'Total value')

      it('only has the correct fields', () => {
        const all = rendered.baseElement.querySelectorAll('[aria-label]')
        expect(all).toHaveLength(11)
      })
    })
  })
})
