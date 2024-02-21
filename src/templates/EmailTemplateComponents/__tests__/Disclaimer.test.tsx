import React from 'react'
import { Disclaimer } from '../Disclaimer'
import { render } from '@testing-library/react'
import { EmailTemplate } from 'src/appTypes'
import { buildUniqueEmailComponent, emailPartWrapper } from 'src/testHelpers'
import { faker } from '@faker-js/faker'
import { RichTextValue } from 'src/ui/RichTextEditor'

describe('Disclaimer', () => {
  let emailComponent: EmailTemplate.UniqueComponent

  beforeEach(() => {
    emailComponent = buildUniqueEmailComponent('Disclaimer')
  })

  it('displays the disclaimer that was configured in settings', () => {
    const disclaimerText = faker.lorem.paragraph()
    const richTextValue: RichTextValue = [
      { type: 'paragraph', children: [{ text: disclaimerText }] },
    ]
    localStorage.setItem('disclaimer', JSON.stringify(richTextValue))
    const { baseElement } = render(
      <Disclaimer emailComponent={emailComponent}>{null}</Disclaimer>,
      { wrapper: emailPartWrapper },
    )
    expect(baseElement).toHaveTextContent(disclaimerText)
  })
})
