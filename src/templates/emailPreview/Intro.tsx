import React, { FC } from 'react'
import { ID } from 'src/appTypes'
import { useEmailCopyData } from '../emailForm/EmailCopyData'

interface Props {
  copyId: ID
}

export const TEST_ID = 'intro'

export const Intro: FC<Props> = ({ copyId }) => {
  const { value } = useEmailCopyData(copyId)
  return <p data-testid={TEST_ID}>{value || 'Intro Placeholder'}</p>
}
