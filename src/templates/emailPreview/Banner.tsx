import React, { FC } from 'react'
import { ID } from 'src/appTypes'
import { useEmailCopyData } from '../emailForm/EmailCopyData'

interface Props {
  copyId: ID
}

export const TEST_ID = 'status'

export const Banner: FC<Props> = ({ copyId }) => {
  const { value } = useEmailCopyData(copyId)
  return (
    <div data-testid={TEST_ID}>
      <span style={{ marginRight: 50 }}>{value?.banner1 || 'Banner1 Placeholder'}</span>
      <span>{value?.banner2 || 'Banner2 Placeholder'}</span>
    </div>
  )
}
