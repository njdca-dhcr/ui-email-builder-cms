import React from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { faker } from '@faker-js/faker'
import { IntroInput, TEST_ID } from '../IntroInput'
import { EmailCopyData } from '../../emailForm/EmailCopyData'

describe('IntroInput', () => {
  let copyId: string
  let description: string
  let value: string

  beforeEach(() => {
    copyId = '12'
    description = faker.lorem.paragraph()
    value = faker.lorem.words(3)
  })

  it('has an input', () => {
    const { getByLabelText } = render(
      <EmailCopyData initialData={{ [copyId]: value }}>
        <IntroInput copyId={copyId} description={description} />
      </EmailCopyData>,
    )
    const input: HTMLInputElement = getByLabelText('Intro') as any
    expect(input.tagName).toEqual('INPUT')
    expect(input.type).toEqual('text')
    expect(input.name).toEqual('intro')
    expect(input.value).toEqual(value)
    expect(input.onchange).toBeDefined()
  })

  it('handles changes to the input', async () => {
    const newValue = faker.lorem.word()
    const user = userEvent.setup()

    const { getByLabelText } = render(
      <EmailCopyData initialData={{ [copyId]: value }}>
        <IntroInput copyId={copyId} description={description} />
      </EmailCopyData>,
    )

    const input: HTMLInputElement = getByLabelText('Intro') as any
    expect(input.value).toEqual(value)
    await user.type(input, newValue)
    expect(input.value).toEqual(`${value}${newValue}`)
  })

  it('displays the description', () => {
    const description = faker.lorem.paragraph()
    const { getByTestId } = render(
      <EmailCopyData initialData={{ [copyId]: value }}>
        <IntroInput copyId={copyId} description={description} />
      </EmailCopyData>,
    )
    expect(getByTestId(TEST_ID)).toHaveTextContent(description)
  })
})
