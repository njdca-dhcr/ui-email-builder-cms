import React, { FC } from 'react'
import { ID } from 'src/appTypes'
import { useEmailCopyData } from './EmailCopyData'

interface Props {
  copyId: ID
}

export const TEST_ID = 'header'

export const Header: FC<Props> = ({ copyId }) => {
  const { value } = useEmailCopyData(copyId)
  return <h1 data-testid={TEST_ID}>{value || 'Header Placeholder'}</h1>
}
