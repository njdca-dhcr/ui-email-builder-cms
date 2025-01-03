import { RenderResult, render } from '@testing-library/react'
import userEvent, { UserEvent } from '@testing-library/user-event'
import React, { FC, useState } from 'react'
import { EditableReceipt, ReceiptLineItem } from '../EditableReceipt'
import { faker } from '@faker-js/faker'
import times from 'lodash.times'

describe('EditableReceipt', () => {
  let rendered: RenderResult
  let user: UserEvent
  let value: string

  const Dummy: FC<{ numberOfLineItems: number; readOnly?: boolean }> = ({
    numberOfLineItems,
    readOnly,
  }) => {
    const [lineItems, setLineItems] = useState<ReceiptLineItem[]>(
      times(numberOfLineItems, () => ({ label: faker.lorem.word(), value: faker.lorem.word() })),
    )
    const [total, setTotal] = useState<ReceiptLineItem>({
      label: faker.lorem.word(),
      value: faker.lorem.word(),
    })

    return (
      <EditableReceipt
        readOnly={readOnly}
        lineItems={lineItems}
        total={total}
        onLineItemChange={(index, part, newValue) => {
          setLineItems(
            lineItems.map((lineItem, i) =>
              index === i ? { ...lineItem, [part]: newValue } : lineItem,
            ),
          )
        }}
        onTotalChange={(part, newValue) => {
          setTotal({ ...total, [part]: newValue })
        }}
      />
    )
  }

  const clearAndFillWithValue = async (label: string) => {
    const element = rendered.getByLabelText(label)
    await user.clear(element)
    await user.type(element, value)
  }

  const itHasAnEditable = (testName: string, label: string) => {
    it(`has an editable ${testName}`, async () => {
      await clearAndFillWithValue(label)
      expect(rendered.queryByText(value)).not.toBeNull()
    })
  }

  beforeEach(() => {
    user = userEvent.setup()
    value = faker.lorem.words(2)
  })

  it('can be read only', async () => {
    const { baseElement } = render(<Dummy numberOfLineItems={2} readOnly />)
    expect(baseElement.querySelectorAll('[aria-label]')).toHaveLength(6)
    expect(baseElement.querySelectorAll('[readonly]')).toHaveLength(6)
  })

  describe('with 2 line items', () => {
    beforeEach(() => {
      rendered = render(<Dummy numberOfLineItems={2} />)
    })

    itHasAnEditable('line item label 1', 'Line item label 1')

    itHasAnEditable('line item label 2', 'Line item label 2')

    itHasAnEditable('line item value 1', 'Line item value 1')

    itHasAnEditable('line item value 2', 'Line item value 2')

    itHasAnEditable('total label', 'Total label')

    itHasAnEditable('total value', 'Total value')
  })

  describe('with 3 line items', () => {
    beforeEach(() => {
      rendered = render(<Dummy numberOfLineItems={3} />)
    })

    itHasAnEditable('line item label 1', 'Line item label 1')

    itHasAnEditable('line item value 1', 'Line item value 1')

    itHasAnEditable('line item label 2', 'Line item label 2')

    itHasAnEditable('line item value 2', 'Line item value 2')

    itHasAnEditable('line item label 3', 'Line item label 3')

    itHasAnEditable('line item value 3', 'Line item value 3')

    itHasAnEditable('total label', 'Total label')

    itHasAnEditable('total value', 'Total value')
  })
})
