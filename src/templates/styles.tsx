import React, { CSSProperties, FC } from 'react'
import { EmailBlock } from 'src/ui'

export const Colors = {
  alert: {
    error: {
      dark: '#d54309',
      light: '#f4e3db',
    },
    info: {
      dark: '#009ec1',
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
  grayLight: '#fafafa',
  white: '#ffffff',
  linkBlue: '#2277c1',
} as const

const sansSerif = 'Public Sans, Helvetica, Arial, sans-serif'

const FontWeight = {
  bold: 700,
  semibold: 600,
  boldExtra: 800,
  boldLight: 500,
  regular: 400,
}

export const Font = {
  family: {
    sansSerif,
    default: sansSerif,
    serifMonospace: 'Roboto Mono, monospace',
  },
  lineHeight: {
    default: 1.5,
  },
  letterSpacing: {
    default: '-0.44px',
  },
  weight: FontWeight,
  size: {
    tiny: 10,
    small: 13,
    medium: 16,
    large: 22,
    extraLarge: 32,
    title: 40,
  },
} as const

const defaultTextStyle = (css: CSSProperties): CSSProperties => {
  return {
    fontFamily: sansSerif,
    letterSpacing: Font.letterSpacing.default,
    lineHeight: Font.lineHeight.default,
    ...css,
  }
}
export const Text = {
  display: defaultTextStyle({
    fontSize: 56,
    fontWeight: FontWeight.boldExtra,
  }),
  header: {
    h1: {
      bold: defaultTextStyle({
        fontSize: 40,
        fontWeight: FontWeight.bold,
      }),
      regular: defaultTextStyle({
        fontSize: 40,
        fontWeight: FontWeight.regular,
      }),
    },
    h2: {
      bold: defaultTextStyle({
        fontSize: 32,
        fontWeight: FontWeight.bold,
      }),
      regular: defaultTextStyle({
        fontSize: 32,
        fontWeight: FontWeight.regular,
      }),
    },
    h3: {
      bold: defaultTextStyle({
        fontSize: 22,
        fontWeight: FontWeight.bold,
      }),
      regular: defaultTextStyle({
        fontSize: 22,
        fontWeight: FontWeight.regular,
      }),
    },
    h4: {
      bold: defaultTextStyle({
        fontSize: 16,
        fontWeight: FontWeight.bold,
      }),
      regular: defaultTextStyle({
        fontSize: 16,
        fontWeight: FontWeight.regular,
      }),
    },
    h5: {
      bold: defaultTextStyle({
        fontSize: 15,
        fontWeight: FontWeight.bold,
      }),
      regular: defaultTextStyle({
        fontSize: 15,
        fontWeight: FontWeight.regular,
      }),
    },
    h6: {
      bold: defaultTextStyle({
        fontSize: 13,
        fontWeight: FontWeight.bold,
      }),
      regular: defaultTextStyle({
        fontSize: 13,
        fontWeight: FontWeight.regular,
      }),
    },
  },
  body: {
    main: {
      regular: defaultTextStyle({
        fontSize: 16,
        fontWeight: FontWeight.regular,
        fontStyle: 'normal',
      }),
      semibold: defaultTextStyle({
        fontSize: 16,
        fontWeight: FontWeight.semibold,
        fontStyle: 'normal',
      }),
      bold: defaultTextStyle({
        fontSize: 16,
        fontWeight: FontWeight.bold,
        fontStyle: 'normal',
      }),
      italic: defaultTextStyle({
        fontSize: 16,
        fontWeight: FontWeight.regular,
        fontStyle: 'italic',
        letterSpacing: 0,
      }),
      semiboldItalic: defaultTextStyle({
        fontSize: 16,
        fontWeight: FontWeight.semibold,
        fontStyle: 'italic',
        letterSpacing: 0,
      }),
      boldItalic: defaultTextStyle({
        fontSize: 16,
        fontWeight: FontWeight.bold,
        fontStyle: 'italic',
        letterSpacing: 0,
      }),
    },
    secondary: {
      regular: defaultTextStyle({
        fontSize: 14,
        fontWeight: FontWeight.regular,
        fontStyle: 'normal',
      }),
      semibold: defaultTextStyle({
        fontSize: 14,
        fontWeight: FontWeight.semibold,
        fontStyle: 'normal',
      }),
      bold: defaultTextStyle({
        fontSize: 14,
        fontWeight: FontWeight.bold,
        fontStyle: 'normal',
      }),
      italic: defaultTextStyle({
        fontSize: 14,
        fontWeight: FontWeight.regular,
        fontStyle: 'italic',
        letterSpacing: 0,
      }),
      semiboldItalic: defaultTextStyle({
        fontSize: 14,
        fontWeight: FontWeight.semibold,
        fontStyle: 'italic',
        letterSpacing: 0,
      }),
      boldItalic: defaultTextStyle({
        fontSize: 14,
        fontWeight: FontWeight.bold,
        fontStyle: 'italic',
        letterSpacing: 0,
      }),
    },
    tertiary: {
      regular: defaultTextStyle({
        fontSize: 12,
        fontWeight: FontWeight.regular,
        fontStyle: 'normal',
      }),
      italic: defaultTextStyle({
        fontSize: 12,
        fontWeight: FontWeight.regular,
        fontStyle: 'italic',
        letterSpacing: 0,
      }),
    },
    list: {
      regular: defaultTextStyle({
        fontSize: 16,
        fontWeight: FontWeight.regular,
      }),
      small: defaultTextStyle({
        fontSize: 14,
        fontWeight: FontWeight.regular,
      }),
    },
  },
  caption: {
    large: {
      regular: defaultTextStyle({
        fontSize: 13,
        fontWeight: FontWeight.regular,
        fontStyle: 'normal',
      }),
      semibold: defaultTextStyle({
        fontSize: 13,
        fontWeight: FontWeight.semibold,
        fontStyle: 'normal',
      }),
      bold: defaultTextStyle({
        fontSize: 13,
        fontWeight: FontWeight.bold,
        fontStyle: 'normal',
      }),
      boldItalic: defaultTextStyle({
        fontSize: 13,
        fontWeight: FontWeight.bold,
        fontStyle: 'italic',
        letterSpacing: 0,
      }),
      italic: defaultTextStyle({
        fontSize: 13,
        fontWeight: FontWeight.regular,
        fontStyle: 'italic',
        letterSpacing: 0,
      }),
    },
    small: {
      regular: defaultTextStyle({
        fontSize: 10,
        lineHeight: 1.25,
        fontWeight: FontWeight.regular,
      }),
      semibold: defaultTextStyle({
        fontSize: 10,
        lineHeight: 1.25,
        fontWeight: FontWeight.semibold,
      }),
      bold: defaultTextStyle({
        fontSize: 10,
        lineHeight: 1.25,
        fontWeight: FontWeight.bold,
      }),
    },
  },
  link: {
    large: {
      regular: defaultTextStyle({
        fontSize: 12,
        fontWeight: FontWeight.regular,
        lineHeight: 1.25,
        textDecoration: 'underline',
      }),
      bold: defaultTextStyle({
        fontSize: 12,
        fontWeight: FontWeight.bold,
        lineHeight: 1.25,
        textDecoration: 'underline',
      }),
    },
    small: defaultTextStyle({
      fontSize: 10,
      lineHeight: 1.25,
      textDecoration: 'underline',
    }),
  },
} as const

export const Spacing = {
  layout: {
    maxWidth: 600,
  },
  size: {
    tiny: 5,
    small: 10,
    medium: 16,
    large: 20,
    extraLarge: 25,
  },
  informationalBox: {
    vertical: 25,
    horizontal: {
      left: 20,
      right: 25,
    },
  },
} as const

export const Borders = {
  medium: (color: string) => `5px solid ${color}`,
  large: (color: string) => `8px solid ${color}`,
}

export const StyleDefaults = {
  layout: {
    narrow: 'narrow',
    wide: 'wide',
  },
  inline: {
    colors: {
      backgroundColor: Colors.white,
      color: Colors.black,
    } as CSSProperties,
  },
} as const

export const spacingCellSizes = {
  small: 10,
  medium: 15,
  large: 30,
  extraLarge: 50,
}

interface SpacingCellProps {
  size: keyof typeof spacingCellSizes
}
export const SpacingCell: FC<SpacingCellProps> = ({ size }) => {
  const sizeInPixels = spacingCellSizes[size]
  return (
    <EmailBlock.Cell
      style={{
        ...StyleDefaults.inline.colors,
        lineHeight: 1,
        fontSize: 10,
        height: sizeInPixels,
      }}
    >
      &nbsp;
    </EmailBlock.Cell>
  )
}
