import React, { FC } from 'react'
import { useEmailCopyData } from '../emailForm/EmailCopyData'
import { ID } from 'src/appTypes'

interface Props {
  copyId: ID
  description: string
}

export const TEST_ID = 'status-input'

export const BannerInput: FC<Props> = ({ copyId, description }) => {
  const { value, onChange } = useEmailCopyData(copyId)
  return (
    <div data-testid={TEST_ID}>
      <label>
        Banner 1
        <input
          type="text"
          name="banner1"
          value={value?.banner1}
          onChange={(event) => onChange({ banner1: event.target.value, banner2: value?.banner2 })}
        />
      </label>
      <label>
        Banner 2
        <input
          type="text"
          name="banner2"
          value={value?.banner2}
          onChange={(event) => onChange({ banner1: value?.banner1, banner2: event.target.value })}
        />
      </label>
      <p>{description}</p>
    </div>
  )
}
