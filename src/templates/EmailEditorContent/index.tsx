import React, { FC, useState } from 'react'
import Root from 'react-shadow'
import classNames from 'classnames'
import { EmailTemplate } from 'src/appTypes'
import { EditEmailComponent } from './EditEmailComponent'
import { EditEmailSubComponent } from './EditEmailSubComponent'
import './EmailEditorContent.css'
import { VisuallyHidden } from '@reach/visually-hidden'

interface Props {
  emailTemplate: EmailTemplate.Config
}

export const EmailEditorContent: FC<Props> = ({ emailTemplate }) => {
  const [previewType, setPreviewType] = useState<'desktop' | 'mobile'>('desktop')
  const isPreviewDesktop = previewType === 'desktop'
  const isPreviewMobile = !isPreviewDesktop

  return (
    <>
      <div className="desktop-mobile-buttons">
        <fieldset>
          <VisuallyHidden>
            <legend>Select preview type</legend>
          </VisuallyHidden>
          <label>
            Desktop
            <VisuallyHidden>
              <input
                type="radio"
                onChange={() => setPreviewType('desktop')}
                checked={isPreviewDesktop}
              />
            </VisuallyHidden>
          </label>
          <label>
            Mobile
            <VisuallyHidden>
              <input
                type="radio"
                onChange={() => setPreviewType('mobile')}
                checked={isPreviewMobile}
              />
            </VisuallyHidden>
          </label>
        </fieldset>
      </div>
      <Root.div
        className={classNames('email-preview', {
          'email-preview-desktop': isPreviewDesktop,
          'email-preview-mobile': isPreviewMobile,
        })}
      >
        <div>
          <table width="100%" cellPadding="0" cellSpacing="0" border={0}>
            <tbody>
              {(emailTemplate.components ?? []).map((emailComponent, i) => (
                <EditEmailComponent key={i} emailComponent={emailComponent} id={`${i}`}>
                  {(emailComponent.subComponents ?? []).map((emailSubComponent, n) => (
                    <EditEmailSubComponent
                      key={n}
                      componentId={`${i}`}
                      id={`${n}`}
                      emailSubComponent={emailSubComponent}
                    />
                  ))}
                </EditEmailComponent>
              ))}
            </tbody>
          </table>
        </div>
      </Root.div>
    </>
  )
}
