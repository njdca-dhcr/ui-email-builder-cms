import React from 'react'
import { Button, ButtonLike, Props } from '../Button'
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

describe('ButtonLike', () => {
  const renderButtonLink = (props: Partial<Props>) => {
    return render(<ButtonLike {...props} />)
  }

  it('is a button', () => {
    const { queryByRole } = renderButtonLink({})
    expect(queryByRole('button')).not.toBeNull()
  })

  it('displays children', () => {
    const text = faker.lorem.paragraph()
    const { baseElement } = renderButtonLink({
      children: <p>{text}</p>,
    })
    expect(baseElement).toContainHTML(`<p>${text}</p>`)
  })

  it('handles clicks', async () => {
    const user = userEvent.setup()
    const handleClick = jest.fn()
    const { getByRole } = renderButtonLink({ onClick: handleClick })
    expect(handleClick).not.toHaveBeenCalled()
    await user.click(getByRole('button'))
    expect(handleClick).toHaveBeenCalled()
  })

  it('accepts button props', () => {
    const { getByRole } = renderButtonLink({ type: 'submit' })
    const button: HTMLButtonElement = getByRole('button') as any
    expect(button.type).toEqual('submit')
  })

  it('accepts className', () => {
    const className = faker.lorem.word()
    const { getByRole } = renderButtonLink({ className })
    const button = getByRole('button')
    expect(button.className).toEqual(`button-like ${className}`)
  })
})
