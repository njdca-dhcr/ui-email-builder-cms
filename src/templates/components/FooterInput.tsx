import React, { FC } from 'react'
import { ID } from 'src/appTypes'
import { useEmailCopyData } from './EmailCopyData'

interface Props {
  copyId: ID
  description: string
}

export const TEST_ID = 'footer-input'

export const FooterInput: FC<Props> = ({ copyId, description }) => {
  const { value, onChange } = useEmailCopyData(copyId)
  return (
    <div data-testid={TEST_ID}>
      <label>
        Footer
        <input
          type="text"
          name="footer"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      </label>
      <p>{description}</p>
    </div>
  )
}
