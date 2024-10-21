import { faker } from '@faker-js/faker'
import { render } from '@testing-library/react'
import React from 'react'
import { DestroyDialog } from '../DestroyDialog'
import userEvent, { UserEvent } from '@testing-library/user-event'

describe('DestroyDialog', () => {
  let trigger: string
  let title: string
  let description: string
  let onDelete: () => Promise<void>
  let loading: boolean
  let loadingMessage: string
  let errorMessage: string | undefined
  let user: UserEvent

  beforeEach(async () => {
    trigger = faker.lorem.word()
    title = faker.lorem.words(3)
    description = faker.lorem.paragraph()
    onDelete = jest.fn()
    loading = false
    loadingMessage = faker.lorem.words(3)
    user = userEvent.setup()
  })

  it('displays its trigger', async () => {
    const { queryByRole } = render(
      <DestroyDialog
        trigger={trigger}
        title={title}
        description={description}
        onDelete={onDelete}
        loading={loading}
        loadingMessage={loadingMessage}
        errorMessage={errorMessage}
      />,
    )
    const button = queryByRole('button')
    expect(button).not.toBeNull()
    expect(button).toHaveClass('destroy-dialog-trigger')
    expect(button).toHaveTextContent(trigger)
  })

  describe('when open', () => {
    const renderAndOpen = async () => {
      const result = render(
        <DestroyDialog
          trigger={trigger}
          title={title}
          description={description}
          onDelete={onDelete}
          loading={loading}
          loadingMessage={loadingMessage}
          errorMessage={errorMessage}
        />,
      )
      await user.click(result.getByRole('button'))
      return result
    }

    it('displays its title', async () => {
      const { queryByText } = await renderAndOpen()
      expect(queryByText(title)).not.toBeNull()
    })

    it('displays its description', async () => {
      const { queryByText } = await renderAndOpen()
      expect(queryByText(description)).not.toBeNull()
    })

    it('calls onDelete when the delete form is submitted', async () => {
      const { baseElement } = await renderAndOpen()

      const form = baseElement.querySelector('form')
      expect(form).not.toBeNull()

      const button = form!.querySelector('button[type="submit"]')
      expect(button).not.toBeNull()
      expect(button).toHaveTextContent(trigger)

      await user.click(button!)
      expect(onDelete).toHaveBeenCalled()
    })

    it('closes after the onDelete completes', async () => {
      const { baseElement } = await renderAndOpen()

      const form = baseElement.querySelector('form')
      expect(form).not.toBeNull()

      const button = form!.querySelector('button[type="submit"]')
      expect(button).not.toBeNull()
      expect(button).toHaveTextContent(trigger)

      await user.click(button!)
      expect(baseElement.querySelector('form')).toBeNull()
    })

    it('displays the loading message when loading', async () => {
      loading = true
      const { queryByRole } = await renderAndOpen()
      const loadingAlert = queryByRole('alert')
      expect(loadingAlert).not.toBeNull()
      expect(loadingAlert).toHaveTextContent(loadingMessage)
    })

    it('does not display the loading message when not loading', async () => {
      loading = false
      const { queryByRole } = await renderAndOpen()
      const loadingAlert = queryByRole('alert')
      expect(loadingAlert).toBeNull()
    })

    it('displays a given error message', async () => {
      errorMessage = faker.lorem.paragraph()
      const { queryByText } = await renderAndOpen()
      expect(queryByText(errorMessage)).not.toBeNull()
    })
  })
})
