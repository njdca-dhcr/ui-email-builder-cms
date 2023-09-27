import { CSSProperties } from 'react'

export const Colors = {
  black: '#1b1b1b',
  warningBackground: '#FAF3D1',
  warning: '#FFBE2E',
  white: '#FFFFFF',
} as const

export const Font = {
  family: {
    default: 'Public Sans, Helvetica, Arial, sans-serif',
  },
  weight: {
    bold: 700,
    normal: 400,
  },
  size: {
    large: 40,
    normal: 16,
  },
} as const

export const Spacing = {
  layout: {
    paddingHorizontal: {
      paddingLeft: 20,
      paddingRight: 20,
    } as CSSProperties,
    maxWidth: 690,
  },
} as const

export const DefaultStyles: CSSProperties = {
  ...Spacing.layout.paddingHorizontal,
  backgroundColor: Colors.white,
  color: Colors.black,
  fontFamily: Font.family.default,
  fontWeight: Font.weight.normal,
  fontSize: Font.size.normal,
}
