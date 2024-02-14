import { faker } from '@faker-js/faker'
import { render } from '@testing-library/react'
import React, { FC } from 'react'
import { ShouldShowEmailPart, useShouldShowEmailPart } from '../ShouldShowEmailPart'
import userEvent from '@testing-library/user-event'

describe('ShouldShowEmailPart', () => {
  it('displays its children', () => {
    const text = faker.lorem.paragraph()
    const { baseElement } = render(
      <ShouldShowEmailPart>
        <span>{text}</span>
      </ShouldShowEmailPart>,
    )
    expect(baseElement).toContainHTML(`<span>${text}</span>`)
  })

  const Dummy: FC<{ id: string }> = ({ id }) => {
    const shouldShow = useShouldShowEmailPart(id)
    return (
      <div>
        {shouldShow.on ? 'on' : 'off'}
        <button onClick={shouldShow.toggle}>toggle</button>
      </div>
    )
  }

  it('toggle parts on and off', async () => {
    const user = userEvent.setup()
    const { getByRole, baseElement } = render(
      <ShouldShowEmailPart>
        <Dummy id={faker.lorem.word()} />
      </ShouldShowEmailPart>,
    )

    expect(baseElement).toHaveTextContent('on')
    expect(baseElement).not.toHaveTextContent('off')

    await user.click(getByRole('button'))
    expect(baseElement).not.toHaveTextContent('on')
    expect(baseElement).toHaveTextContent('off')

    await user.click(getByRole('button'))
    expect(baseElement).toHaveTextContent('on')
    expect(baseElement).not.toHaveTextContent('off')
  })

  it('accepts initial data', () => {
    const id = faker.lorem.word()
    const { baseElement } = render(
      <ShouldShowEmailPart initialData={{ [id]: false }}>
        <Dummy id={id} />
      </ShouldShowEmailPart>,
    )

    expect(baseElement).not.toHaveTextContent('on')
    expect(baseElement).toHaveTextContent('off')
  })
})
