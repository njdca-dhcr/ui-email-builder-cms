import React, { FC } from 'react'

interface Props {
  description: string
}

export const TEST_ID = 'footer'

export const Footer: FC<Props> = ({ description }) => {
  return <div data-testid={TEST_ID}>Footer: {description}</div>
}
