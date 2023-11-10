import React, { CSSProperties, FC } from 'react'
import { EmailComponentProps } from './shared'
import { useLocalStorageJSON } from 'src/utils/useLocalStorage'
import { EmailBlock } from 'src/ui'
import startCase from 'lodash.startcase'
import { StateSealKey, StateSeals } from 'src/ui/StateSeal'
import { StyleDefaults } from '../styles'
import Config from '../../../gatsby-config'

const defaultValue: StateSealKey = 'US'

export const useStateSealValue = () => {
  return useLocalStorageJSON<StateSealKey>('stateSeal', defaultValue)
}

const { Row } = EmailBlock

export const StateSeal: FC<EmailComponentProps> = ({}) => {
  const [value] = useStateSealValue()

  return (
    <Row>
      <td className={StyleDefaults.layout.narrow} style={tdStyles}>
        <img
          src={`${Config.siteMetadata?.siteUrl}/state-seal-designation/${StateSeals[value]}.png`}
          alt={startCase(value)}
          style={styles}
        />
      </td>
    </Row>
  )
}

const tdStyles: CSSProperties = {
  ...StyleDefaults.inline.colors,
  display: 'block',
}

const styles: CSSProperties = {
  height: '30px',
  display: 'block',
}
