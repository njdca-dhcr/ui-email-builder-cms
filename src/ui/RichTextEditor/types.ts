export interface AppMarkConfig {
  bold?: boolean
  italic?: boolean
  underline?: boolean
}

export type AppMarkKind = keyof AppMarkConfig

export interface AppText extends AppMarkConfig {
  text: string
}

interface BaseElement {
  children: Array<AppDescendant>
}

interface UnknownElement extends BaseElement {
  type?: undefined
}

interface ParagraphElement extends BaseElement {
  type: 'paragraph'
}

export interface LinkElement extends BaseElement {
  type: 'link'
  url: string
}

export type AppElement = ParagraphElement | LinkElement | UnknownElement

export type AppDescendant = AppText | AppElement
