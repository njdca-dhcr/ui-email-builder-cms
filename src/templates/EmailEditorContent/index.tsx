import React, { FC } from 'react'
import Root from 'react-shadow'
import classNames from 'classnames'
import { EmailTemplate } from 'src/appTypes'
import { EditEmailComponent } from './EditEmailComponent'
import { EditEmailSubComponent } from './EditEmailSubComponent'
import './EmailEditorContent.css'

interface Props {
  emailTemplate: EmailTemplate.Config
}

export const EmailEditorContent: FC<Props> = ({ emailTemplate }) => {
  return (
    <>
      <div className="desktop-mobile-buttons">desktop/mobile</div>
      <Root.div className={classNames('email-preview')}>
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
