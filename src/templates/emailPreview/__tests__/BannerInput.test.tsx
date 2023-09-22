import React from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { faker } from '@faker-js/faker'
import { BannerInput, TEST_ID } from '../BannerInput'
import { EmailCopyData } from '../../emailForm/EmailCopyData'

describe('BannerInput', () => {
  let copyId: string
  let description: string
  let value: any

  beforeEach(() => {
    copyId = '12'
    description = faker.lorem.paragraph()
    value = { banner1: faker.lorem.words(3), banner2: faker.lorem.words(3) }
  })

  it('has inputs', () => {
    const { getByLabelText } = render(
      <EmailCopyData initialData={{ [copyId]: value }}>
        <BannerInput copyId={copyId} description={description} />
      </EmailCopyData>,
    )
    const input1: HTMLInputElement = getByLabelText('Banner 1') as any
    expect(input1.tagName).toEqual('INPUT')
    expect(input1.type).toEqual('text')
    expect(input1.name).toEqual('banner1')
    expect(input1.value).toEqual(value.banner1)
    expect(input1.onchange).toBeDefined()

    const input2: HTMLInputElement = getByLabelText('Banner 2') as any
    expect(input2.tagName).toEqual('INPUT')
    expect(input2.type).toEqual('text')
    expect(input2.name).toEqual('banner2')
    expect(input2.value).toEqual(value.banner2)
    expect(input2.onchange).toBeDefined()
  })

  it('handles changes to the input', async () => {
    const newValue = faker.lorem.word()
    const user = userEvent.setup()

    const { getByLabelText } = render(
      <EmailCopyData initialData={{ [copyId]: value }}>
        <BannerInput copyId={copyId} description={description} />
      </EmailCopyData>,
    )

    const input1: HTMLInputElement = getByLabelText('Banner 1') as any
    expect(input1.value).toEqual(value.banner1)
    await user.type(input1, newValue)
    expect(input1.value).toEqual(`${value.banner1}${newValue}`)

    const input2: HTMLInputElement = getByLabelText('Banner 2') as any
    expect(input2.value).toEqual(value.banner2)
    await user.type(input2, newValue)
    expect(input2.value).toEqual(`${value.banner2}${newValue}`)
  })

  it('displays the description', () => {
    const description = faker.lorem.paragraph()
    const { getByTestId } = render(
      <EmailCopyData initialData={{ [copyId]: value }}>
        <BannerInput copyId={copyId} description={description} />
      </EmailCopyData>,
    )
    expect(getByTestId(TEST_ID)).toHaveTextContent(description)
  })
})
