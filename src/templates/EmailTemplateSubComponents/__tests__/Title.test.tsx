import React from 'react'
import { Title } from '../Title'
import userEvent from '@testing-library/user-event'
import { render } from '@testing-library/react'
import { EmailTemplate } from 'src/appTypes'
import { faker } from '@faker-js/faker'
import {
  buildEmailTemplateSubComponent,
  emailPartWrapper,
  expectActiveEmailPartToBe,
  expectActiveEmailPartToNotBe,
  expectEmailPartContentFor,
} from 'src/testHelpers'
import { buildSubComponentKey } from 'src/utils/emailPartKeys'

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
    const { queryByText, getByText, baseElement } = render(
      <Title componentId={componentId} id={id} emailSubComponent={emailSubComponent} />,
      { wrapper: emailPartWrapper },
    )

    const value = faker.lorem.words(4)
    const key = buildSubComponentKey(componentId, id)
    const input = getByText('Title')
    await user.clear(input)
    await user.type(input, value)

    expect(queryByText(value)).not.toBeNull()
    expectEmailPartContentFor(key, baseElement)
  })

  it('activates when clicked', async () => {
    const user = userEvent.setup()
    const { getByText, baseElement } = render(
      <Title componentId={componentId} id={id} emailSubComponent={emailSubComponent} />,
      { wrapper: emailPartWrapper },
    )
    const key = buildSubComponentKey(componentId, id)
    expectActiveEmailPartToNotBe(key, baseElement)
    await user.click(getByText('Title'))
    expectActiveEmailPartToBe(key, baseElement)
  })
})
