import React from 'react'
import userEvent, { UserEvent } from '@testing-library/user-event'
import { RenderResult, render } from '@testing-library/react'
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
    const { getByRole, queryByRole, getByLabelText } = render(
      <EmailPartsContent>
        <StatusControls
          emailSubComponent={buildUniqueEmailSubComponent('Body', { kind: 'Status' })}
        />
      </EmailPartsContent>,
    )

    let element = getByLabelText('Status variant')
    expect(element).toHaveTextContent('Overview')

    await user.click(element!)
    expect(queryByRole('option', { name: 'Overview' })).not.toBeNull()
    expect(queryByRole('option', { name: 'Overview w/ Reason' })).not.toBeNull()
    expect(queryByRole('option', { name: 'Missing Document Specifics' })).not.toBeNull()
    expect(queryByRole('option', { name: 'Overview w/ Reason + Amount Due' })).not.toBeNull()
    expect(queryByRole('option', { name: 'Overview w/ Reason + Amount Breakdown' })).not.toBeNull()
    await user.click(getByRole('option', { name: 'Overview w/ Reason' }))

    element = getByLabelText('Status variant')
    expect(element).toHaveTextContent('Overview w/ Reason')
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

    const itProvidesAToggleFor = (testName: string, label: string) => {
      it(`provides a toggle for ${testName}`, async () => {
        const { queryByLabelText } = rendered
        const toggle = queryByLabelText(label)
        expect(toggle).not.toBeNull()
        expect(toggle).toBeChecked()

        await user.click(toggle!)
        expect(toggle).not.toBeChecked()

        await user.click(toggle!)
        expect(toggle).toBeChecked()
      })
    }

    const itDoesNotProvideAToggleFor = (testName: string, label: string) => {
      it(`does not provide a toggle for ${testName}`, async () => {
        const { queryByLabelText } = rendered
        const toggle = queryByLabelText(label)
        expect(toggle).toBeNull()
      })
    }

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
        expect(rendered.queryAllByRole('combobox')).toHaveLength(1)
      })

      it('does not provide a dropdown for selecting an icon', () => {
        const { baseElement } = rendered
        expect(baseElement).not.toHaveTextContent(/UswdsIconSelect/)
      })

      itProvidesAToggleFor('description', '+ Description')

      itDoesNotProvideAToggleFor('missing document deadline', '+ Missing Document Deadline')
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
        await user.click(rendered.getByLabelText('Status variant'))
        await user.click(rendered.getByRole('option', { name: 'Overview w/ Reason' }))
      })

      it('does not have a box color select', () => {
        expect(rendered.queryAllByRole('combobox')).toHaveLength(1)
      })

      it('does not provide a dropdown for selecting an icon', () => {
        const { baseElement } = rendered
        expect(baseElement).not.toHaveTextContent(/UswdsIconSelect/)
      })

      itDoesNotProvideAToggleFor('description', '+ Description')

      itDoesNotProvideAToggleFor('missing document deadline', '+ Missing Document Deadline')
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
        await user.click(rendered.getByLabelText('Status variant'))
        await user.click(rendered.getByRole('option', { name: 'Missing Document Specifics' }))
      })

      it('does not have a box color select', () => {
        expect(rendered.queryAllByRole('combobox')).toHaveLength(1)
      })

      it('does not provide a dropdown for selecting an icon', () => {
        const { baseElement } = rendered
        expect(baseElement).not.toHaveTextContent(/UswdsIconSelect/)
      })

      itProvidesAToggleFor('missing document deadline', '+ Missing Document Deadline')

      itDoesNotProvideAToggleFor('description', '+ Description')
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
        await user.click(rendered.getByLabelText('Status variant'))
        await user.click(rendered.getByRole('option', { name: 'Overview w/ Reason + Amount Due' }))
      })

      it('has a box color select', async () => {
        await user.click(rendered.getByLabelText('Box Color'))
        await user.click(rendered.getByRole('option', { name: 'Benefit Blue' }))
        expect(rendered.getByLabelText('Box Color')).not.toBeNull()
      })

      it('provides a dropdown for selecting an icon', () => {
        const { baseElement } = rendered
        expect(baseElement).toHaveTextContent(/UswdsIconSelect/)
      })

      itDoesNotProvideAToggleFor('description', '+ Description')

      itDoesNotProvideAToggleFor('missing document deadline', '+ Missing Document Deadline')
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
        await user.click(rendered.getByLabelText('Status variant'))
        await user.click(
          rendered.getByRole('option', { name: 'Overview w/ Reason + Amount Breakdown' }),
        )
      })

      it('has a box color select', async () => {
        await user.click(rendered.getByLabelText('Box Color'))
        await user.click(rendered.getByRole('option', { name: 'Benefit Blue' }))
        expect(rendered.getByLabelText('Box Color')).not.toBeNull()
      })

      it('provides a dropdown for selecting an icon', () => {
        const { baseElement } = rendered
        expect(baseElement).toHaveTextContent(/UswdsIconSelect/)
      })

      itDoesNotProvideAToggleFor('description', '+ Description')

      itDoesNotProvideAToggleFor('missing document deadline', '+ Missing Document Deadline')
    })
  })
})
