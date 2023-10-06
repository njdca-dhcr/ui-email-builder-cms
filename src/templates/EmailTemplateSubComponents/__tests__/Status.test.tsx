import React, { FC } from 'react'
import userEvent, { UserEvent } from '@testing-library/user-event'
import { RenderResult, render } from '@testing-library/react'
import { EmailTemplate } from 'src/appTypes'
import { faker } from '@faker-js/faker'
import {
  WrapperComponent,
  buildEmailTemplateSubComponent,
  emailPartWrapper,
  expectActiveEmailPartToBe,
  expectActiveEmailPartToNotBe,
  expectEmailPartContentFor,
  renderEmailPart,
} from 'src/testHelpers'
import { buildSubComponentKey } from 'src/utils/emailPartKeys'
import {
  EmailPartsContent,
  useEmailPartsContentForSubComponent,
} from 'src/templates/EmailPartsContent'
import { Status, StatusVariant, defaultValue } from '../Status'

describe('Status', () => {
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

  it('has an editable title', async () => {
    rendered = render(
      <Status componentId={componentId} id={id} emailSubComponent={emailSubComponent} />,
      { wrapper: emailPartWrapper },
    )
    await clearAndFillWithValue('Status title')
    expect(rendered.queryByText(value)).not.toBeNull()
    expectEmailPartContentFor(key, rendered.baseElement)
  })

  it('has an editable description', async () => {
    rendered = render(
      <Status componentId={componentId} id={id} emailSubComponent={emailSubComponent} />,
      { wrapper: emailPartWrapper },
    )
    await clearAndFillWithValue('Status description')
    expect(rendered.queryByText(value)).not.toBeNull()
    expectEmailPartContentFor(key, rendered.baseElement)
  })

  it('activates when clicked', async () => {
    rendered = render(
      <Status componentId={componentId} id={id} emailSubComponent={emailSubComponent} />,
      { wrapper: emailPartWrapper },
    )
    const { getByLabelText, baseElement } = rendered
    expectActiveEmailPartToNotBe(key, baseElement)
    await user.click(getByLabelText('Status title'))
    expectActiveEmailPartToBe(key, baseElement)
  })

  describe('variants', () => {
    const VariantSelect: FC = () => {
      const [value, setValue] = useEmailPartsContentForSubComponent(componentId, id, defaultValue)
      return (
        <label>
          Variant
          <select
            onChange={(event) => setValue({ ...value, variant: parseInt(event.target.value) })}
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
          <Status componentId={componentId} id={id} emailSubComponent={emailSubComponent} />,
          <VariantSelect />,
        )
        await user.selectOptions(rendered.getByLabelText('Variant'), StatusVariant.Overview + '')
      })

      it('has an editable title', async () => {
        await clearAndFillWithValue('Status title')
        expect(rendered.queryByText(value)).not.toBeNull()
        expectEmailPartContentFor(key, rendered.baseElement)
      })

      it('has an editable description', async () => {
        await clearAndFillWithValue('Status description')
        expect(rendered.queryByText(value)).not.toBeNull()
        expectEmailPartContentFor(key, rendered.baseElement)
      })

      it('has an editable supportive information', async () => {
        await clearAndFillWithValue('Status supportive information')
        expect(rendered.queryByText(value)).not.toBeNull()
        expectEmailPartContentFor(key, rendered.baseElement)
      })

      it('lacks an editable connector', async () => {
        expect(rendered.queryByLabelText('Status connector ("because", etc)')).toBeNull()
      })
    })

    describe('Overview w/ Reason', () => {
      beforeEach(async () => {
        rendered = renderEmailPart(
          <Status componentId={componentId} id={id} emailSubComponent={emailSubComponent} />,
          <VariantSelect />,
        )
        await user.selectOptions(
          rendered.getByLabelText('Variant'),
          StatusVariant.OverviewWithReason + '',
        )
      })

      it('has an editable title', async () => {
        await clearAndFillWithValue('Status title')
        expect(rendered.queryByText(value)).not.toBeNull()
        expectEmailPartContentFor(key, rendered.baseElement)
      })

      it('has an editable description', async () => {
        await clearAndFillWithValue('Status description')
        expect(rendered.queryByText(value)).not.toBeNull()
        expectEmailPartContentFor(key, rendered.baseElement)
      })

      it('has an editable supportive information', async () => {
        await clearAndFillWithValue('Status supportive information')
        expect(rendered.queryByText(value)).not.toBeNull()
        expectEmailPartContentFor(key, rendered.baseElement)
      })

      it('has an editable connector', async () => {
        await clearAndFillWithValue('Status connector ("because", etc)')
        expect(rendered.queryByText(value)).not.toBeNull()
        expectEmailPartContentFor(key, rendered.baseElement)
      })
    })
  })
})
