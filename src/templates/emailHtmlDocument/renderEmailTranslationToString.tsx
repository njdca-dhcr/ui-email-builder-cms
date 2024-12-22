import React, { Fragment, useCallback } from 'react'
import { renderToString } from 'react-dom/server'
import { EmailTemplate, EmailTranslation } from 'src/appTypes'
import {
  EmailTemplateState,
  useCurrentEmailTemplate,
  useCurrentTranslation,
} from 'src/utils/EmailTemplateState'
import { CurrentUserEmailConfig, useCurrentUser } from 'src/network/users'
import { UserInfoProvider } from 'src/utils/UserInfoContext'
import { EditEmailComponent } from '../EmailEditorContent/EditEmailComponent'
import { EditEmailSubComponent } from '../EmailEditorContent/EditEmailSubComponent'
import { EmailComponentSpacer } from '../EmailEditorContent/EmailComponentSpacer'
import { EmailLayout } from './EmailLayout'
import { EmailSubComponentSpacer } from '../EmailEditorContent/EmailSubComponentSpacer'
import { EmailTable } from 'src/ui'
import { getSubComponentByKind } from 'src/utils/emailTemplateUtils'
import { PreviewText } from '../PreviewText'
import { PreviewTextHtml } from '../EmailEditorContent/PreviewTextHtml'
import { Spacing } from '../styles'

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
  const components = translation.components
  const title = getSubComponentByKind(translation, 'Title')?.defaultValue?.title ?? ''

  const markup = renderToString(
    <UserInfoProvider userInfo={userInfo}>
      <EmailTemplateState emailTemplate={emailTemplate} initialLanguage={translation.language}>
        {({ currentTranslation }) => (
          <PreviewText emailTranslation={currentTranslation}>
            <EmailLayout title={title}>
              <PreviewTextHtml />
              <EmailTable
                role="presentation"
                maxWidth={Spacing.layout.maxWidth}
                style={{ margin: '0 auto' }}
              >
                {components.map((emailComponent, i) => (
                  <Fragment key={i}>
                    <EditEmailComponent emailComponent={emailComponent}>
                      {(emailComponent.subComponents ?? []).map((emailSubComponent, n) => (
                        <Fragment key={n}>
                          <EditEmailSubComponent emailSubComponent={emailSubComponent} />
                          <EmailSubComponentSpacer
                            currentSubComponent={emailSubComponent}
                            nextSubComponent={(emailComponent.subComponents ?? [])[n + 1]}
                          />
                        </Fragment>
                      ))}
                    </EditEmailComponent>
                    <EmailComponentSpacer
                      currentComponent={emailComponent}
                      nextComponent={components[i + 1]}
                    />
                  </Fragment>
                ))}
              </EmailTable>
            </EmailLayout>
          </PreviewText>
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
