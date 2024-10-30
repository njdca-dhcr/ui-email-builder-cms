import React, { CSSProperties, FC, ReactElement } from 'react'
import { EmailComponentProps } from './shared'
import { EmailBlock } from 'src/ui'
import { stateSealFor } from 'src/utils/StateSeal'
import { SpacingCell, StyleDefaults, Text } from '../styles'
import { buildStateSealUrl } from 'src/utils/siteUrl'
import { StateAbbreviation, stateById } from 'src/utils/statesAndTerritories'
import capitalize from 'lodash.capitalize'
import { useUserInfoValue } from 'src/utils/UserInfoContext'
import { stateSealSchema } from 'src/utils/userInfoSchemas'
import { defaultStateSealValue } from './Values/StateSealValue'

export const useStateSealValue = () =>
  useUserInfoValue('stateSeal', defaultStateSealValue(), stateSealSchema)

const { Row, Cell } = EmailBlock

interface StateSealMarkupProps {
  additionalDisclaimer: string | ReactElement
  leftJustify?: boolean
  stateAbbreviation: StateAbbreviation
}

export const StateSealMarkup: FC<StateSealMarkupProps> = ({
  additionalDisclaimer,
  leftJustify,
  stateAbbreviation,
}) => {
  const className = leftJustify ? '' : StyleDefaults.layout.narrow

  const state = stateById(stateAbbreviation)
  const stateSeal = stateSealFor(stateAbbreviation)
  const stateTitle = state.title ?? `${capitalize(state.kind)} of ${state.name}`

  return (
    <>
      <Row className="state-seal-disclaimer">
        <Cell className={className} style={additionalDisclaimerStyles}>
          {additionalDisclaimer}
        </Cell>
      </Row>
      {stateSeal && (
        <>
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
                src={buildStateSealUrl(`/${stateSeal.image}.png`)}
                alt={`The seal of the ${stateTitle}`}
                style={imageStyles}
              />
              {stateSeal.darkModeImage && (
                <img
                  className="darkmode"
                  src={buildStateSealUrl(`/${stateSeal.darkModeImage}.png`)}
                  alt={`The seal of the ${stateTitle}`}
                  style={imageStyles}
                />
              )}
            </Cell>
            <Cell style={textStyles}>{stateTitle}</Cell>
          </Row>
        </>
      )}
    </>
  )
}

export const StateSeal: FC<EmailComponentProps<'StateSeal'>> = ({}) => {
  const [value] = useStateSealValue()

  return (
    <StateSealMarkup
      additionalDisclaimer={value.additionalDisclaimer}
      stateAbbreviation={value.stateAbbreviation}
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
