import React, { FC } from 'react'
import userEvent, { UserEvent } from '@testing-library/user-event'
import { RenderResult, render } from '@testing-library/react'
import { faker } from '@faker-js/faker'
import { LoginDetailsControls } from '../LoginDetailsControls'
import { EmailPartsContent } from 'src/templates/EmailPartsContent'
import { useLoginDetailsValue } from 'src/templates/EmailTemplateSubComponents/LoginDetails'
import { buildUniqueEmailSubComponent } from 'src/testHelpers'

describe('LoginDetailsControls', () => {
  let componentId: string
  let id: string
  let rendered: RenderResult
  let user: UserEvent

  const ButtonHref: FC = () => {
    const [value] = useLoginDetailsValue(id)

    return <div data-testid="appeal-rights-href">{value.buttonHref}</div>
  }

  beforeEach(() => {
    componentId = faker.lorem.word()
    id = faker.lorem.word()
    user = userEvent.setup()
    rendered = render(
      <EmailPartsContent>
        <LoginDetailsControls
          componentId={componentId}
          id={id}
          emailSubComponent={buildUniqueEmailSubComponent('Body', { kind: 'LoginDetails' })}
        />
        ,
        <ButtonHref />
      </EmailPartsContent>,
    )
  })

  it('provides a dropdown for selecting a variant', async () => {
    const { getByRole, queryByRole, queryByText } = rendered
    let button = queryByText('Details', { selector: 'span' })
    expect(button).not.toBeNull()

    await user.click(button!)
    expect(queryByRole('option', { name: 'Details' })).not.toBeNull()
    expect(queryByRole('option', { name: 'Information' })).not.toBeNull()
    await user.click(getByRole('option', { name: 'Information' }))

    button = queryByText('Information', { selector: 'span' })
    expect(button).not.toBeNull()
  })

  describe('variants', () => {
    describe('Login Details', () => {
      beforeEach(async () => {
        await user.click(rendered.getAllByRole('button')[0])
        await user.click(rendered.getByRole('option', { name: 'Details' }))
      })

      it('displays a dropdown for selecting an icon', async () => {
        const { getByRole, queryByRole, queryAllByRole } = rendered
        let button: HTMLElement | null = queryAllByRole('button')[1]
        expect(button).not.toBeNull()
        expect(button).toHaveTextContent('Lock')

        await user.click(button!)
        expect(queryByRole('option', { name: 'Lock' })).not.toBeNull()
        expect(queryByRole('option', { name: 'Device Thermostat' })).not.toBeNull()
        await user.click(getByRole('option', { name: 'Device Thermostat' }))

        button = queryAllByRole('button')[1]
        expect(button).not.toBeNull()
        expect(button).toHaveTextContent('Device Thermostat')
      })
    })

    describe('Login Information', () => {
      beforeEach(async () => {
        await user.click(rendered.getAllByRole('button')[0])
        await user.click(rendered.getByRole('option', { name: 'Information' }))
      })

      it('displays a dropdown for selecting an icon', async () => {
        const { getByRole, queryByRole, queryAllByRole } = rendered
        let button: HTMLElement | null = queryAllByRole('button')[1]
        expect(button).not.toBeNull()
        expect(button).toHaveTextContent('Lock')

        await user.click(button!)
        expect(queryByRole('option', { name: 'Lock' })).not.toBeNull()
        expect(queryByRole('option', { name: 'Device Thermostat' })).not.toBeNull()
        await user.click(getByRole('option', { name: 'Device Thermostat' }))

        button = queryAllByRole('button')[1]
        expect(button).not.toBeNull()
        expect(button).toHaveTextContent('Device Thermostat')
      })

      it('does not display an input for the button link', async () => {
        const { queryByLabelText, getByTestId } = rendered
        const input: HTMLInputElement | null = queryByLabelText('Button Link') as any
        expect(input).toBeNull()
      })
    })
  })
})
