import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React, { FC } from 'react'
import { EmailPartsContent } from 'src/templates/EmailPartsContent'
import { StatusFloatingControls } from '../StatusFloatingControls'
import { buildUniqueEmailSubComponent } from 'src/testHelpers'
import { useStatusValue } from 'src/templates/EmailTemplateSubComponents/Status'
import { EmailParts } from 'src/appTypes'

describe('StatusFloatingControls', () => {
  it('provides radio buttons for changing the spacing after the subcomponent', async () => {
    const user = userEvent.setup()
    const { getByLabelText } = render(
      <EmailPartsContent>
        <StatusFloatingControls
          emailSubComponent={buildUniqueEmailSubComponent({ kind: 'Status' })}
        />
      </EmailPartsContent>,
    )
    const smallButton = getByLabelText('Small')
    const largeButton = getByLabelText('Large')
    expect(smallButton).not.toBeChecked()
    expect(largeButton).toBeChecked()

    await user.click(smallButton)
    expect(smallButton).toBeChecked()
    expect(largeButton).not.toBeChecked()

    await user.click(largeButton)
    expect(smallButton).not.toBeChecked()
    expect(largeButton).toBeChecked()
  })

  const Dummy: FC<{ emailSubComponent: EmailParts.Status }> = ({ emailSubComponent }) => {
    const [value] = useStatusValue(emailSubComponent)
    return <div id="dummy">Spacing after is: {value.spaceAfter ? 'true' : 'false'}</div>
  }

  it('sets the spacing after to be true when the component unmounts', async () => {
    const subComponent = buildUniqueEmailSubComponent({ kind: 'Status' })
    const user = userEvent.setup()
    const { getByLabelText, baseElement, rerender } = render(
      <EmailPartsContent>
        <StatusFloatingControls emailSubComponent={subComponent} />
        <Dummy emailSubComponent={subComponent} />
      </EmailPartsContent>,
    )
    const dummyContent = () => baseElement.querySelector('#dummy')

    expect(dummyContent()).toHaveTextContent('Spacing after is: true')
    await user.click(getByLabelText('Small'))
    expect(dummyContent()).toHaveTextContent('Spacing after is: false')
    rerender(
      <EmailPartsContent>
        <Dummy emailSubComponent={subComponent} />
      </EmailPartsContent>,
    )
    expect(dummyContent()).toHaveTextContent('Spacing after is: true')
  })
})
