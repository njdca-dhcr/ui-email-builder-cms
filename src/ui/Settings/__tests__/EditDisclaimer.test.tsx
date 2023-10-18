import React from 'react'
import { faker } from '@faker-js/faker'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { EditDisclaimer } from '../EditDisclaimer'

describe('EditDisclaimer', () => {
  it('is editable', async () => {
    const user = userEvent.setup()
    const value = faker.lorem.paragraph()
    const { queryByText, getByLabelText } = render(<EditDisclaimer />)

    const disclaimerField = getByLabelText('Disclaimer')
    await user.clear(disclaimerField)
    await user.type(disclaimerField, value)
    expect(queryByText(value)).not.toBeNull()
    expect(localStorage.getItem('disclaimer')).toEqual(`"${value}"`)
  })
})
