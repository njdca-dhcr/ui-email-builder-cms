import { TinyColor } from '@ctrl/tinycolor'

interface Options {
  dark: string
  light: string
}

export const textColorForBackground = (background: string, { dark, light }: Options) => {
  const color = new TinyColor(background)

  return color.isDark() ? light : dark
}
