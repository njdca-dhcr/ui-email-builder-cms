import React, { CSSProperties, FC, ReactElement } from 'react'
import { EmailComponentProps } from './shared'
import { Colors, Font, Spacing, Text } from '../styles'
import { EmailBlock } from 'src/ui'
import { textColorForBackground } from 'src/utils/textColorForBackground'
import { useUserInfoValue } from 'src/utils/UserInfoContext'
import { bannerSchema } from 'src/utils/userInfoSchemas'
import { defaultBannerValue } from './Values/BannerValue'

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

export const useBannerValue = () => useUserInfoValue('banner', defaultBannerValue(), bannerSchema)

export const Banner: FC<EmailComponentProps<'Banner'>> = ({}) => {
  const [value] = useBannerValue()

  return <BannerMarkup {...value} />
}
