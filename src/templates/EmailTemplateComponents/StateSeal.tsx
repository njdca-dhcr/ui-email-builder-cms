import React, { CSSProperties, FC } from 'react'
import { EmailComponentProps } from './shared'
import { useLocalStorageJSON } from 'src/utils/useLocalStorage'
import { EmailBlock } from 'src/ui'
import startCase from 'lodash.startcase'
import { StateSeals } from 'src/ui/StateSeal'
import { StyleDefaults, SpacingCell } from '../styles'

const defaultValue = `
<img src="/state-seals/US.png" alt="State Seal" style="width: 60px; height: 60px; margin: 0; display: block;" />
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
        <td className={StyleDefaults.layout.narrow} style={tdStyles}>
          <img
            src={`/state-seals/${StateSeals[value]}.png`}
            alt={startCase(value)}
            style={styles}
          />
        </td>
      </Row>
      <Row>
        <SpacingCell size="large" />
      </Row>
    </>
  )
}

const tdStyles: CSSProperties = {
  display: 'block',
}

const styles: CSSProperties = {
  width: '100px',
  height: '100px',
  display: 'block',
}
