import React from 'react'
import { faker } from '@faker-js/faker'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { EditBanner } from '../EditBanner'

describe('EditBanner', () => {
  const localStorageData = () => JSON.parse(localStorage.getItem('banner')!)

  it('has an editable banner primary text', async () => {
    const user = userEvent.setup()
    const value = faker.lorem.paragraph()
    const { queryByText, getByLabelText } = render(<EditBanner />)

    await user.clear(getByLabelText('Primary Text'))
    await user.type(getByLabelText('Primary Text'), value)
    expect(queryByText(value)).not.toBeNull()
    expect(localStorageData().primaryText).toEqual(value)
  })

  it('has an editable banner primary link', async () => {
    const user = userEvent.setup()
    const value = faker.internet.url()
    const { getByLabelText } = render(<EditBanner />)

    await user.clear(getByLabelText('Primary Link'))
    await user.type(getByLabelText('Primary Link'), value)
    expect(localStorageData().primaryLink).toEqual(value)
  })

  it('has an editable banner secondary link', async () => {
    const user = userEvent.setup()
    const value = faker.internet.url()
    const { getByLabelText } = render(<EditBanner />)

    await user.clear(getByLabelText('Secondary Link'))
    await user.type(getByLabelText('Secondary Link'), value)
    expect(localStorageData().secondaryLink).toEqual(value)
  })
})
