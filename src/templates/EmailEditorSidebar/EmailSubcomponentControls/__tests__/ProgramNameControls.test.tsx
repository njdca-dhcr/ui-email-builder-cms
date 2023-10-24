import React from 'react'
import { render } from '@testing-library/react'
import { ProgramNameControls } from '../ProgramNameControls'
import { EmailPartsContent } from 'src/templates/EmailPartsContent'
import { faker } from '@faker-js/faker'

describe('ProgramNameControls', () => {
  let componentId: string
  let id: string

  beforeEach(() => {
    componentId = faker.lorem.word()
    id = faker.lorem.word()
  })

  it('provides a color picker for the background color', () => {
    const { queryByText, baseElement } = render(
      <EmailPartsContent>
        <ProgramNameControls componentId={componentId} id={id} />
      </EmailPartsContent>,
    )
    expect(queryByText('Background Color')).not.toBeNull()
    expect(baseElement.querySelector('input[type="color"]')).not.toBeNull()
  })
})
