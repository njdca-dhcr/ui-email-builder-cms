import React, { FC } from 'react'
import { ID } from 'src/appTypes'
import { useEmailCopyData } from '../emailForm/EmailCopyData'

interface Props {
  copyId: ID
}

export const TEST_ID = 'footer'

export const Footer: FC<Props> = ({ copyId }) => {
  const { value } = useEmailCopyData(copyId)
  return <div data-testid={TEST_ID}>{value || 'Footer Placeholder'}</div>
}
