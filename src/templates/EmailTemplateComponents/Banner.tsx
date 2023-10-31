import React, { CSSProperties, FC, ReactElement } from 'react'
import { EmailComponentProps } from './shared'
import { Colors, Font, Spacing, SpacingCell, Text } from '../styles'
import { EmailBlock } from 'src/ui'
import { useLocalStorageJSON } from 'src/utils/useLocalStorage'
import { textColorForBackground } from 'src/utils/textColorForBackground'

export interface BannerValue {
  backgroundColor: string
  primaryText: string
  primaryLink: string
  secondaryLink: string
  [key: string]: null | string
}

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
      elements={[{ part: 'cell', style: { ...outerCellStyles, backgroundColor } }, 'table', 'row']}
      role="banner"
    >
      <Cell className="banner-link-container">
        <Comp to={primaryLink} style={{ ...primaryLinkStyles, color }}>
          {primaryText}
        </Comp>
      </Cell>
      <Cell className="banner-link-container" style={secondaryLinkContainerStyles}>
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

const defaultValue: BannerValue = {
  backgroundColor: Colors.black,
  primaryText: 'New Jersey Department of Labor and Workforce Development',
  primaryLink: 'https://www.nj.gov/labor/',
  secondaryLink: 'https://myunemployment.nj.gov/',
}

export const useBannerValue = () => {
  return useLocalStorageJSON<BannerValue>('banner', defaultValue)
}

export const Banner: FC<EmailComponentProps> = ({}) => {
  const [value] = useBannerValue()

  return (
    <>
      <BannerMarkup {...value} />
      <Row>
        <SpacingCell size="large" />
      </Row>
    </>
  )
}
