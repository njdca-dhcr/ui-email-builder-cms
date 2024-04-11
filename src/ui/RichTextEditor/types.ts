export interface AppMarkConfig {
  bold?: boolean
  italic?: boolean
  underline?: boolean
  textSize?: TextSize
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

export interface TextSizeElement extends BaseElement {
  type: 'text-size'
  size: TextSize
}

export interface BulletedListElement extends BaseElement {
  type: 'bulleted-list'
}

export interface NumberedListElement extends BaseElement {
  type: 'numbered-list'
}

export interface ListItemElement extends BaseElement {
  type: 'list-item'
}

type BlockElement = ParagraphElement | BulletedListElement | NumberedListElement | ListItemElement

type InlineElement = LinkElement | TextSizeElement

export type BlockElementType = BlockElement['type']

export type AppElement = BlockElement | InlineElement | UnknownElement

export type AppElementType = AppElement['type']

export type AppDescendant = AppText | AppElement

export type TextSize = 'tiny' | 'small' | 'medium' | 'large' | 'extraLarge'

export type Polarity = 'increase' | 'decrease'