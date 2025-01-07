import React from 'react'
import { asMock } from 'src/testHelpers'
import { useTranslationHasChanges } from '../EmailEditorContent/SaveEmailTemplateDialog/useTranslationHasChanges'
import userEvent, { UserEvent } from '@testing-library/user-event'
import { ExitTranslationModeButton } from '../ExitTranslationModeButton'
import { useCurrentLanguage } from 'src/utils/EmailTemplateState'
import { render } from '@testing-library/react'

jest.mock('../EmailEditorContent/SaveEmailTemplateDialog/useTranslationHasChanges')
jest.mock('src/utils/EmailTemplateState')

describe('ExitTranslationModeButton', () => {
  let user: UserEvent
  let setCurrentLanguage: jest.Mock

  beforeEach(async () => {
    user = userEvent.setup()
    setCurrentLanguage = jest.fn()
    asMock(useCurrentLanguage).mockReturnValue(['spanish', setCurrentLanguage])
  })

  const renderComponent = () => {
    const rendered = render(<ExitTranslationModeButton />)

    return rendered
  }

  describe('when there are unsaved changes', () => {
    beforeEach(async () => {
      asMock(useTranslationHasChanges).mockReturnValue(true)
    })

    it('exits translation mode when the user confirms', async () => {
      jest.spyOn(window, 'confirm').mockReturnValue(true)
      const { getByRole } = await renderComponent()
      await user.click(getByRole('button', { name: 'Exit translation mode' }))

      expect(window.confirm).toHaveBeenCalled()
      expect(setCurrentLanguage).toHaveBeenCalledWith('english')
    })

    it('does not exit translation mode when the user cancels', async () => {
      jest.spyOn(window, 'confirm').mockReturnValue(false)
      const { getByRole } = await renderComponent()
      await user.click(getByRole('button', { name: 'Exit translation mode' }))

      expect(window.confirm).toHaveBeenCalled()
      expect(setCurrentLanguage).not.toHaveBeenCalled()
    })
  })

  describe('when there not unsaved changes', () => {
    beforeEach(async () => {
      asMock(useTranslationHasChanges).mockReturnValue(false)
    })

    it('sets the language to english', async () => {
      jest.spyOn(window, 'confirm').mockReturnValue(false)
      const { getByRole } = await renderComponent()
      await user.click(getByRole('button', { name: 'Exit translation mode' }))

      expect(window.confirm).not.toHaveBeenCalled()
      expect(setCurrentLanguage).toHaveBeenCalledWith('english')
    })
  })
})
