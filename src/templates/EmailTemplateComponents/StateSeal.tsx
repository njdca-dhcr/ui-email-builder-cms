import React, { CSSProperties, FC, ReactElement } from 'react'
import { EmailComponentProps } from './shared'
import { useLocalStorageJSON } from 'src/utils/useLocalStorage'
import { EmailBlock } from 'src/ui'
import startCase from 'lodash.startcase'
import { StateSealKey, StateSeals } from 'src/ui/StateSeal'
import { SpacingCell, StyleDefaults, Text } from '../styles'
import { buildSiteUrl } from 'src/utils/siteUrl'
import { isAllStatesMode } from 'src/utils/appMode'

export interface StateSealValue {
  stateSealKey: StateSealKey
  additionalDisclaimer: string
  [key: string]: null | string
}

const defaultValue = (): StateSealValue => {
  return {
    additionalDisclaimer: `The [Insert State] Department of Labor and Workforce Development is an equal opportunity employer and provides equal opportunity programs. Auxiliary aids and services are available upon request to assist individuals with disabilities.`,
    stateSealKey: isAllStatesMode() ? 'US' : 'NewJersey',
  }
}

export const useStateSealValue = () => {
  return useLocalStorageJSON<StateSealValue>('stateSeal', defaultValue())
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
      <Row
        elements={[
          {
            part: 'cell',
            className: StyleDefaults.layout.narrow,
            style: StyleDefaults.inline.colors,
          },
          'table',
          'row',
        ]}
      >
        <Cell style={imageContainerStyles}>
          <img
            src={buildSiteUrl(`/state-seals/${StateSeals[stateSealKey].image}.png`)}
            alt={startCase(stateSealKey)}
            style={imageStyles}
          />
        </Cell>
        <Cell style={textStyles}>
          {StateSeals[stateSealKey]?.title ?? `State of ${startCase(stateSealKey)}`}
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

const imageWidth = 30

const imageContainerStyles: CSSProperties = {
  ...StyleDefaults.inline.colors,
  paddingRight: '10px',
  width: imageWidth,
}

const imageStyles: CSSProperties = {
  height: imageWidth,
}

const textStyles: CSSProperties = {
  ...Text.body.main.regular,
  color: '#5c5858',
  fontFamily: 'EB Garamond, Helvetica, Arial, sans-serif',
  textAlign: 'left',
  fontWeight: 'normal',
  fontVariant: 'small-caps',
  paddingTop: '3px',
}
