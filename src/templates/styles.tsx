import { CSSProperties } from 'react'

export const Colors = {
  black: '#1b1b1b',
  gray: '#71767A',
  grayDark: '#3D4551',
  grayLight: '#F5F5F5',
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
    paddingHorizontal: {
      paddingLeft: 20,
      paddingRight: 20,
    } as CSSProperties,
    maxWidth: 690,
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
}
