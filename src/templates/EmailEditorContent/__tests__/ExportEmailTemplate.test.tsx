import { render } from '@testing-library/react'
import userEvent, { UserEvent } from '@testing-library/user-event'
import React from 'react'
import { EmailTemplate, EmailTranslation } from 'src/appTypes'
import { useRenderEmailTranslationToString } from 'src/templates/emailHtmlDocument/renderEmailTranslationToString'
import {
  asMock,
  buildEmailTranslation,
  buildUniqueEmailConfig,
  buildUseMutationResult,
} from 'src/testHelpers'
import { ExportEmailTemplate } from '../ExportEmailTemplate'
import { faker } from '@faker-js/faker'
import copy from 'copy-to-clipboard'
import { download } from 'src/utils/download'
import { useExportImage } from 'src/network/useExportImage'

jest.mock('src/utils/download')
jest.mock('src/templates/emailHtmlDocument/renderEmailTranslationToString')
jest.mock('src/network/useExportImage')

describe('ExportEmailTemplate', () => {
  let emailTemplate: EmailTemplate.Unique.Config
  let emailTranslation: EmailTranslation.Unique
  let alertSpy: jest.SpyInstance
  let user: UserEvent
  let mockRenderEmailToString: jest.Mock
  let mutateImage: jest.Mock

  beforeEach(() => {
    user = userEvent.setup()
    alertSpy = jest.spyOn(window, 'alert')
    alertSpy.mockReturnValue(false)
    mockRenderEmailToString = jest.fn()
    asMock(useRenderEmailTranslationToString).mockReturnValue(mockRenderEmailToString)
    mutateImage = jest.fn()
    asMock(useExportImage).mockReturnValue(buildUseMutationResult({ mutate: mutateImage }))

    emailTranslation = buildEmailTranslation({ language: 'english' })
    emailTemplate = buildUniqueEmailConfig({ translations: [emailTranslation] })
  })

  describe('exporting an image', () => {
    it('allows users to export an image', async () => {
      const htmlForImage = jest.fn()
      const html = faker.lorem.paragraph()
      htmlForImage.mockReturnValue(html)
      const { getByText, getByRole } = render(
        <ExportEmailTemplate
          emailTemplate={emailTemplate}
          emailTranslation={emailTranslation}
          htmlForImage={htmlForImage}
          previewText=""
        />,
      )

      await user.click(getByRole('button', { name: 'Share' }))
      await user.click(getByText('Export Image'))

      expect(htmlForImage).toHaveBeenCalled()
      expect(mutateImage).toHaveBeenCalledWith(html, expect.anything())
    })
  })

  describe('copying email markup', () => {
    it('allows it when there is preview text', async () => {
      const mockHtml = faker.lorem.paragraph()
      mockRenderEmailToString.mockReturnValue(mockHtml)

      const { getByText, getByRole } = render(
        <ExportEmailTemplate
          emailTemplate={emailTemplate}
          emailTranslation={emailTranslation}
          htmlForImage={jest.fn()}
          previewText={faker.lorem.word()}
        />,
      )

      expect(copy).not.toHaveBeenCalled()
      await user.click(getByRole('button', { name: 'Share' }))
      await user.click(getByText('Copy HTML'))
      expect(copy).toHaveBeenCalled()

      const lastArgumentToCopy: string = (copy as jest.Mock).mock.calls[0][0]
      expect(lastArgumentToCopy).toEqual(mockHtml)
      expect(mockRenderEmailToString).toHaveBeenCalledWith({
        emailTemplate,
        translation: emailTranslation,
      })
    })

    it('alerts when there is no preview text', async () => {
      const { getByText, getByRole } = render(
        <ExportEmailTemplate
          emailTemplate={emailTemplate}
          emailTranslation={emailTranslation}
          htmlForImage={jest.fn()}
          previewText="  "
        />,
      )
      await user.click(getByRole('button', { name: 'Share' }))
      await user.click(getByText('Copy HTML'))

      expect(alertSpy).toHaveBeenCalledWith('Please add Preview Text before exporting HTML')
      expect(alertSpy).toHaveBeenCalledTimes(1)
      expect(copy).not.toHaveBeenCalled()
    })
  })

  describe('downloading email markup', () => {
    it('allows it when there is preview text', async () => {
      const mockHtml = faker.lorem.paragraph()
      mockRenderEmailToString.mockReturnValue(mockHtml)

      const { getByText, getByRole } = render(
        <ExportEmailTemplate
          emailTemplate={emailTemplate}
          emailTranslation={emailTranslation}
          htmlForImage={jest.fn()}
          previewText={faker.lorem.word()}
        />,
      )

      expect(download).not.toHaveBeenCalled()
      await user.click(getByRole('button', { name: 'Share' }))
      await user.click(getByText('Download HTML'))
      expect(download).toHaveBeenCalled()

      const [{ fileData: givenHtml, fileName: givenFileName, fileType: givenType }] = (
        download as jest.Mock
      ).mock.calls[0]
      expect(givenHtml).toEqual(mockHtml)
      expect(givenFileName).toEqual(`${emailTemplate.name}.html`)
      expect(givenType).toEqual('text/html')
      expect(mockRenderEmailToString).toHaveBeenCalledWith({
        emailTemplate,
        translation: emailTranslation,
      })
    })

    it('alerts when there is not preview text', async () => {
      const { getByText, getByRole } = render(
        <ExportEmailTemplate
          emailTemplate={emailTemplate}
          emailTranslation={emailTranslation}
          htmlForImage={jest.fn()}
          previewText="  "
        />,
      )
      await user.click(getByRole('button', { name: 'Share' }))
      await user.click(getByText('Download HTML'))

      expect(alertSpy).toHaveBeenCalledWith('Please add Preview Text before exporting HTML')
      expect(download).not.toHaveBeenCalled()
      expect(alertSpy).toHaveBeenCalledTimes(1)
    })
  })
})
