import { render } from '@testing-library/react'
import React from 'react'
import { ShareEmailContent } from '../ShareEmailContent'
import userEvent, { UserEvent } from '@testing-library/user-event'

describe('ShareEmailContent', () => {
  let user: UserEvent

  beforeEach(async () => {
    user = userEvent.setup()
  })

  const renderComponent = () => {
    return render(
      <ShareEmailContent>
        <button>Test 1</button>
        <button>Test 2</button>
        {null}
        {false}
      </ShareEmailContent>,
    )
  }

  it('has a button that can open the dropdown menu', async () => {
    const { queryByRole, queryAllByRole, debug } = renderComponent()

    const button = queryByRole('button')
    expect(button).not.toBeNull()
    expect(button).toHaveAccessibleName('Share')

    await user.click(button!)
    expect(queryByRole('menu')).not.toBeNull()
    expect(queryByRole('menuitem', { name: 'Test 1' })).not.toBeNull()
    expect(queryByRole('menuitem', { name: 'Test 2' })).not.toBeNull()
    expect(queryAllByRole('menuitem')).toHaveLength(2)
  })
})
