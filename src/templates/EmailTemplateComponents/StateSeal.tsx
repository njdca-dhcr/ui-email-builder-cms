import React, { CSSProperties, FC } from 'react'
import { EmailComponentProps } from './shared'
import { useLocalStorageJSON } from 'src/utils/useLocalStorage'
import { EmailBlock } from 'src/ui'
import startCase from 'lodash.startcase'
import { StateSeals } from 'src/ui/StateSeal'


const defaultValue = `
<img src="/state-seals/US.png" alt="State Seal" style="width: 100px; height: 100px; margin: 0 auto; display: block;" />
`

export const useStateSealValue = () => {
  return useLocalStorageJSON<string>('stateSeal', defaultValue)
}

const { Row } = EmailBlock

export const StateSeal: FC<EmailComponentProps> = ({}) => {
  const [value] = useStateSealValue()

  return (
    <>
      <Row>
        <td style={styles}>
          <img src={`/state-seals/${StateSeals[value]}.png`} alt={startCase(value)} style={styles} />
        </td>
      </Row>
    </>
  )
}

export const styles: CSSProperties = {
  width: '100px',
  height: '100px',
  margin: '0 auto',
  display: 'block',
}
