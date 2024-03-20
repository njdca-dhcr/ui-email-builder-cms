import React, { FC } from 'react'
import userEvent, { UserEvent } from '@testing-library/user-event'
import { RenderResult, render } from '@testing-library/react'
import { LoginDetailsControls } from '../LoginDetailsControls'
import { EmailPartsContent } from 'src/templates/EmailPartsContent'
import { useLoginDetailsValue } from 'src/templates/EmailTemplateSubComponents/LoginDetails'
import { buildUniqueEmailSubComponent } from 'src/testHelpers'
import { EmailTemplate } from 'src/appTypes'

jest.mock('src/ui/UswdsIconSelect', () => {
  return {
    UswdsIconSelect: () => <div>UswdsIconSelect</div>,
  }
})

describe('LoginDetailsControls', () => {
  let emailSubComponent: EmailTemplate.LoginDetails
  let rendered: RenderResult
  let user: UserEvent

  const ButtonHref: FC = () => {
    const [value] = useLoginDetailsValue(emailSubComponent)

    return <div data-testid="appeal-rights-href">{value.buttonHref}</div>
  }

  beforeEach(() => {
    user = userEvent.setup()
    emailSubComponent = buildUniqueEmailSubComponent('Body', { kind: 'LoginDetails' })
    rendered = render(
      <EmailPartsContent>
        <LoginDetailsControls emailSubComponent={emailSubComponent} />
        <ButtonHref />
      </EmailPartsContent>,
    )
  })

  it('provides a dropdown for selecting a variant', async () => {
    const { getByRole, queryByRole, queryByText } = rendered
    let button = queryByText('Details', { selector: 'span' })
    expect(button).not.toBeNull()

    await user.click(button!)
    expect(queryByRole('option', { name: 'Details' })).not.toBeNull()
    expect(queryByRole('option', { name: 'Information' })).not.toBeNull()
    await user.click(getByRole('option', { name: 'Information' }))

    button = queryByText('Information', { selector: 'span' })
    expect(button).not.toBeNull()
  })

  describe('variants', () => {
    describe('Login Details', () => {
      beforeEach(async () => {
        await user.click(rendered.getAllByRole('button')[0])
        await user.click(rendered.getByRole('option', { name: 'Details' }))
      })

      it('provides a dropdown for selecting an icon', () => {
        const { baseElement } = rendered
        expect(baseElement).toHaveTextContent(/UswdsIconSelect/)
      })

      it('does not provide a toggle for the login information body', async () => {
        const { queryByLabelText } = rendered
        const toggle = queryByLabelText('+ Login Information Body')
        expect(toggle).toBeNull()
      })
    })

    describe('Login Information', () => {
      beforeEach(async () => {
        await user.click(rendered.getAllByRole('button')[0])
        await user.click(rendered.getByRole('option', { name: 'Information' }))
      })

      it('provides a dropdown for selecting an icon', () => {
        const { baseElement } = rendered
        expect(baseElement).toHaveTextContent(/UswdsIconSelect/)
      })

      it('provides a toggle for the login information body', async () => {
        const { queryByLabelText } = rendered
        const toggle = queryByLabelText('+ Login Information Body')
        expect(toggle).not.toBeNull()
        expect(toggle).toBeChecked()

        await user.click(toggle!)
        expect(toggle).not.toBeChecked()

        await user.click(toggle!)
        expect(toggle).toBeChecked()
      })
    })
  })
})
