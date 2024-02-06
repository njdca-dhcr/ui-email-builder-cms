import React, { FC, useCallback, useMemo } from 'react'
import { Editable, withReact, Slate, RenderElementProps, RenderLeafProps } from 'slate-react'
import { createEditor } from 'slate'
import { withHistory } from 'slate-history'
import { AppDescendant } from './types'
import { Toolbar, handleHotKeyPress } from './Toolbar'
import { RichTextElement, RichTextLeaf } from './RichText'
import { withInlines } from './withInlines'
import './RichTextEditor.css'

export { RichTextElement, RichTextLeaf } from './RichText'

export type RichTextValue = AppDescendant[]

export const TEST_ID = 'rich-text-editor'

interface RichTextEditorProps {
  autoFocus?: boolean
  label?: string
  onEditorBlur?: () => void
  onValueChange: (value: RichTextValue) => void
  value: RichTextValue
}

export const RichTextEditor: FC<RichTextEditorProps> = ({
  autoFocus,
  label,
  onEditorBlur,
  onValueChange,
  value,
}) => {
  const renderElement = useCallback(
    (props: RenderElementProps) => <SlateRichTextElement {...props} />,
    [],
  )

  const renderLeaf = useCallback((props: RenderLeafProps) => <SlateRichTextLeaf {...props} />, [])

  const editor = useMemo(() => withInlines(withHistory(withReact(createEditor()))), [])

  return (
    <Slate editor={editor} value={value} onChange={onValueChange}>
      <Toolbar />
      <Editable
        aria-label={label}
        autoFocus={autoFocus}
        data-testid={TEST_ID}
        onBlur={onEditorBlur}
        onKeyDown={(event) => handleHotKeyPress(event, editor)}
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        spellCheck
      />
    </Slate>
  )
}

const SlateRichTextElement: FC<RenderElementProps> = ({ attributes, children, element }) => {
  return (
    <RichTextElement {...attributes} element={element}>
      {children}
    </RichTextElement>
  )
}

const SlateRichTextLeaf: FC<RenderLeafProps> = ({ attributes, children, leaf }) => {
  return (
    <RichTextLeaf {...attributes} leaf={leaf}>
      {children}
    </RichTextLeaf>
  )
}
