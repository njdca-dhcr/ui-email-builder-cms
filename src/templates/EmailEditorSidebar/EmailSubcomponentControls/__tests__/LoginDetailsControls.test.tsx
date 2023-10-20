import React, { FC } from 'react'
import userEvent, { UserEvent } from '@testing-library/user-event'
import { RenderResult, render } from '@testing-library/react'
import { faker } from '@faker-js/faker'
import { LoginDetailsControls } from '../LoginDetailsControls'
import { EmailPartsContent } from 'src/templates/EmailPartsContent'
import { useLoginDetailsValue } from 'src/templates/EmailTemplateSubComponents/LoginDetails'

describe('LoginDetailsControls', () => {
  let componentId: string
  let id: string
  let rendered: RenderResult
  let user: UserEvent

  const ButtonHref: FC = () => {
    const [value] = useLoginDetailsValue(componentId, id)

    return <div data-testid="appeal-rights-href">{value.buttonHref}</div>
  }

  beforeEach(() => {
    componentId = faker.lorem.word()
    id = faker.lorem.word()
    user = userEvent.setup()
    rendered = render(
      <EmailPartsContent>
        <LoginDetailsControls componentId={componentId} id={id} />,
        <ButtonHref />
      </EmailPartsContent>,
    )
  })

  it('displays a dropdown for selecting an icon', async () => {
    const { getByRole, queryByRole } = rendered
    let button = queryByRole('button')
    expect(button).not.toBeNull()
    expect(button).toHaveTextContent('Lock')

    await user.click(button!)
    expect(queryByRole('option', { name: 'Lock' })).not.toBeNull()
    expect(queryByRole('option', { name: 'DeviceThermostat' })).not.toBeNull()
    await user.click(getByRole('option', { name: 'DeviceThermostat' }))

    button = queryByRole('button')
    expect(button).not.toBeNull()
    expect(button).toHaveTextContent('DeviceThermostat')

  })

  it('displays an input for the button link', async () => {
    const { queryByLabelText, getByTestId } = rendered
    const input: HTMLInputElement | null = queryByLabelText('Button Link') as any
    expect(input).not.toBeNull()
    const value = `https://${faker.lorem.word()}.gov/appeal`
    await user.type(input!, value)
    expect(getByTestId('appeal-rights-href')).toHaveTextContent(value)
  })
})
