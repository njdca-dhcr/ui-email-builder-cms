import React, { CSSProperties, FC, ReactElement } from 'react'
import { EmailComponentProps } from './shared'
import { useLocalStorageJSON } from 'src/utils/useLocalStorage'
import { EmailBlock } from 'src/ui'
import startCase from 'lodash.startcase'
import { StateSealKey, StateSeals } from 'src/ui/StateSeal'
import { Spacing, SpacingCell, StyleDefaults, Text } from '../styles'
import Config from '../../../gatsby-config'

export interface StateSealValue {
  stateSealKey: StateSealKey
  additionalDisclaimer: string
  [key: string]: null | string
}

const defaultValue: StateSealValue = {
  additionalDisclaimer: `The [Insert State] Department of Labor and Workforce Development is an equal opportunity employer and provides equal opportunity programs. Auxiliary aids and services are available upon request to assist individuals with disabilities.`,
  stateSealKey: 'US',
}

export const useStateSealValue = () => {
  return useLocalStorageJSON<StateSealValue>('stateSeal', defaultValue)
}

const { Row, Cell } = EmailBlock

interface StateSealMarkupProps {
  stateSealKey: StateSealKey
  additionalDisclaimer: string | ReactElement
}

export const StateSealMarkup: FC<StateSealMarkupProps> = ({
  additionalDisclaimer,
  stateSealKey,
}) => {
  return (
    <>
      <Row>
        <Cell className={StyleDefaults.layout.narrow} style={additionalDisclaimerStyles}>
          {additionalDisclaimer}
        </Cell>
      </Row>
      <Row>
        <SpacingCell size="medium" />
      </Row>
      <Row>
        <Cell className={StyleDefaults.layout.narrow} style={imageContainerStyles}>
          <img
            src={`${Config.siteMetadata?.siteUrl}/state-seal-designation/${StateSeals[stateSealKey]}.png`}
            alt={startCase(stateSealKey)}
            style={imageStyles}
          />
        </Cell>
      </Row>
    </>
  )
}

export const StateSeal: FC<EmailComponentProps> = ({}) => {
  const [value] = useStateSealValue()

  return (
    <StateSealMarkup
      additionalDisclaimer={value.additionalDisclaimer}
      stateSealKey={value.stateSealKey}
    />
  )
}

const additionalDisclaimerStyles: CSSProperties = {
  ...StyleDefaults.inline.colors,
  ...Text.caption.small.regular,
  color: '#777777',
  lineHeight: 1.5,
}

const imageContainerStyles: CSSProperties = {
  ...StyleDefaults.inline.colors,
  display: 'block',
}

const imageStyles: CSSProperties = {
  height: 30,
  display: 'block',
}
