import React, { FC, Fragment } from 'react'
import { EmailTranslation } from 'src/appTypes'
import { PreviewTextHtml } from '../EmailEditorContent/PreviewTextHtml'
import { EmailTable } from 'src/ui'
import { Spacing } from '../styles'
import { EditEmailComponent } from '../EmailEditorContent/EditEmailComponent'
import { EditEmailSubComponent } from '../EmailEditorContent/EditEmailSubComponent'
import { EmailSubComponentSpacer } from '../EmailEditorContent/EmailSubComponentSpacer'
import { EmailComponentSpacer } from '../EmailEditorContent/EmailComponentSpacer'

interface Props {
  previewText: string
  translation: EmailTranslation.Unique
}

export const EmailBody: FC<Props> = ({ previewText, translation }) => {
  const components = translation.components

  return (
    <>
      <PreviewTextHtml value={previewText} />
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
    </>
  )
}
