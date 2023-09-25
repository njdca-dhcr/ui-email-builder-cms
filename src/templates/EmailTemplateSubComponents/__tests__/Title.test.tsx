import React from 'react'
import { Title } from '../Title'
import userEvent from '@testing-library/user-event'
import { render } from '@testing-library/react'
import { EmailTemplate } from 'src/appTypes'
import { faker } from '@faker-js/faker'
import { buildEmailTemplateSubComponent, emailPartWrapper } from 'src/testHelpers'
import { useClearCurrentlyActiveEmailPart } from 'src/templates/CurrentlyActiveEmailPart'
import { ShouldShowEmailPart } from 'src/templates/ShouldShowEmailPart'
import { buildSubComponentKey } from 'src/utils/emailPartKeys'

describe('Title', () => {
  let componentId: string
  let id: string
  let emailSubComponent: EmailTemplate.SubComponent<'Header'>

  const ClearFocus = () => {
    const unfocus = useClearCurrentlyActiveEmailPart()
    return <button onClick={unfocus}>clear focus</button>
  }

  beforeEach(() => {
    componentId = faker.lorem.words(2)
    id = faker.lorem.words(3)
    emailSubComponent = buildEmailTemplateSubComponent('Header', { kind: 'Title' })
  })

  it('is an editable title', async () => {
    const user = userEvent.setup()
    const { queryByText, getByText, getByLabelText } = render(
      <>
        <Title componentId={componentId} id={id} emailSubComponent={emailSubComponent} />
        <tr>
          <td>
            <ClearFocus />
          </td>
        </tr>
      </>,
      { wrapper: emailPartWrapper },
    )

    await user.click(getByText('Title'))
    const value = faker.lorem.words(4)
    await user.clear(getByLabelText('Title'))
    await user.type(getByLabelText('Title'), value)
    await user.click(getByText('clear focus'))

    expect(queryByText(value)).not.toBeNull()
  })

  it('does not display anything when the subcomponent is toggled off', () => {
    const key = buildSubComponentKey(componentId, id)
    const { baseElement } = render(
      <ShouldShowEmailPart initialData={{ [key]: false }}>
        <Title componentId={componentId} id={id} emailSubComponent={emailSubComponent} />
      </ShouldShowEmailPart>,
      { wrapper: emailPartWrapper },
    )
    const tbody = baseElement.querySelector('tbody')
    expect(tbody).not.toBeNull()
    expect(tbody).toBeEmptyDOMElement()
  })
})
