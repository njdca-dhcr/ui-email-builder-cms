import React from 'react'
import userEvent, { UserEvent } from '@testing-library/user-event'
import { RenderResult, render } from '@testing-library/react'
import { faker } from '@faker-js/faker'
import { RulesRightsRegulationsControls } from '../RulesRightsRegulationsControls'
import { EmailPartsContent } from 'src/templates/EmailPartsContent'
import { buildUniqueEmailSubComponent } from 'src/testHelpers'

jest.mock('src/ui/UswdsIconSelect', () => {
  return {
    UswdsIconSelect: () => <div>UswdsIconSelect</div>,
  }
})

describe('RulesRightsRegulationsControls', () => {
  let componentId: string
  let id: string
  let rendered: RenderResult
  let user: UserEvent

  beforeEach(() => {
    componentId = faker.lorem.word()
    id = faker.lorem.word()
    user = userEvent.setup()
    rendered = render(
      <EmailPartsContent>
        <RulesRightsRegulationsControls
          componentId={componentId}
          id={id}
          emailSubComponent={buildUniqueEmailSubComponent('Body', {
            kind: 'RulesRightsRegulations',
          })}
        />
      </EmailPartsContent>,
    )
  })

  it('provides a dropdown for selecting a variant', async () => {
    const user = userEvent.setup()
    const { getByRole, queryByRole, queryByText } = rendered
    let button = queryByText('Reminder', { selector: 'span' })
    expect(button).not.toBeNull()
    expect(button).toHaveTextContent('Reminder')

    await user.click(button!)
    expect(queryByRole('option', { name: 'Reminder' })).not.toBeNull()
    expect(queryByRole('option', { name: 'Appeal Rights' })).not.toBeNull()
    expect(queryByRole('option', { name: 'Your Rights' })).not.toBeNull()
    await user.click(getByRole('option', { name: 'Appeal Rights' }))

    button = queryByText('Appeal Rights', { selector: 'span' })
    expect(button).not.toBeNull()
  })

  describe('variants', () => {
    describe('Reminder', () => {
      beforeEach(async () => {
        await user.click(rendered.getByText('Reminder', { selector: 'span' }))
        await user.click(rendered.getByRole('option', { name: 'Reminder' }))
      })

      it('provides a dropdown for selecting an icon', () => {
        const { baseElement } = rendered
        expect(baseElement).toHaveTextContent(/UswdsIconSelect/)
      })

      it('can have reminder is for toggled on and off', async () => {
        const { getByRole } = rendered
        const getSwitch = (): HTMLInputElement =>
          getByRole('switch', { name: 'Reminder Is For' }) as any

        expect(getSwitch()).toBeChecked()
        await user.click(getSwitch())
        expect(getSwitch()).not.toBeChecked()
        await user.click(getSwitch())
        expect(getSwitch()).toBeChecked()
      })

      it('can have the footnote toggled on and off', async () => {
        const { getByRole } = rendered
        const getSwitch = (): HTMLInputElement => getByRole('switch', { name: '+ Footnote' }) as any

        expect(getSwitch()).toBeChecked()
        await user.click(getSwitch())
        expect(getSwitch()).not.toBeChecked()
        await user.click(getSwitch())
        expect(getSwitch()).toBeChecked()
      })

      it('only has the correct switches', () => {
        const all = rendered.queryAllByRole('switch')
        expect(all).toHaveLength(2)
      })
    })

    describe('Appeal Rights', () => {
      beforeEach(async () => {
        await user.click(rendered.getByText('Reminder', { selector: 'span' }))
        await user.click(rendered.getByRole('option', { name: 'Appeal Rights' }))
      })

      it('provides a dropdown for selecting an icon', () => {
        const { baseElement } = rendered
        expect(baseElement).toHaveTextContent(/UswdsIconSelect/)
      })

      it('only has the correct switches', () => {
        const all = rendered.queryAllByRole('switch')
        expect(all).toHaveLength(3)
      })

      it('can have the instruction toggled on and off', async () => {
        const { getByRole } = rendered
        const getSwitch = (): HTMLInputElement =>
          getByRole('switch', { name: 'Instruction' }) as any

        expect(getSwitch()).toBeChecked()
        await user.click(getSwitch())
        expect(getSwitch()).not.toBeChecked()
        await user.click(getSwitch())
        expect(getSwitch()).toBeChecked()
      })

      it('can have the information label toggled on and off', async () => {
        const { getByRole } = rendered
        const getSwitch = (): HTMLInputElement =>
          getByRole('switch', { name: 'Information Label' }) as any

        expect(getSwitch()).toBeChecked()
        await user.click(getSwitch())
        expect(getSwitch()).not.toBeChecked()
        await user.click(getSwitch())
        expect(getSwitch()).toBeChecked()
      })

      it('can have the information toggled on and off', async () => {
        const { getByRole } = rendered
        const getSwitch = (): HTMLInputElement =>
          getByRole('switch', { name: 'Information' }) as any

        expect(getSwitch()).toBeChecked()
        await user.click(getSwitch())
        expect(getSwitch()).not.toBeChecked()
        await user.click(getSwitch())
        expect(getSwitch()).toBeChecked()
      })
    })

    describe('Your Rights', () => {
      beforeEach(async () => {
        await user.click(rendered.getByText('Reminder', { selector: 'span' }))
        await user.click(rendered.getByRole('option', { name: 'Your Rights' }))
      })

      it('does not render any inputs', () => {
        expect(rendered.baseElement.querySelectorAll('input')).toHaveLength(0)
      })

      it('does not provide a dropdown for selecting an icon', () => {
        const { baseElement } = rendered
        expect(baseElement).not.toHaveTextContent(/UswdsIconSelect/)
      })

      it('only has the correct switches', () => {
        const all = rendered.queryAllByRole('switch')
        expect(all).toHaveLength(0)
      })
    })
  })
})
