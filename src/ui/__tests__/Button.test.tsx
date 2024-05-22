import React from 'react'
import { Button, Props } from '../Button'
import { render } from '@testing-library/react'
import { faker } from '@faker-js/faker'
import userEvent from '@testing-library/user-event'

describe('Button', () => {
  const renderButton = (props: Partial<Props>) => {
    return render(<Button {...props} />)
  }

  it('is a button', () => {
    const { queryByRole } = renderButton({})
    expect(queryByRole('button')).not.toBeNull()
  })

  it('displays children', () => {
    const text = faker.lorem.paragraph()
    const { baseElement } = renderButton({
      children: <p>{text}</p>,
    })
    expect(baseElement).toContainHTML(`<p>${text}</p>`)
  })

  it('handles clicks', async () => {
    const user = userEvent.setup()
    const handleClick = jest.fn()
    const { getByRole } = renderButton({ onClick: handleClick })
    expect(handleClick).not.toHaveBeenCalled()
    await user.click(getByRole('button'))
    expect(handleClick).toHaveBeenCalled()
  })

  it('accepts button props', () => {
    const { getByRole } = renderButton({ type: 'submit' })
    const button: HTMLButtonElement = getByRole('button') as any
    expect(button.type).toEqual('submit')
  })

  it('accepts className', () => {
    const className = faker.lorem.word()
    const { getByRole } = renderButton({ className })
    const button = getByRole('button')
    expect(button.className).toEqual(`button ${className}`)
  })
})
