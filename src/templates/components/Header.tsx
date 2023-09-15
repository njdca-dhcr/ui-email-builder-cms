import React, { FC } from 'react'

interface Props {
  description: string
}

export const TEST_ID = 'header'

export const Header: FC<Props> = ({ description }) => {
  return <div data-testid={TEST_ID}>Header: {description}</div>
}
