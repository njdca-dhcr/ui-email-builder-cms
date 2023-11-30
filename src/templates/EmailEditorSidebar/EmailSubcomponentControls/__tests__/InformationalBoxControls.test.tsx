import React, { FC } from 'react'
import userEvent, { UserEvent } from '@testing-library/user-event'
import { RenderResult, render } from '@testing-library/react'
import { faker } from '@faker-js/faker'
import { InformationalBoxControls } from '../InformationalBoxControls'
import { EmailPartsContent } from 'src/templates/EmailPartsContent'
import { useInformationalBoxValue } from 'src/templates/EmailTemplateSubComponents/InformationalBox'
import { before } from 'node:test'

describe('InformationalBoxControls', () => {
  let componentId: string
  let id: string
  let rendered: RenderResult
  let user: UserEvent

  beforeEach(() => {
    componentId = faker.lorem.word()
    id = faker.lorem.word()
    user = userEvent.setup()
    rendered = render(
      <EmailPartsContent>
        <InformationalBoxControls componentId={componentId} id={id} />
      </EmailPartsContent>,
    )
  })

  it('displays a dropdown for selecting an icon', async () => {
    const { getByRole, queryByRole, queryAllByRole } = rendered
    let button: HTMLElement | null = queryAllByRole('button')[0]
    expect(button).not.toBeNull()
    expect(button).toHaveTextContent('Lock Open')

    await user.click(button!)
    expect(queryByRole('option', { name: 'Lock Open' })).not.toBeNull()
    expect(queryByRole('option', { name: 'Device Thermostat' })).not.toBeNull()
    await user.click(getByRole('option', { name: 'Device Thermostat' }))

    button = queryAllByRole('button')[0]
    expect(button).not.toBeNull()
    expect(button).toHaveTextContent('Device Thermostat')
  })

  it('displays a dropdown for selecting an box color', async () => {
    const { getByRole, queryByRole, queryAllByRole } = rendered
    let button: HTMLElement | null = queryAllByRole('button')[1]
    expect(button).not.toBeNull()
    expect(button).toHaveTextContent('Benefit Blue')

    await user.click(button!)
    expect(queryByRole('option', { name: 'Benefit Blue' })).not.toBeNull()
    expect(queryByRole('option', { name: 'Yielding Yellow' })).not.toBeNull()
    await user.click(getByRole('option', { name: 'Yielding Yellow' }))

    button = queryAllByRole('button')[1]
    expect(button).not.toBeNull()
    expect(button).toHaveTextContent('Yielding Yellow')
  })
})
