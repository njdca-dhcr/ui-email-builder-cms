import React, { CSSProperties, FC } from 'react'
import { EmailBlock } from 'src/ui'

export const Colors = {
  black: '#1b1b1b',
  gray: '#71767A',
  grayDark: '#3D4551',
  grayLight: '#F5F5F5',
  warningBackground: '#FAF3D1',
  warning: '#FFBE2E',
  white: '#FFFFFF',
  blue: '#009EC1',
  blueLight: '#E7F6F8',
} as const

const sansSerif = 'Public Sans, Helvetica, Arial, sans-serif'
export const Font = {
  family: {
    sansSerif,
    default: sansSerif,
    serifMonospace: 'Roboto Mono, monospace',
  },
  lineHeight: {
    default: 1.5,
  },
  weight: {
    bold: 700,
    boldLight: 500,
    normal: 400,
  },
  size: {
    tiny: 10,
    small: 13,
    medium: 16,
    large: 22,
    extraLarge: 32,
    title: 40,
  },
} as const

export const Spacing = {
  layout: {
    maxWidth: 690,
    paddingHorizontal: {
      paddingLeft: 20,
      paddingRight: 20,
    } as CSSProperties,
    narrow: {
      paddingLeft: 20,
      paddingRight: 40,
    } as CSSProperties,
    wide: {
      paddingLeft: 20,
      paddingRight: 20,
    } as CSSProperties,
  },
  size: {
    tiny: 5,
    small: 10,
    medium: 16,
    large: 20,
    extraLarge: 25,
  },
} as const

export const DefaultStyles: CSSProperties = {
  ...Spacing.layout.paddingHorizontal,
  backgroundColor: Colors.white,
  color: Colors.black,
  fontFamily: Font.family.default,
  fontWeight: Font.weight.normal,
  fontSize: Font.size.medium,
  lineHeight: Font.lineHeight.default,
}

const defaultFontAndColors: CSSProperties = {
  backgroundColor: Colors.white,
  color: Colors.black,
  fontFamily: Font.family.default,
  fontWeight: Font.weight.normal,
  fontSize: Font.size.medium,
  lineHeight: Font.lineHeight.default,
  letterSpacing: '-2%',
}

export const StyleDefaults = {
  layout: { narrow: 'narrow', wide: 'wide' },
  inline: {
    fontAndColors: defaultFontAndColors,
  },
  inlineLayout: {
    narrow: {
      ...Spacing.layout.narrow,
      ...defaultFontAndColors,
    } as CSSProperties,
    wide: {
      ...Spacing.layout.wide,
      ...defaultFontAndColors,
    } as CSSProperties,
  },
} as const

const spacingCellSizes = {
  small: 10,
  medium: 15,
  large: 50,
}

interface SpacingCellProps {
  size: keyof typeof spacingCellSizes
}
export const SpacingCell: FC<SpacingCellProps> = ({ size }) => {
  const sizeInPixels = spacingCellSizes[size]
  return (
    <EmailBlock.Cell style={{ ...StyleDefaults.inline.fontAndColors, height: sizeInPixels }}>
      &nbsp;
    </EmailBlock.Cell>
  )
}
