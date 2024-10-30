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
    emailSubComponent = buildUniqueEmailSubComponent({
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
      const { getByRole, queryByRole, getByLabelText } = rendered
      let element = getByLabelText('Supplemental Content variant')
      expect(element).toHaveTextContent('Single')

      await user.click(element)
      expect(queryByRole('option', { name: 'Single' })).not.toBeNull()
      expect(queryByRole('option', { name: 'Double' })).not.toBeNull()
      expect(queryByRole('option', { name: 'Triple' })).not.toBeNull()
      expect(queryByRole('option', { name: 'Benefit Amount' })).not.toBeNull()
      await user.click(getByRole('option', { name: 'Double' }))

      element = getByLabelText('Supplemental Content variant')
      expect(element).toHaveTextContent('Double')
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
        await user.click(rendered.getByLabelText('Supplemental Content variant'))
        await user.click(rendered.getByRole('option', { name: 'Single' }))
      })

      it('does not have a box color select', () => {
        expect(rendered.queryAllByRole('combobox')).toHaveLength(1)
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
        await user.click(rendered.getByLabelText('Supplemental Content variant'))
        await user.click(rendered.getByRole('option', { name: 'Double' }))
      })

      it('does not have a box color select', () => {
        expect(rendered.queryAllByRole('combobox')).toHaveLength(1)
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
        await user.click(rendered.getByLabelText('Supplemental Content variant'))
        await user.click(rendered.getByRole('option', { name: 'Benefit Amount' }))
      })

      it('has a box color select', async () => {
        const element = rendered.getByLabelText('Box Color')
        expect(element).toHaveTextContent('Granted Green')

        await user.click(element)
        await user.click(rendered.getByRole('option', { name: 'Benefit Blue' }))
        expect(rendered.getByLabelText('Box Color')).toHaveTextContent('Benefit Blue')
      })

      it('provides a dropdown for selecting an icon', () => {
        const { baseElement } = rendered
        expect(baseElement).toHaveTextContent(/UswdsIconSelect/)
      })
    })
  })
})
