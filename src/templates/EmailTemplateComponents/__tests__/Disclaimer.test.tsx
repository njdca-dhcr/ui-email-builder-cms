import React from 'react'
import { Disclaimer } from '../Disclaimer'
import { render } from '@testing-library/react'
import { EmailTemplate } from 'src/appTypes'
import { buildEmailTemplateComponent, emailPartWrapper } from 'src/testHelpers'
import { faker } from '@faker-js/faker'

describe('Disclaimer', () => {
  let id: string
  let emailComponent: EmailTemplate.Component<'Disclaimer'>

  beforeEach(() => {
    id = faker.lorem.word()
    emailComponent = buildEmailTemplateComponent('Disclaimer')
  })

  it('displays the disclaimer that was configured in settings', () => {
    const disclaimerText = faker.lorem.paragraph()
    localStorage.setItem('disclaimer', JSON.stringify(disclaimerText))
    const { baseElement } = render(
      <Disclaimer id={id} emailComponent={emailComponent}>
        {null}
      </Disclaimer>,
      { wrapper: emailPartWrapper },
    )
    expect(baseElement.querySelector('td')).toHaveTextContent(disclaimerText)
  })
})
