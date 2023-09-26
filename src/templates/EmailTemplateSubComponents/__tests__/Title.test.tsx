import React from 'react'
import { Title } from '../Title'
import userEvent from '@testing-library/user-event'
import { render } from '@testing-library/react'
import { EmailTemplate } from 'src/appTypes'
import { faker } from '@faker-js/faker'
import { buildEmailTemplateSubComponent, emailPartWrapper } from 'src/testHelpers'

describe('Title', () => {
  let componentId: string
  let id: string
  let emailSubComponent: EmailTemplate.SubComponent<'Header'>

  beforeEach(() => {
    componentId = faker.lorem.words(2)
    id = faker.lorem.words(3)
    emailSubComponent = buildEmailTemplateSubComponent('Header', { kind: 'Title' })
  })

  it('is editable', async () => {
    const user = userEvent.setup()
    const { queryByText, getByText } = render(
      <Title componentId={componentId} id={id} emailSubComponent={emailSubComponent} />,
      { wrapper: emailPartWrapper },
    )

    const value = faker.lorem.words(4)
    const input = getByText('Title')
    await user.clear(input)
    await user.type(input, value)

    expect(queryByText(value)).not.toBeNull()
  })
})
