import React, { CSSProperties, FC, ReactElement } from 'react'
import { EmailComponentProps } from './shared'
import { useLocalStorageJSON } from 'src/utils/useLocalStorage'
import { EmailBlock } from 'src/ui'
import startCase from 'lodash.startcase'
import { StateSealKey, StateSeals } from 'src/ui/StateSeal'
import { SpacingCell, StyleDefaults, Text } from '../styles'
import { buildSiteUrl } from 'src/utils/siteUrl'
import { isAllStatesMode } from 'src/utils/appMode'
import { StateSealValue } from 'src/appTypes'

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
  additionalDisclaimer: string | ReactElement
  leftJustify?: boolean
  stateSealKey: StateSealKey
}

export const StateSealMarkup: FC<StateSealMarkupProps> = ({
  additionalDisclaimer,
  leftJustify,
  stateSealKey,
}) => {
  const className = leftJustify ? '' : StyleDefaults.layout.narrow

  const stateSeal = StateSeals[stateSealKey]
  const stateName = startCase(stateSealKey)
  const stateTitle = stateSeal.title || `State of ${stateName}`

  return (
    <>
      <Row className="state-seal-disclaimer">
        <Cell className={className} style={additionalDisclaimerStyles}>
          {additionalDisclaimer}
        </Cell>
      </Row>
      <Row className="spacer-medium">
        <SpacingCell size="medium" />
      </Row>
      <Row
        className="state-seal-image"
        elements={[
          {
            className,
            part: 'cell',
            style: StyleDefaults.inline.colors,
          },
          'table',
          'row',
        ]}
      >
        <Cell style={imageContainerStyles}>
          <img
            className="lightmode"
            src={buildSiteUrl(`/state-seals/${stateSeal.image}.png`)}
            alt={`The seal of the ${stateTitle}`}
            style={imageStyles}
          />
          {stateSeal.darkModeImage && (
            <img
              className="darkmode"
              src={buildSiteUrl(`/state-seals/${stateSeal.darkModeImage}.png`)}
              alt={`The seal of the ${stateTitle}`}
              style={imageStyles}
            />
          )}
        </Cell>
        <Cell style={textStyles}>{stateTitle}</Cell>
      </Row>
    </>
  )
}

export const StateSeal: FC<EmailComponentProps<'StateSeal'>> = ({}) => {
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
