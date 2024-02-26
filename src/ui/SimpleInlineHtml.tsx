import React, { FC } from 'react'
import sanitizeHtml from 'sanitize-html'

interface Props {
  html: string
}

const allowedTags = ['b', 'u', 'strong']

export const SimpleInlineHtml: FC<Props> = ({ html }) => {
  const sanitized = sanitizeHtml(html, { allowedTags })
  return <span dangerouslySetInnerHTML={{ __html: sanitized }} />
}
