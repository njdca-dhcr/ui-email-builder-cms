import React from 'react'
import { asMock } from 'src/testHelpers'
import { useTranslationHasChanges } from '../EmailEditorContent/SaveEmailTemplateDialog/useTranslationHasChanges'
import userEvent, { UserEvent } from '@testing-library/user-event'
import { ExitTranslationModeButton, Props } from '../ExitTranslationModeButton'
import { useCurrentLanguage } from 'src/utils/EmailTemplateState'
import { render } from '@testing-library/react'
import { faker } from '@faker-js/faker'

jest.mock('../EmailEditorContent/SaveEmailTemplateDialog/useTranslationHasChanges')
jest.mock('src/utils/EmailTemplateState')

describe('ExitTranslationModeButton', () => {
  let user: UserEvent
  let setCurrentLanguage: jest.Mock
  let onExit: jest.Mock

  beforeEach(async () => {
    user = userEvent.setup()
    onExit = jest.fn()
    setCurrentLanguage = jest.fn()
    asMock(useCurrentLanguage).mockReturnValue(['spanish', setCurrentLanguage])
  })

  const renderComponent = (options?: Partial<Props>) => {
    const rendered = render(
      <ExitTranslationModeButton label={faker.lorem.word()} onExit={onExit} {...options} />,
    )

    return rendered
  }

  it('displays the given label', async () => {
    const label = faker.lorem.word()
    const { queryByRole } = renderComponent({ label })
    expect(queryByRole('button', { name: label })).toBeTruthy()
  })

  describe('when there are unsaved changes', () => {
    beforeEach(async () => {
      asMock(useTranslationHasChanges).mockReturnValue(true)
    })

    it('exits translation mode when the user confirms', async () => {
      jest.spyOn(window, 'confirm').mockReturnValue(true)
      const label = 'Exit translation mode'
      const { getByRole } = await renderComponent({ label })
      await user.click(getByRole('button', { name: label }))

      expect(window.confirm).toHaveBeenCalled()
      expect(setCurrentLanguage).toHaveBeenCalledWith('english')
      expect(onExit).toHaveBeenCalled()
    })

    it('does not exit translation mode when the user cancels', async () => {
      jest.spyOn(window, 'confirm').mockReturnValue(false)
      const label = 'Exit translation mode'
      const { getByRole } = await renderComponent({ label })
      await user.click(getByRole('button', { name: label }))

      expect(window.confirm).toHaveBeenCalled()
      expect(setCurrentLanguage).not.toHaveBeenCalled()
      expect(onExit).not.toHaveBeenCalled()
    })
  })

  describe('when there not unsaved changes', () => {
    beforeEach(async () => {
      asMock(useTranslationHasChanges).mockReturnValue(false)
    })

    it('sets the language to english', async () => {
      jest.spyOn(window, 'confirm').mockReturnValue(false)
      const label = faker.lorem.word()
      const { getByRole } = await renderComponent({ label })
      await user.click(getByRole('button', { name: label }))

      expect(window.confirm).not.toHaveBeenCalled()
      expect(setCurrentLanguage).toHaveBeenCalledWith('english')
    })
  })

  describe('when there not unsaved changes but force is true', () => {
    beforeEach(async () => {
      asMock(useTranslationHasChanges).mockReturnValue(false)
    })

    it('exits translation mode when the user confirms', async () => {
      jest.spyOn(window, 'confirm').mockReturnValue(true)
      const label = 'Exit translation mode'
      const { getByRole } = await renderComponent({ label, forceWarning: true })
      await user.click(getByRole('button', { name: label }))

      expect(window.confirm).toHaveBeenCalled()
      expect(setCurrentLanguage).toHaveBeenCalledWith('english')
    })

    it('does not exit translation mode when the user cancels', async () => {
      jest.spyOn(window, 'confirm').mockReturnValue(false)
      const label = 'Exit translation mode'
      const { getByRole } = await renderComponent({ label, forceWarning: true })
      await user.click(getByRole('button', { name: label }))

      expect(window.confirm).toHaveBeenCalled()
      expect(setCurrentLanguage).not.toHaveBeenCalled()
    })
  })
})
