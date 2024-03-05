import React from 'react'
import { RenderResult, render } from '@testing-library/react'
import userEvent, { UserEvent } from '@testing-library/user-event'
import { EmailPartsContent } from 'src/templates/EmailPartsContent'
import { SupplementalContentControls } from '../SupplementalContentControls'
import { buildUniqueEmailSubComponent } from 'src/testHelpers'
import { EmailTemplate } from 'src/appTypes'

jest.mock('src/ui/UswdsIconSelect', () => {
  return {
    UswdsIconSelect: () => <div>UswdsIconSelect</div>,
  }
})

describe('SupplementalContentControls', () => {
  let rendered: RenderResult
  let user: UserEvent
  let emailSubComponent: EmailTemplate.SupplementalContent

  beforeEach(() => {
    user = userEvent.setup()
    emailSubComponent = buildUniqueEmailSubComponent('Body', {
      kind: 'SupplementalContent',
    })
  })

  describe('all', () => {
    beforeEach(() => {
      rendered = render(
        <EmailPartsContent>
          <SupplementalContentControls emailSubComponent={emailSubComponent} />
        </EmailPartsContent>,
      )
    })

    it('provides a dropdown for selecting a variant', async () => {
      const user = userEvent.setup()
      const { getByRole, queryByRole, queryByText } = rendered
      let button = queryByText('Single', { selector: 'span' })
      expect(button).not.toBeNull()

      await user.click(button!)
      expect(queryByRole('option', { name: 'Single' })).not.toBeNull()
      expect(queryByRole('option', { name: 'Double' })).not.toBeNull()
      expect(queryByRole('option', { name: 'Benefit Amount' })).not.toBeNull()
      await user.click(getByRole('option', { name: 'Double' }))

      button = queryByText('Double', { selector: 'span' })
      expect(button).not.toBeNull()
    })
  })

  describe('variants', () => {
    let rendered: RenderResult
    let user: UserEvent

    beforeEach(() => {
      user = userEvent.setup()
    })

    describe('Single', () => {
      beforeEach(async () => {
        rendered = render(
          <EmailPartsContent>
            <SupplementalContentControls emailSubComponent={emailSubComponent} />
          </EmailPartsContent>,
        )
        await user.click(rendered.getByText('Single', { selector: 'Span' }))
        await user.click(rendered.getByRole('option', { name: 'Single' }))
      })

      it('does not have a box color select', () => {
        expect(rendered.queryAllByRole('button')).toHaveLength(1)
      })

      it('does not provide a dropdown for selecting an icon', () => {
        const { baseElement } = rendered
        expect(baseElement).not.toHaveTextContent(/UswdsIconSelect/)
      })
    })

    describe('Double', () => {
      beforeEach(async () => {
        rendered = render(
          <EmailPartsContent>
            <SupplementalContentControls emailSubComponent={emailSubComponent} />
          </EmailPartsContent>,
        )
        await user.click(rendered.getByText('Single', { selector: 'Span' }))
        await user.click(rendered.getByRole('option', { name: 'Double' }))
      })

      it('does not have a box color select', () => {
        expect(rendered.queryAllByRole('button')).toHaveLength(1)
      })

      it('does not provide a dropdown for selecting an icon', () => {
        const { baseElement } = rendered
        expect(baseElement).not.toHaveTextContent(/UswdsIconSelect/)
      })
    })

    describe('Benefit Amount', () => {
      beforeEach(async () => {
        rendered = render(
          <EmailPartsContent>
            <SupplementalContentControls emailSubComponent={emailSubComponent} />
          </EmailPartsContent>,
        )
        await user.click(rendered.getByText('Single', { selector: 'Span' }))
        await user.click(rendered.getByRole('option', { name: 'Benefit Amount' }))
      })

      it('has a box color select', async () => {
        const button = rendered.queryByRole('button', { name: 'Box Color Granted Green' })
        expect(button).not.toBeNull()
        await user.click(button!)
        await user.click(rendered.getByRole('option', { name: 'Benefit Blue' }))
        expect(rendered.queryByRole('button', { name: 'Box Color Benefit Blue' })).not.toBeNull()
      })

      it('provides a dropdown for selecting an icon', () => {
        const { baseElement } = rendered
        expect(baseElement).toHaveTextContent(/UswdsIconSelect/)
      })
    })
  })
})
