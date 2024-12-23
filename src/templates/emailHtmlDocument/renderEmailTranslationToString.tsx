import React, { useCallback } from 'react'
import { renderToString } from 'react-dom/server'
import { EmailTemplate, EmailTranslation } from 'src/appTypes'
import {
  EmailTemplateState,
  useCurrentEmailTemplate,
  useCurrentTranslation,
} from 'src/utils/EmailTemplateState'
import { CurrentUserEmailConfig, useCurrentUser } from 'src/network/users'
import { UserInfoProvider } from 'src/utils/UserInfoContext'
import { EmailLayout } from './EmailLayout'
import { getSubComponentByKind } from 'src/utils/emailTemplateUtils'
import { EmailBody } from './EmailBody'

const DOCTYPE = `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">`

interface Options {
  emailTemplate: EmailTemplate.Unique.Config
  translation: EmailTranslation.Unique
  userInfo: CurrentUserEmailConfig
}

export const renderEmailTranslationToString = ({
  translation,
  emailTemplate,
  userInfo,
}: Options): string => {
  const title = getSubComponentByKind(translation, 'Title')?.defaultValue?.title ?? ''

  const markup = renderToString(
    <UserInfoProvider userInfo={userInfo}>
      <EmailTemplateState emailTemplate={emailTemplate} initialLanguage={translation.language}>
        {() => (
          <EmailLayout title={title}>
            <EmailBody previewText={translation.previewText ?? ''} translation={translation} />
          </EmailLayout>
        )}
      </EmailTemplateState>
    </UserInfoProvider>,
  )

  return [DOCTYPE, removeContentEditableAttributes(markup)].join('')
}

const removeContentEditableAttributes = (value: string): string => {
  return value.replaceAll(/contenteditable=".+?"/g, '').replaceAll(/aria-label=".+?"/g, '')
}

export const useRenderEmailTranslationToString = () => {
  const [emailTemplate] = useCurrentEmailTemplate()
  const translation = useCurrentTranslation()
  const { data: user } = useCurrentUser()

  return useCallback(
    (options?: Partial<Options>) => {
      if (user) {
        return renderEmailTranslationToString({
          emailTemplate: options?.emailTemplate ?? emailTemplate,
          translation: options?.translation ?? translation,
          userInfo: options?.userInfo ?? user,
        })
      } else {
        return ''
      }
    },
    [emailTemplate, translation, user],
  )
}
