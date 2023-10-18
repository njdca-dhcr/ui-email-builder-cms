import React, { CSSProperties, FC, ReactElement } from 'react'
import { EmailComponentProps } from './shared'
import { Colors, Font, Spacing, SpacingCell, StyleDefaults } from '../styles'
import { EmailBlock } from 'src/ui'
import { useLocalStorageJSON } from 'src/utils/useLocalStorage'

export interface BannerValue {
  primaryText: string
  primaryLink: string
  secondaryLink: string
  [key: string]: null | string
}

interface BannerMarkupProps {
  disableLinks?: boolean
  primaryText: string | ReactElement
  primaryLink: string
  secondaryLink: string
}

const { Row, Cell, Link } = EmailBlock

export const BannerMarkup: FC<BannerMarkupProps> = ({
  disableLinks,
  primaryLink,
  primaryText,
  secondaryLink,
}) => {
  const Comp = disableLinks ? 'span' : Link

  return (
    <Row elements={[{ part: 'cell', style: outerCellStyles }, 'table', 'row']}>
      <Cell className="banner-link-container">
        <Comp to={primaryLink} style={primaryLinkStyles}>
          {primaryText}
        </Comp>
      </Cell>
      <Cell className="banner-link-container" style={secondaryLinkContainerStyles}>
        <Comp to={secondaryLink} style={secondaryLinkStyles}>
          {getHostName(secondaryLink)}
        </Comp>
      </Cell>
    </Row>
  )
}

const outerCellStyles: CSSProperties = {
  ...StyleDefaults.inline.fontAndColors,
  backgroundColor: Colors.black,
  fontSize: Font.size.small,
  padding: Spacing.size.large,
}

const primaryLinkStyles: CSSProperties = {
  color: Colors.white,
  fontWeight: Font.weight.bold,
  textDecoration: 'underline',
}

const secondaryLinkStyles: CSSProperties = {
  color: Colors.white,
}

const secondaryLinkContainerStyles: CSSProperties = {
  textAlign: 'right',
}

const getHostName = (url: string): string => {
  return url.replace(/^https?:\/\//, '').replace(/\/$/, '')
}

const defaultValue: BannerValue = {
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
