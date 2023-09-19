import React, { FC } from 'react'
import { useEmailCopyData } from '../emailForm/EmailCopyData'
import { ID } from 'src/appTypes'

interface Props {
  copyId: ID
  description: string
}

export const TEST_ID = 'header-input'

export const HeaderInput: FC<Props> = ({ copyId, description }) => {
  const { value, onChange } = useEmailCopyData(copyId)
  return (
    <div data-testid={TEST_ID}>
      <label>
        Header
        <input
          type="text"
          name="header"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      </label>
      <p>{description}</p>
    </div>
  )
}
