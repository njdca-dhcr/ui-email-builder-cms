import React, { FC, KeyboardEvent, ReactElement } from 'react'
import isHotkey from 'is-hotkey'
import { Editor } from 'slate'
import { AppMarkConfig, AppMarkKind } from './types'
import { useSlate } from 'slate-react'
import { LinkButtons } from './withInlines'
import classNames from 'classnames'
import { VisuallyHidden } from '@reach/visually-hidden'

export const Toolbar: FC = () => {
  return (
    <div className="rte-toolbar">
      <MarkButton format="bold" icon={<strong>B</strong>} label="Bold" className="bold" />
      <MarkButton format="italic" icon={<em>i</em>} label="Italic" className="italicized" />
      <MarkButton format="underline" icon={<u>U</u>} label="Underline" className="underlined" />
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

const isMarkActive = (editor: Editor, format: AppMarkKind) => {
  const marks: AppMarkConfig | null = Editor.marks(editor)
  return marks ? marks[format] === true : false
}

interface MarkButtonProps {
  className?: string
  format: AppMarkKind
  icon: ReactElement
  label: string
}

const MarkButton: FC<MarkButtonProps> = ({ className, format, icon, label }) => {
  const editor = useSlate()
  const isActive = isMarkActive(editor, format)

  return (
    <span
      className={classNames('mark-button', className, { active: isActive })}
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
