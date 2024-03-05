import React from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { EditStateSeal } from '../EditStateSeal'
import { faker } from '@faker-js/faker'
import { asMock } from 'src/testHelpers'
import { isAllStatesMode } from 'src/utils/appMode'
import { StateSealValue } from 'src/appTypes'

jest.mock('src/utils/appMode', () => {
  const actual = jest.requireActual('src/utils/appMode')
  return {
    ...actual,
    isAllStatesMode: jest.fn(),
  }
})

describe('EditStateSeal', () => {
  const stored = (): StateSealValue => {
    const stored = localStorage.getItem('stateSeal') ?? '{}'
    return JSON.parse(stored)
  }

  afterEach(() => {
    localStorage.removeItem('stateSeal')
  })

  it('has an editable additional disclaimer text', async () => {
    const user = userEvent.setup()
    const { getByLabelText } = render(<EditStateSeal />)
    const value = faker.lorem.paragraph()
    const additionalDisclaimerField = () => getByLabelText('Additional Disclaimer')

    await user.clear(additionalDisclaimerField())
    await user.type(additionalDisclaimerField(), value)
    expect(additionalDisclaimerField()).toHaveTextContent(value)
  })

  describe('in all states mode', () => {
    it('has an editable state seal dropdown', async () => {
      asMock(isAllStatesMode).mockReturnValue(true)
      const user = userEvent.setup()
      const { getByRole } = render(<EditStateSeal />)

      const stateSealSelect = () => getByRole('button')
      expect(stateSealSelect()).toHaveTextContent('US')

      await user.click(stateSealSelect())
      await user.click(getByRole('option', { name: 'California' }))

      expect(stateSealSelect()).toHaveTextContent('California')
      expect(stored().stateSealKey).toEqual('California')
    })
  })

  describe('in NJ mode', () => {
    it('lacks an editable state seal dropdown', () => {
      asMock(isAllStatesMode).mockReturnValue(false)
      const { queryByRole } = render(<EditStateSeal />)
      expect(queryByRole('button')).toBeNull()
    })
  })
})
