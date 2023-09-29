import React from 'react'
import { EditEmailComponent } from '../EditEmailComponent'
import { EmailTemplate } from 'src/appTypes'
import { faker } from '@faker-js/faker'
import { buildEmailTemplateComponent, emailPartWrapper } from 'src/testHelpers'
import { buildComponentKey } from 'src/utils/emailPartKeys'
import { render } from '@testing-library/react'
import { ShouldShowEmailPart } from 'src/templates/ShouldShowEmailPart'

describe('EditEmailComponent', () => {
  let id: string
  let emailComponent: EmailTemplate.Component

  beforeEach(() => {
    id = faker.lorem.word()
    emailComponent = buildEmailTemplateComponent('Header')
  })

  it('displays nothing when the component should not be shown', () => {
    const key = buildComponentKey(id)
    const { baseElement } = render(
      <ShouldShowEmailPart initialData={{ [key]: false }}>
        <EditEmailComponent id={id} emailComponent={emailComponent}>
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
    emailComponent = buildEmailTemplateComponent('Header')
    const text = faker.lorem.paragraph()
    const { queryByText } = render(
      <EditEmailComponent id={id} emailComponent={emailComponent}>
        <tr>
          <td>{text}</td>
        </tr>
      </EditEmailComponent>,
      { wrapper: emailPartWrapper },
    )
    expect(queryByText(text)).not.toBeNull()
  })

  it('can render a Footer', () => {
    emailComponent = buildEmailTemplateComponent('Footer')
    const text = faker.lorem.paragraph()
    const { queryByText } = render(
      <EditEmailComponent id={id} emailComponent={emailComponent}>
        <tr>
          <td>{text}</td>
        </tr>
      </EditEmailComponent>,
      { wrapper: emailPartWrapper },
    )
    expect(queryByText(text)).not.toBeNull()
  })

  it('can render an Amount', () => {
    emailComponent = buildEmailTemplateComponent('Amount')
    const text = faker.lorem.paragraph()
    const { queryByText } = render(
      <EditEmailComponent id={id} emailComponent={emailComponent}>
        <span>{text}</span>
      </EditEmailComponent>,
      { wrapper: emailPartWrapper },
    )
    expect(queryByText(text)).not.toBeNull()
  })

  it('can render a Name', () => {
    emailComponent = buildEmailTemplateComponent('Name')
    const text = faker.lorem.paragraph()
    const { queryByText } = render(
      <EditEmailComponent id={id} emailComponent={emailComponent}>
        <tr>
          <td>{text}</td>
        </tr>
      </EditEmailComponent>,
      { wrapper: emailPartWrapper },
    )
    expect(queryByText(text)).not.toBeNull()
  })

  it('can render a Body', () => {
    emailComponent = buildEmailTemplateComponent('Body')
    const text = faker.lorem.paragraph()
    const { queryByText } = render(
      <EditEmailComponent id={id} emailComponent={emailComponent}>
        <tr>
          <td>{text}</td>
        </tr>
      </EditEmailComponent>,
      { wrapper: emailPartWrapper },
    )
    expect(queryByText(text)).not.toBeNull()
  })

  it('can render a Disclaimer', () => {
    emailComponent = buildEmailTemplateComponent('Disclaimer')
    const text = faker.lorem.paragraph()
    const { queryByText } = render(
      <EditEmailComponent id={id} emailComponent={emailComponent}>
        <tr>
          <td>{text}</td>
        </tr>
      </EditEmailComponent>,
      { wrapper: emailPartWrapper },
    )
    expect(queryByText(text)).not.toBeNull()
  })

  it('can render a Banner', () => {
    emailComponent = buildEmailTemplateComponent('Banner')
    const text = faker.lorem.paragraph()
    const { queryByText } = render(
      <EditEmailComponent id={id} emailComponent={emailComponent}>
        <tr>
          <td>{text}</td>
        </tr>
      </EditEmailComponent>,
      { wrapper: emailPartWrapper },
    )
    expect(queryByText(text)).not.toBeNull()
  })
})
