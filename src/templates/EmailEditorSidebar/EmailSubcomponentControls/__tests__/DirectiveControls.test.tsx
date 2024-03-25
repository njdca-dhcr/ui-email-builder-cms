import React from 'react'
import userEvent, { UserEvent } from '@testing-library/user-event'
import { RenderResult, render } from '@testing-library/react'
import { faker } from '@faker-js/faker'
import { DirectiveControls } from '../DirectiveControls'
import { EmailPartsContent } from 'src/templates/EmailPartsContent'
import { buildUniqueEmailSubComponent } from 'src/testHelpers'
import { DirectiveVariant } from 'src/appTypes'

describe('DirectiveControls', () => {
  it('provides a dropdown for selecting a variant', async () => {
    const user = userEvent.setup()
    const { getByRole, queryByRole } = render(
      <EmailPartsContent>
        <DirectiveControls
          emailSubComponent={buildUniqueEmailSubComponent('Body', { kind: 'Directive' })}
        />
        ,
      </EmailPartsContent>,
    )
    let button = queryByRole('button')
    expect(button).not.toBeNull()
    expect(button).toHaveTextContent('One Step')

    await user.click(button!)
    await user.click(getByRole('option', { name: 'Pay Online' }))

    button = queryByRole('button')
    expect(button).not.toBeNull()
    expect(button).toHaveTextContent('Pay Online')
  })

  it('provides a color picker for the background color', async () => {
    const user = userEvent.setup()
    const { getByLabelText } = render(
      <EmailPartsContent>
        <DirectiveControls
          emailSubComponent={buildUniqueEmailSubComponent('Body', { kind: 'Directive' })}
        />
        ,
      </EmailPartsContent>,
    )
    const color = faker.color.rgb()
    const colorPicker = getByLabelText('Button Color')
    const hexInput = getByLabelText('Button Color Hex Code')
    await user.clear(hexInput)
    await user.type(hexInput, color.replace('#', ''))
    expect(hexInput).toHaveValue(color)
    expect(colorPicker).toHaveValue(color)
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

    beforeEach(() => {
      user = userEvent.setup()
    })

    describe(DirectiveVariant.OneStep, () => {
      beforeEach(async () => {
        rendered = render(
          <EmailPartsContent>
            <DirectiveControls
              emailSubComponent={buildUniqueEmailSubComponent('Body', { kind: 'Directive' })}
            />
          </EmailPartsContent>,
        )
      })

      itProvidesAToggleFor('title', '+ Title')

      itProvidesAToggleFor('show label', '+ Label')
    })

    describe(DirectiveVariant.ThreeStep, () => {
      beforeEach(async () => {
        rendered = render(
          <EmailPartsContent>
            <DirectiveControls
              emailSubComponent={buildUniqueEmailSubComponent('Body', { kind: 'Directive' })}
            />
          </EmailPartsContent>,
        )
        await user.click(rendered.getByRole('button', { name: 'Directive variant One Step' }))
        await user.click(rendered.getByRole('option', { name: 'Three Steps' }))
      })

      itProvidesAToggleFor('title', '+ Title')

      itProvidesAToggleFor('show label', '+ Label')

      itProvidesAToggleFor('step 1 additional content', 'Step 1 Additional Content')

      itProvidesAToggleFor('step 2 additional content', 'Step 2 Additional Content')

      itProvidesAToggleFor('step 3 additional content', 'Step 3 Additional Content')

      itProvidesAToggleFor('supportive information', '+ Supportive Information')
    })

    describe(DirectiveVariant.StepTwoExpansion, () => {
      beforeEach(async () => {
        rendered = render(
          <EmailPartsContent>
            <DirectiveControls
              emailSubComponent={buildUniqueEmailSubComponent('Body', { kind: 'Directive' })}
            />
          </EmailPartsContent>,
        )
        await user.click(rendered.getByRole('button', { name: 'Directive variant One Step' }))
        await user.click(rendered.getByRole('option', { name: 'Three Steps w/ Step 2 Expansion' }))
      })

      itProvidesAToggleFor('title', '+ Title')

      itProvidesAToggleFor('show label', '+ Label')

      itProvidesAToggleFor('step 1 additional content', 'Step 1 Additional Content')

      itProvidesAToggleFor('step 2 additional content', 'Step 2 Additional Content')

      itProvidesAToggleFor('step 3 additional content', 'Step 3 Additional Content')

      itProvidesAToggleFor('supportive information', '+ Supportive Information')
    })

    describe(DirectiveVariant.PayOnline, () => {
      beforeEach(async () => {
        rendered = render(
          <EmailPartsContent>
            <DirectiveControls
              emailSubComponent={buildUniqueEmailSubComponent('Body', { kind: 'Directive' })}
            />
          </EmailPartsContent>,
        )
        await user.click(rendered.getByRole('button', { name: 'Directive variant One Step' }))
        await user.click(rendered.getByRole('option', { name: 'Pay Online' }))
      })

      itProvidesAToggleFor('title', '+ Title')

      itProvidesAToggleFor('show label', '+ Label')
    })
  })
})
