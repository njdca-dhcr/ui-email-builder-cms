import React from 'react'
import { EditEmailComponent } from '../EditEmailComponent'
import { EmailTemplate } from 'src/appTypes'
import { faker } from '@faker-js/faker'
import { buildUniqueEmailComponent, emailPartWrapper } from 'src/testHelpers'
import { render } from '@testing-library/react'
import { ShouldShowEmailPart } from 'src/templates/ShouldShowEmailPart'

describe('EditEmailComponent', () => {
  let emailComponent: EmailTemplate.UniqueComponent

  beforeEach(() => {
    emailComponent = buildUniqueEmailComponent('Header')
  })

  it('displays nothing when the component should not be shown', () => {
    const { baseElement } = render(
      <ShouldShowEmailPart initialData={{ [emailComponent.id]: false }}>
        <EditEmailComponent emailComponent={emailComponent}>
          <tr>
            <td>{faker.lorem.paragraph()}</td>
          </tr>
        </EditEmailComponent>
      </ShouldShowEmailPart>,
      { wrapper: emailPartWrapper },
    )
    const tbody = baseElement.querySelector('tbody')
    expect(tbody).not.toBeNull()
    expect(tbody).toBeEmptyDOMElement()
  })

  it('can render a Header', () => {
    emailComponent = buildUniqueEmailComponent('Header')
    const text = faker.lorem.paragraph()
    const { queryByText } = render(
      <EditEmailComponent emailComponent={emailComponent}>
        <tr>
          <td>{text}</td>
        </tr>
      </EditEmailComponent>,
      { wrapper: emailPartWrapper },
    )
    expect(queryByText(text)).not.toBeNull()
  })

  it('can render a Footer', () => {
    emailComponent = buildUniqueEmailComponent('Footer')
    const text = faker.lorem.paragraph()
    const { queryByText } = render(
      <EditEmailComponent emailComponent={emailComponent}>
        <tr>
          <td>{text}</td>
        </tr>
      </EditEmailComponent>,
      { wrapper: emailPartWrapper },
    )
    expect(queryByText(text)).not.toBeNull()
  })

  it('can render a Name', () => {
    emailComponent = buildUniqueEmailComponent('Name')
    const { queryByLabelText } = render(
      <EditEmailComponent emailComponent={emailComponent}>
        <tr />
      </EditEmailComponent>,
      { wrapper: emailPartWrapper },
    )
    expect(queryByLabelText("Recipient's name")).not.toBeNull()
  })

  it('can render a Body', () => {
    emailComponent = buildUniqueEmailComponent('Body')
    const text = faker.lorem.paragraph()
    const { queryByText } = render(
      <EditEmailComponent emailComponent={emailComponent}>
        <tr>
          <td>{text}</td>
        </tr>
      </EditEmailComponent>,
      { wrapper: emailPartWrapper },
    )
    expect(queryByText(text)).not.toBeNull()
  })

  it('can render a Disclaimer', () => {
    emailComponent = buildUniqueEmailComponent('Disclaimer')
    const text = faker.lorem.paragraph()
    localStorage.setItem('disclaimer', JSON.stringify(text))
    const { queryByText } = render(
      <EditEmailComponent emailComponent={emailComponent}>{null}</EditEmailComponent>,
      { wrapper: emailPartWrapper },
    )
    expect(queryByText(text)).not.toBeNull()
  })

  it('can render a Banner', () => {
    emailComponent = buildUniqueEmailComponent('Banner')
    const text = faker.lorem.paragraph()
    const { baseElement } = render(
      <EditEmailComponent emailComponent={emailComponent}>
        <tr>
          <td>{text}</td>
        </tr>
      </EditEmailComponent>,
      { wrapper: emailPartWrapper },
    )
    expect(baseElement.querySelectorAll('.banner-link-container')).not.toHaveLength(0)
  })
})
