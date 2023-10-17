import React, { FC } from 'react'
import emailCSS from '!!raw-loader!./email.css'
import editingEmailCSS from '!!raw-loader!./editingEmail.css'
import completeEmailCSS from '!!raw-loader!./completeEmail.css'

const Style: FC<{ css: string }> = ({ css }) => {
  if (typeof css === 'string') {
    return <style>{css}</style>
  }

  return null
}

export const EmailCSS: FC = () => {
  return <Style css={emailCSS} />
}

export const EditingEmailCSS: FC = () => {
  return (
    <>
      <EmailCSS />
      <Style css={editingEmailCSS} />
    </>
  )
}

export const CompleteEmailCSS: FC = () => {
  return (
    <>
      <EmailCSS />
      <Style css={completeEmailCSS} />
    </>
  )
}
