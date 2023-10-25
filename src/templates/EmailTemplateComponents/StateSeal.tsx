import React, { CSSProperties, FC } from 'react'
import { EmailComponentProps } from './shared'
import { useLocalStorageJSON } from 'src/utils/useLocalStorage'
import { EmailBlock } from 'src/ui'
import startCase from 'lodash.startcase'
import { StateSeals } from 'src/ui/StateSeal'
import { StyleDefaults, Spacing } from '../styles'
import Config from '../../../gatsby-config'


const defaultValue = `
  <img src="/state-seals/US.png" alt="State Seal" style="width: 60px; height: 60px; margin: 0; display: block;" />
`

export const useStateSealValue = () => {
  return useLocalStorageJSON<string>('stateSeal', defaultValue)
}

const { Row, Cell } = EmailBlock

export const StateSeal: FC<EmailComponentProps> = ({}) => {
  const [value] = useStateSealValue()

  return (
    <>
      <Row>
        <td className={StyleDefaults.layout.narrow} style={tdStyles}>
          <img
            src={`${Config.siteMetadata?.siteUrl}/state-seals/${StateSeals[value]}.png`}
            alt={startCase(value)}
            style={styles}
          />
        </td>
      </Row>
      <Row>
        <Cell
          style={{
            ...StyleDefaults.inline.colors,
            lineHeight: 1,
            fontSize: 10,
            height: Spacing.size.extraLarge,
          }}
        >
          &nbsp;
        </Cell>
      </Row>
    </>
  )
}

const tdStyles: CSSProperties = {
  ...StyleDefaults.inline.colors,
  display: 'block',
}

const styles: CSSProperties = {
  width: '60px',
  height: '60px',
  display: 'block',
}
