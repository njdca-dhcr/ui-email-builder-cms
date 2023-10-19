import React, { CSSProperties, FC } from 'react'
import { EmailBlock } from 'src/ui'

export const Colors = {
  alert: {
    error: {
      dark: '#d54309',
      light: '#f4e3db',
    },
    info: {
      dark: '#00bde3',
      light: '#e7f6f8',
    },
    success: {
      dark: '#00a91c',
      light: '#ecf3ec',
    },
    warning: {
      dark: '#ffbe2e',
      light: '#faf3d1',
    },
    neutral: {
      dark: '#3d4551',
      light: '#f0f0f0',
    },
  },
  black: '#1b1b1b',
  gray: '#71767a',
  grayDark: '#3d4551',
  grayLight: '#f5f5f5',
  white: '#ffffff',
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

export const Borders = {
  large: (color: string) => `8px solid ${color}`,
}

export const StyleDefaults = {
  layout: { narrow: 'narrow', wide: 'wide' },
  inline: {
    fontAndColors: {
      backgroundColor: Colors.white,
      color: Colors.black,
      fontFamily: Font.family.default,
      fontWeight: Font.weight.normal,
      fontSize: Font.size.medium,
      lineHeight: Font.lineHeight.default,
      letterSpacing: '-0.44px',
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
