import React, { FC } from 'react'
import userEvent, { UserEvent } from '@testing-library/user-event'
import { RenderResult, render } from '@testing-library/react'
import { EmailTemplate } from 'src/appTypes'
import { faker } from '@faker-js/faker'
import {
  buildEmailTemplateSubComponent,
  emailPartWrapper,
  expectActiveEmailPartToBe,
  expectActiveEmailPartToNotBe,
  expectEmailPartContentFor,
  renderEmailPart,
} from 'src/testHelpers'
import { buildSubComponentKey } from 'src/utils/emailPartKeys'
import { Directive, DirectiveVariant, useDirectiveValue } from '../Directive'

describe('Directive', () => {
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
    emailSubComponent = buildEmailTemplateSubComponent('Body', { kind: 'Status' })
    user = userEvent.setup()
    value = faker.lorem.words(4)
  })

  // it('activates when clicked', async () => {
  //   rendered = render(
  //     <Directive componentId={componentId} id={id} emailSubComponent={emailSubComponent} />,
  //     { wrapper: emailPartWrapper },
  //   )
  //   const { getByLabelText, baseElement } = rendered
  //   expectActiveEmailPartToNotBe(key, baseElement)
  //   await user.click(getByLabelText('Directive Title'))
  //   expectActiveEmailPartToBe(key, baseElement)
  // })

  describe('default - One Step', () => {
    it('has an editable title', async () => {
      rendered = render(
        <Directive componentId={componentId} id={id} emailSubComponent={emailSubComponent} />,
        { wrapper: emailPartWrapper },
      )
      await clearAndFillWithValue('Directive Title')
      expect(rendered.queryByText(value)).not.toBeNull()
      expectEmailPartContentFor(key, rendered.baseElement)
    })

    it('has an editable supportive information', async () => {
      rendered = render(
        <Directive componentId={componentId} id={id} emailSubComponent={emailSubComponent} />,
        { wrapper: emailPartWrapper },
      )
      await clearAndFillWithValue('Supportive information')
      expect(rendered.queryByText(value)).not.toBeNull()
      expectEmailPartContentFor(key, rendered.baseElement)
    })
  })
  describe('variants', () => {
    const VariantSelect: FC = () => {
      const [value, setValue] = useDirectiveValue(componentId, id)
      return (
        <label>
          Variant
          <select
            onChange={(event) => setValue({ ...value, variant: parseInt(event.target.value) })}
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
        expectEmailPartContentFor(key, rendered.baseElement)
      })
    }

    describe('Three Steps', () => {
      beforeEach(async () => {
        rendered = renderEmailPart(
          <Directive componentId={componentId} id={id} emailSubComponent={emailSubComponent} />,
          <VariantSelect />,
        )
        await user.selectOptions(
          rendered.getByLabelText('Variant'),
          DirectiveVariant.ThreeStep + '',
        )
      })

      itHasAnEditable('step 1 label', 'Label for Step 1')

      itHasAnEditable('step 1 additional information', 'Additional information for Step 1')

      itHasAnEditable('step 2 label', 'Label for Step 2')

      itHasAnEditable('step 2 additional information', 'Additional information for Step 2')

      itHasAnEditable('step 3 label', 'Label for Step 3')

      itHasAnEditable('step 3 additional information', 'Additional information for Step 3')

      // it('only has the correct fields', () => {
      //   const all = rendered.baseElement.querySelectorAll('[aria-label]')
      //   expect(all).toHaveLength(8)
      // })
    })

    describe('Three Steps w/ Step 2 Expansion', () => {
      beforeEach(async () => {
        rendered = renderEmailPart(
          <Directive componentId={componentId} id={id} emailSubComponent={emailSubComponent} />,
          <VariantSelect />,
        )
        await user.selectOptions(
          rendered.getByLabelText('Variant'),
          DirectiveVariant.StepTwoExpansion + '',
        )
      })

      itHasAnEditable('step 1 label', 'Label for Step 1')

      itHasAnEditable('step 1 additional information', 'Additional information for Step 1')

      itHasAnEditable('step 2 label', 'Label for Step 2')

      itHasAnEditable('step 2 additional information', 'Additional information for Step 2')

      itHasAnEditable('Step 2 tertiary content', 'Tertiary information for Step 2')

      itHasAnEditable('Step 2 case number information', 'Case number information')

      itHasAnEditable('step 3 label', 'Label for Step 3')

      itHasAnEditable('step 3 additional information', 'Additional information for Step 3')
    })

    describe('Pay Online', () => {
      beforeEach(async () => {
        rendered = renderEmailPart(
          <Directive componentId={componentId} id={id} emailSubComponent={emailSubComponent} />,
          <VariantSelect />,
        )
        await user.selectOptions(
          rendered.getByLabelText('Variant'),
          DirectiveVariant.PayOnline + '',
        )
      })

      itHasAnEditable('alternative payment information', 'Alternative payment information')

      itHasAnEditable('supportive information', 'Alternative payment information')
    })
  })
})
