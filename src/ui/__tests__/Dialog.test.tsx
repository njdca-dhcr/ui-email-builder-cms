import { render } from '@testing-library/react'
import React from 'react'
import { Dialog, DialogProps } from '../Dialog'
import userEvent, { UserEvent } from '@testing-library/user-event'
import { faker } from '@faker-js/faker'

describe('Dialog', () => {
  const renderComponent = (props?: Partial<DialogProps>) => {
    return render(
      <Dialog
        title={faker.lorem.words(3)}
        contents={() => <p>{faker.lorem.sentence()}</p>}
        trigger={<button>Open</button>}
        {...props}
      />,
    )
  }

  describe('when closed', () => {
    it('opens the dialog when the trigger is clicked', async () => {
      const user = userEvent.setup()
      const title = faker.lorem.words(3)
      const { getByRole, baseElement } = renderComponent({ title })
      expect(baseElement.querySelector('[data-state="open"]')).toBeNull()
      await user.click(getByRole('button', { name: 'Open' }))
      expect(baseElement.querySelector('[data-state="open"]')).not.toBeNull()
    })
  })

  describe('when open', () => {
    let user: UserEvent

    beforeEach(() => {
      user = userEvent.setup()
    })

    const renderAndOpenDialog = async (props: Partial<DialogProps>) => {
      const rendered = renderComponent(props)
      await user.click(rendered.getByRole('button', { name: 'Open' }))
      return rendered
    }

    it('displays the given title', async () => {
      const title = faker.lorem.words(3)
      const titleClassName = faker.lorem.word()
      const { baseElement } = await renderAndOpenDialog({ title, titleClassName })
      expect(baseElement.querySelector(`.${titleClassName}`)).toHaveTextContent(title)
    })

    it('renders a visually hidden description', async () => {
      const description = faker.lorem.words(3)
      const { baseElement } = await renderAndOpenDialog({ description })
      expect(baseElement.querySelector(`.dialog-description`)).toHaveTextContent(description)
      // checks for visually hidden
      expect(baseElement.querySelector(`span > .dialog-description`)).toBeTruthy()
    })

    it('closes when the close button is clicked', async () => {
      const { baseElement, getByRole } = await renderAndOpenDialog({})

      expect(baseElement.querySelector('[data-state="open"]')).not.toBeNull()
      await user.click(getByRole('button', { name: 'Close' }))
      expect(baseElement.querySelector('[data-state="open"]')).toBeNull()
    })

    it('displays its contents', async () => {
      const text = faker.lorem.paragraph()
      const { baseElement } = await renderAndOpenDialog({
        contents: () => <p>{text}</p>,
      })
      expect(baseElement).toContainHTML(`<p>${text}</p>`)
    })

    it('yields a close button to the contents function', async () => {
      const { baseElement, getByRole } = await renderAndOpenDialog({
        contents: ({ close }) => (
          <div>
            <button onClick={close}>Contents Close</button>
          </div>
        ),
      })

      expect(baseElement.querySelector('[data-state="open"]')).not.toBeNull()
      await user.click(getByRole('button', { name: 'Contents Close' }))
      expect(baseElement.querySelector('[data-state="open"]')).toBeNull()
    })
  })
})
