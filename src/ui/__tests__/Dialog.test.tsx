import { render } from '@testing-library/react'
import React from 'react'
import { Dialog, Props } from '../Dialog'
import userEvent, { UserEvent } from '@testing-library/user-event'
import { faker } from '@faker-js/faker'

describe('Dialog', () => {
  describe('when closed', () => {
    it('opens the dialog when the trigger is clicked', async () => {
      const user = userEvent.setup()
      const title = faker.lorem.words(3)
      const { getByRole, baseElement } = render(
        <Dialog
          title={title}
          contents={() => <p>{faker.lorem.sentence()}</p>}
          trigger={<button>Open</button>}
        />,
      )
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

    const renderAndOpenDialog = async (props: Partial<Props>) => {
      const rendered = render(
        <Dialog
          title={faker.lorem.words(3)}
          contents={() => <p>{faker.lorem.sentence()}</p>}
          trigger={<button>Open</button>}
          {...props}
        />,
      )
      await user.click(rendered.getByRole('button', { name: 'Open' }))
      return rendered
    }

    it('displays the given title', async () => {
      const title = faker.lorem.words(3)
      const titleClassName = faker.lorem.word()
      const { baseElement } = await renderAndOpenDialog({ title, titleClassName })
      expect(baseElement.querySelector(`.${titleClassName}`)).toHaveTextContent(title)
    })

    it('displays the given description', async () => {
      const description = faker.lorem.words(3)
      const descriptionClassName = faker.lorem.word()
      const { baseElement } = await renderAndOpenDialog({ description, descriptionClassName })
      expect(baseElement.querySelector(`.${descriptionClassName}`)).toHaveTextContent(description)
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
