import { render } from '@testing-library/react'
import React from 'react'
import { SaveEmailTemplate } from '../SaveEmailTemplate'
import { EmailTemplateConfig } from 'src/templates/EmailTemplateConfig'
import { EmailTemplate } from 'src/appTypes'
import { buildUniqueEmailConfig } from 'src/factories'
import userEvent, { UserEvent } from '@testing-library/user-event'
import { faker } from '@faker-js/faker'

describe('SaveEmailTemplate', () => {
  let user: UserEvent
  let emailTemplateConfig: EmailTemplate.UniqueConfig

  beforeEach(() => {
    user = userEvent.setup()
    emailTemplateConfig = buildUniqueEmailConfig({
      name: faker.lorem.words(3),
      description: faker.lorem.sentence(),
    })
  })

  describe('when closed', () => {
    it('can be opened', async () => {
      const { getByRole, queryByRole } = render(
        <EmailTemplateConfig emailTemplateConfig={emailTemplateConfig}>
          <SaveEmailTemplate />
        </EmailTemplateConfig>,
      )
      expect(queryByRole('dialog')).toBeNull()
      await user.click(getByRole('button', { name: 'Save' }))
      expect(queryByRole('dialog')).not.toBeNull()
    })
  })

  describe('when open', () => {
    const renderAndOpen = async () => {
      const rendered = render(
        <EmailTemplateConfig emailTemplateConfig={emailTemplateConfig}>
          <SaveEmailTemplate />
        </EmailTemplateConfig>,
      )
      await user.click(rendered.getByRole('button', { name: 'Save' }))
      return rendered
    }

    it("uses the email template's name as the default value for name", async () => {
      const { getByRole } = await renderAndOpen()
      const input = getByRole('textbox', { name: 'Name' })
      expect(input).toHaveValue(emailTemplateConfig.name)
    })

    it("uses the email template's description as the default value for description", async () => {
      const { getByRole } = await renderAndOpen()
      const input = getByRole('textbox', { name: 'Description' })
      expect(input).toHaveValue(emailTemplateConfig.description)
    })
  })
})
