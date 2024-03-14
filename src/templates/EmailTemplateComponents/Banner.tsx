import React, { CSSProperties, FC, ReactElement } from 'react'
import { EmailComponentProps } from './shared'
import { Colors, Font, Spacing, Text } from '../styles'
import { EmailBlock } from 'src/ui'
import { useLocalStorageJSON } from 'src/utils/useLocalStorage'
import { textColorForBackground } from 'src/utils/textColorForBackground'
import { BannerValue } from 'src/appTypes'
import { appModeAsStateAbbreviation } from 'src/utils/appMode'
import { stateById } from 'src/utils/statesAndTerritories'

interface BannerMarkupProps {
  backgroundColor: string
  disableLinks?: boolean
  primaryText: string | ReactElement
  primaryLink: string
  secondaryLink: string
}

const { Row, Cell, Link } = EmailBlock

export const BannerMarkup: FC<BannerMarkupProps> = ({
  backgroundColor,
  disableLinks,
  primaryLink,
  primaryText,
  secondaryLink,
}) => {
  const Comp = disableLinks ? 'span' : Link

  const color = textColorForBackground(backgroundColor, {
    dark: Colors.black,
    light: Colors.white,
  })

  return (
    <Row
      className="banner"
      elements={[{ part: 'cell', style: { ...outerCellStyles, backgroundColor } }, 'table', 'row']}
      role="banner"
    >
      <Cell className="banner-link-container top-nav-first-link">
        <Comp to={primaryLink} style={{ ...primaryLinkStyles, color }}>
          {primaryText}
        </Comp>
      </Cell>
      <Cell
        className="banner-link-container top-nav-second-link"
        style={secondaryLinkContainerStyles}
      >
        <Comp to={secondaryLink} style={{ ...secondaryLinkStyles, color }}>
          {getHostName(secondaryLink)}
        </Comp>
      </Cell>
    </Row>
  )
}

const outerCellStyles: CSSProperties = {
  backgroundColor: Colors.black,
  fontSize: Font.size.small,
  padding: Spacing.size.large,
}

const primaryLinkStyles: CSSProperties = {
  ...Text.link.large.bold,
  color: Colors.white,
}

const secondaryLinkStyles: CSSProperties = {
  ...Text.link.large.regular,
  color: Colors.white,
}

const secondaryLinkContainerStyles: CSSProperties = {
  textAlign: 'right',
}

const getHostName = (url: string): string => {
  return url.replace(/^https?:\/\//, '').replace(/\/$/, '')
}

const defaultValue = (): BannerValue => {
  const stateAbbreviation = appModeAsStateAbbreviation() ?? 'US'
  const state = stateById(stateAbbreviation)
  const lowercasedAbbreviation = stateAbbreviation.toLowerCase()

  return {
    backgroundColor: Colors.black,
    primaryText: `${state.name} Department of Labor and Workforce Development`,
    primaryLink: `https://www.${lowercasedAbbreviation}.gov/labor/`,
    secondaryLink: `https://myunemployment.${lowercasedAbbreviation}.gov/`,
  }
}

export const useBannerValue = () => {
  return useLocalStorageJSON<BannerValue>('banner', defaultValue())
}

export const Banner: FC<EmailComponentProps<'Banner'>> = ({}) => {
  const [value] = useBannerValue()

  return <BannerMarkup {...value} />
}
