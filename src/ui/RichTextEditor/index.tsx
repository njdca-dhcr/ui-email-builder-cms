import React, { FC, useCallback, useMemo } from 'react'
import { Editable, withReact, Slate, RenderElementProps, RenderLeafProps } from 'slate-react'
import { createEditor } from 'slate'
import { withHistory } from 'slate-history'
import { AppDescendant } from './types'
import { Toolbar, handleHotKeyPress } from './Toolbar'
import {
  RichTextAdditionalStyles,
  RichTextAdditionalStylesContext,
  RichTextElement,
  RichTextLeaf,
} from './RichText'
import { withInlines } from './withInlines'
import './RichTextEditor.css'

export type { RichTextAdditionalStyles } from './RichText'

export { RichTextElement, RichTextLeaf, RichTextAdditionalStylesContext } from './RichText'

export type RichTextValue = AppDescendant[]

export const RICH_TEXT_EDITOR_TEST_ID = 'rich-text-editor'

interface RichTextEditorProps {
  additionalStyles?: RichTextAdditionalStyles
  autoFocus?: boolean
  label?: string
  onEditorBlur?: () => void
  onValueChange: (value: RichTextValue) => void
  value: RichTextValue
}

export const RichTextEditor: FC<RichTextEditorProps> = ({
  additionalStyles,
  autoFocus,
  label,
  onEditorBlur,
  onValueChange,
  value,
}) => {
  const memoizedAdditionalStyles = useMemo(() => additionalStyles ?? {}, [])

  const renderElement = useCallback(
    (props: RenderElementProps) => <SlateRichTextElement {...props} />,
    [memoizedAdditionalStyles],
  )

  const renderLeaf = useCallback((props: RenderLeafProps) => <SlateRichTextLeaf {...props} />, [])

  const editor = useMemo(() => withInlines(withHistory(withReact(createEditor()))), [])

  return (
    <RichTextAdditionalStylesContext.Provider value={memoizedAdditionalStyles}>
      <Slate editor={editor} value={value} onChange={onValueChange}>
        <Toolbar />
        <Editable
          aria-label={label}
          autoFocus={autoFocus}
          data-testid={RICH_TEXT_EDITOR_TEST_ID}
          onBlur={onEditorBlur}
          onKeyDown={(event) => handleHotKeyPress(event, editor)}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          spellCheck
        />
      </Slate>
    </RichTextAdditionalStylesContext.Provider>
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
