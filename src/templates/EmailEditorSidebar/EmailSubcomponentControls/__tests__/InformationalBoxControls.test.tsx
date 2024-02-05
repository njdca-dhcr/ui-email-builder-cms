import React from 'react'
import userEvent, { UserEvent } from '@testing-library/user-event'
import { RenderResult, render } from '@testing-library/react'
import { faker } from '@faker-js/faker'
import { InformationalBoxControls } from '../InformationalBoxControls'
import { EmailPartsContent } from 'src/templates/EmailPartsContent'
import { buildUniqueEmailSubComponent } from 'src/testHelpers'

jest.mock('src/ui/UswdsIconSelect', () => {
  return {
    UswdsIconSelect: () => <div>UswdsIconSelect</div>,
  }
})

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
        <InformationalBoxControls
          componentId={componentId}
          id={id}
          emailSubComponent={buildUniqueEmailSubComponent('Body', { kind: 'InformationalBox' })}
        />
      </EmailPartsContent>,
    )
  })

  it('provides a dropdown for selecting an icon', () => {
    const { baseElement } = rendered
    expect(baseElement).toHaveTextContent(/UswdsIconSelect/)
  })

  it('displays a dropdown for selecting an box color', async () => {
    const { getByRole, queryByRole } = rendered
    let button: HTMLElement | null = queryByRole('button')
    expect(button).not.toBeNull()
    expect(button).toHaveTextContent('Benefit Blue')

    await user.click(button!)
    expect(queryByRole('option', { name: 'Benefit Blue' })).not.toBeNull()
    expect(queryByRole('option', { name: 'Yielding Yellow' })).not.toBeNull()
    await user.click(getByRole('option', { name: 'Yielding Yellow' }))

    button = queryByRole('button')
    expect(button).not.toBeNull()
    expect(button).toHaveTextContent('Yielding Yellow')
  })
})
