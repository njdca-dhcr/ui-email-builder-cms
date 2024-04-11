import React, { FC, KeyboardEvent, ReactElement } from 'react'
import isHotkey from 'is-hotkey'
import { Editor, Transforms, Element as SlateElement } from 'slate'
import { AppElement, AppElementType, AppMarkConfig, AppMarkKind, Polarity, TextSize } from './types'
import { ReactEditor, useSlate } from 'slate-react'
import { LinkButtons } from './withInlines'
import classNames from 'classnames'
import { VisuallyHidden } from '@reach/visually-hidden'
import { BulletedListIcon } from './icons/BulletedListIcon'
import { NumberedListIcon } from './icons/NumberedListIcon'
import { Font } from 'src/templates/styles'

export const Toolbar: FC = () => {
  return (
    <div className="rte-toolbar">
      <MarkButton format="bold" icon="B" label="Bold" className="bold" />
      <MarkButton format="italic" icon="i" label="Italic" className="italicized" />
      <MarkButton format="underline" icon="U" label="Underline" className="underlined" />
      <SizeButton icon="T+" polarity="increase" label="Increase font-size" />
      <SizeButton icon="T-" polarity="decrease" label="Decrease font-size" />
      <BlockButton icon={<BulletedListIcon />} label="Bulleted list" format="bulleted-list" />
      <BlockButton icon={<NumberedListIcon />} label="Numbered list" format="numbered-list" />
      <LinkButtons />
    </div>
  )
}

const HOTKEYS_MAPPING = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
} as const

const HOTKEYS: ReadonlyArray<keyof typeof HOTKEYS_MAPPING> = Object.keys(HOTKEYS_MAPPING) as any

const LIST_TYPES = ['bulleted-list', 'numbered-list'] satisfies AppElementType[]

export const handleHotKeyPress = (event: KeyboardEvent<HTMLDivElement>, editor: Editor) => {
  HOTKEYS.forEach((hotkey) => {
    if (isHotkey(hotkey, event)) {
      event.preventDefault()
      const mark = HOTKEYS_MAPPING[hotkey]
      toggleMark(editor, mark)
    }
  })
}

const toggleMark = (editor: Editor, format: AppMarkKind) => {
  const isActive = isMarkActive(editor, format)

  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
}

const toggleBlock = (editor: Editor, format: AppElementType) => {
  const isActive = isBlockActive(editor, format)
  const isList = LIST_TYPES.includes(format as any)

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && LIST_TYPES.includes((n as any).type),
    split: true,
  })
  const newProperties: Partial<AppElement> = {
    type: isActive ? 'paragraph' : isList ? 'list-item' : format,
  }
  Transforms.setNodes<AppElement>(editor, newProperties)

  if (!isActive && isList) {
    Transforms.wrapNodes(editor, { type: format, children: [] } as any)
  }
}

const isMarkActive = (editor: Editor, format: AppMarkKind) => {
  const marks: AppMarkConfig | null = Editor.marks(editor)
  return marks ? marks[format] === true : false
}

const isBlockActive = (editor: Editor, format: AppElementType) => {
  const { selection } = editor
  if (!selection) return false

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) => !Editor.isEditor(n) && SlateElement.isElement(n) && (n as any).type === format,
    }),
  )

  return !!match
}

interface MarkButtonProps {
  className?: string
  format: AppMarkKind
  icon: ReactElement | string
  label: string
}

const MarkButton: FC<MarkButtonProps> = ({ className, format, icon, label }) => {
  const editor = useSlate()
  const isActive = isMarkActive(editor, format)

  return (
    <span
      className={classNames('mark-button', className, { active: isActive && !isAdjustButton })}
      onMouseDown={(event) => {
        event.preventDefault()
        toggleMark(editor, format)
      }}
    >
      <span aria-hidden>{icon}</span>
      <VisuallyHidden>{label}</VisuallyHidden>
    </span>
  )
}

const sizes = {
  tiny: Font.size.tiny,
  small: Font.size.small,
  medium: Font.size.medium,
  large: Font.size.large,
  extraLarge: Font.size.extraLarge,
}

interface SizeButtonProps {
  className?: string
  polarity: 'increase' | 'decrease'
  icon: ReactElement | string
  label: string
}

const SizeButton: FC<SizeButtonProps> = ({ className, polarity, icon, label }) => {
  const editor: ReactEditor = useSlate() as ReactEditor

  return (
    <span
      className={classNames('adjust-button', className)}
      onMouseDown={(event) => {
        event.preventDefault()
        changeSize(editor, polarity)
      }}
    >
      <span aria-hidden>{icon}</span>
      <VisuallyHidden>{label}</VisuallyHidden>
    </span>
  )
}

const changeSize = (editor: ReactEditor, polarity: Polarity) => {
  const textSize: TextSize = (Editor.marks(editor) as any)?.textSize ?? 'medium'
  const possibleSizes = Object.keys(sizes)
  const currentIndex = possibleSizes.indexOf(textSize)
  let newIndex: number
  if (polarity === 'increase') {
    newIndex = currentIndex + 1 < possibleSizes.length ? currentIndex + 1 : currentIndex
  } else {
    newIndex = currentIndex > 0 ? currentIndex - 1 : currentIndex
  }

  Editor.addMark(editor, 'textSize', possibleSizes[newIndex])
}

interface BlockButtonProps {
  format: AppElementType
  icon: ReactElement
  label: string
}

const BlockButton: FC<BlockButtonProps> = ({ format, icon, label }) => {
  const editor = useSlate()
  const isActive = isBlockActive(editor, format)

  return (
    <span
      className={classNames('block-button', { active: isActive })}
      onMouseDown={(event) => {
        event.preventDefault()
        toggleBlock(editor, format)
      }}
    >
      {icon}
      <VisuallyHidden>{label}</VisuallyHidden>
    </span>
  )
}
