import React from 'react'
import userEvent, { UserEvent } from '@testing-library/user-event'
import { RenderResult, render } from '@testing-library/react'
import { faker } from '@faker-js/faker'
import { StatusControls } from '../StatusControls'
import { EmailPartsContent } from 'src/templates/EmailPartsContent'
import { buildUniqueEmailSubComponent } from 'src/testHelpers'

jest.mock('src/ui/UswdsIconSelect', () => {
  return {
    UswdsIconSelect: () => <div>UswdsIconSelect</div>,
  }
})

describe('StatusControls', () => {
  it('provides a dropdown for selecting a variant', async () => {
    const user = userEvent.setup()
    const { getByRole, queryByRole } = render(
      <EmailPartsContent>
        <StatusControls
          emailSubComponent={buildUniqueEmailSubComponent('Body', { kind: 'Status' })}
        />
      </EmailPartsContent>,
    )
    let button = queryByRole('button')
    expect(button).not.toBeNull()
    expect(button).toHaveTextContent('Overview')

    await user.click(button!)
    expect(queryByRole('option', { name: 'Overview' })).not.toBeNull()
    expect(queryByRole('option', { name: 'Overview w/ Reason' })).not.toBeNull()
    expect(queryByRole('option', { name: 'Missing Document Specifics' })).not.toBeNull()
    expect(queryByRole('option', { name: 'Overview w/ Reason + Amount Due' })).not.toBeNull()
    expect(queryByRole('option', { name: 'Overview w/ Reason + Amount Breakdown' })).not.toBeNull()
    await user.click(getByRole('option', { name: 'Overview w/ Reason' }))

    button = queryByRole('button')
    expect(button).not.toBeNull()
    expect(button).toHaveTextContent('Overview w/ Reason')
  })

  it('provides a toggle for supportive information', async () => {
    const user = userEvent.setup()
    const { queryByLabelText } = render(
      <EmailPartsContent>
        <StatusControls
          emailSubComponent={buildUniqueEmailSubComponent('Body', { kind: 'Status' })}
        />
      </EmailPartsContent>,
    )
    const toggle = queryByLabelText('+ Supportive Information')
    expect(toggle).not.toBeNull()
    expect(toggle).toBeChecked()

    await user.click(toggle!)
    expect(toggle).not.toBeChecked()

    await user.click(toggle!)
    expect(toggle).toBeChecked()
  })

  describe('variants', () => {
    let rendered: RenderResult
    let user: UserEvent

    beforeEach(() => {
      user = userEvent.setup()
    })

    describe('Overview', () => {
      beforeEach(async () => {
        rendered = render(
          <EmailPartsContent>
            <StatusControls
              emailSubComponent={buildUniqueEmailSubComponent('Body', { kind: 'Status' })}
            />
          </EmailPartsContent>,
        )
      })

      it('does not have a box color select', () => {
        expect(rendered.queryAllByRole('button')).toHaveLength(1)
      })

      it('does not provide a dropdown for selecting an icon', () => {
        const { baseElement } = rendered
        expect(baseElement).not.toHaveTextContent(/UswdsIconSelect/)
      })
    })

    describe('Overview w/ Reason', () => {
      beforeEach(async () => {
        rendered = render(
          <EmailPartsContent>
            <StatusControls
              emailSubComponent={buildUniqueEmailSubComponent('Body', { kind: 'Status' })}
            />
          </EmailPartsContent>,
        )
        await user.click(rendered.getByRole('button', { name: 'Status variant Overview' }))
        await user.click(rendered.getByRole('option', { name: 'Overview w/ Reason' }))
      })

      it('does not have a box color select', () => {
        expect(rendered.queryAllByRole('button')).toHaveLength(1)
      })

      it('does not provide a dropdown for selecting an icon', () => {
        const { baseElement } = rendered
        expect(baseElement).not.toHaveTextContent(/UswdsIconSelect/)
      })
    })

    describe('Missing Document', () => {
      beforeEach(async () => {
        rendered = render(
          <EmailPartsContent>
            <StatusControls
              emailSubComponent={buildUniqueEmailSubComponent('Body', { kind: 'Status' })}
            />
          </EmailPartsContent>,
        )
        await user.click(rendered.getByRole('button', { name: 'Status variant Overview' }))
        await user.click(rendered.getByRole('option', { name: 'Missing Document Specifics' }))
      })

      it('does not have a box color select', () => {
        expect(rendered.queryAllByRole('button')).toHaveLength(1)
      })

      it('does not provide a dropdown for selecting an icon', () => {
        const { baseElement } = rendered
        expect(baseElement).not.toHaveTextContent(/UswdsIconSelect/)
      })
    })

    describe('Overview w/ Reason + Amount Due', () => {
      beforeEach(async () => {
        rendered = render(
          <EmailPartsContent>
            <StatusControls
              emailSubComponent={buildUniqueEmailSubComponent('Body', { kind: 'Status' })}
            />
          </EmailPartsContent>,
        )
        await user.click(rendered.getByRole('button', { name: 'Status variant Overview' }))
        await user.click(rendered.getByRole('option', { name: 'Overview w/ Reason + Amount Due' }))
      })

      it('has a box color select', async () => {
        const button = rendered.queryByRole('button', { name: 'Box Color Yielding Yellow' })
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

    describe('Overview w/ Reason + Amount Breakdown', () => {
      beforeEach(async () => {
        rendered = render(
          <EmailPartsContent>
            <StatusControls
              emailSubComponent={buildUniqueEmailSubComponent('Body', { kind: 'Status' })}
            />
          </EmailPartsContent>,
        )
        await user.click(rendered.getByRole('button', { name: 'Status variant Overview' }))
        await user.click(
          rendered.getByRole('option', { name: 'Overview w/ Reason + Amount Breakdown' }),
        )
      })

      it('has a box color select', async () => {
        const button = rendered.queryByRole('button', { name: 'Box Color Yielding Yellow' })
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
