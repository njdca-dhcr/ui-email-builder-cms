import React, { FC, useState } from 'react'
import { Editor, Transforms, Range, Element as SlateElement, Node as SlateNode } from 'slate'
import { ReactEditor, useSlate } from 'slate-react'
import isUrl from 'is-url'
import { AppElement, LinkElement } from './types'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { RemoveLinkIcon } from './icons/RemoveLinkIcon'
import { AddLinkIcon } from './icons/AddLinkIcon'

export const withInlines = (editor: ReactEditor) => {
  const anyEditor: any = editor
  const { insertData, insertText, isInline } = editor

  anyEditor.isInline = (element: AppElement) =>
    ['link'].includes(nodeType(element) ?? '') || isInline(element)

  editor.insertText = (text) => {
    if (text && isUrl(text)) {
      wrapLink(editor, text)
    } else {
      insertText(text)
    }
  }

  editor.insertData = (data) => {
    const text = data.getData('text/plain')

    if (text && isUrl(text)) {
      wrapLink(editor, text)
    } else {
      insertData(data)
    }
  }

  return editor
}

const wrapLink = (editor: ReactEditor, url: string) => {
  if (isLinkActive(editor)) {
    unwrapLink(editor)
  }

  const { selection } = editor
  const isCollapsed = selection && Range.isCollapsed(selection)
  const link: LinkElement = {
    type: 'link',
    url,
    children: isCollapsed ? [{ text: url }] : [],
  }

  if (isCollapsed) {
    Transforms.insertNodes(editor, link)
  } else {
    Transforms.wrapNodes(editor, link, { split: true })
    Transforms.collapse(editor, { edge: 'end' })
  }
}

const unwrapLink = (editor: ReactEditor) => {
  Transforms.unwrapNodes(editor, { match: matchLinkNode })
}

const insertLink = (editor: ReactEditor, url: string) => {
  if (editor.selection) {
    wrapLink(editor, url)
  }
}

const isLinkActive = (editor: ReactEditor) => {
  const nodes = Editor.nodes(editor, { match: matchLinkNode })
  return !!nodes.next().value
}

const nodeType = (node: AppElement): AppElement['type'] => {
  return node.type
}

const matchLinkNode = (node: SlateNode) =>
  !Editor.isEditor(node) && SlateElement.isElement(node) && nodeType(node) === 'link'

export const LinkButtons: FC = () => {
  const editor: ReactEditor = useSlate() as any

  const nodes = Editor.nodes(editor, { match: matchLinkNode })
  const [linkElement] = nodes.next().value ?? []

  if (isLinkElement(linkElement)) {
    return (
      <>
        <RemoveLinkButton />
        <span className="current-link">{linkElement.url}</span>
      </>
    )
  } else {
    return <AddLinkButton />
  }
}

export const AddLinkButton: FC = () => {
  const editor: ReactEditor = useSlate() as any

  return (
    <span
      className="rte-link-button add-link-button"
      onMouseDown={(event) => {
        event.preventDefault()
        const url = window.prompt('Enter the URL of the link:')
        if (!url) return
        insertLink(editor, url)
      }}
    >
      <AddLinkIcon />
      <VisuallyHidden>Add Link</VisuallyHidden>
    </span>
  )
}

export const RemoveLinkButton: FC = () => {
  const editor: ReactEditor = useSlate() as any

  return (
    <span
      className="rte-link-button remove-link-button"
      onMouseDown={(_event) => {
        if (isLinkActive(editor)) {
          unwrapLink(editor)
        }
      }}
    >
      <RemoveLinkIcon />
      <VisuallyHidden>Remove Link</VisuallyHidden>
    </span>
  )
}

const isLinkElement = (node: any | undefined): node is LinkElement => {
  if (!node) return false

  return node.type === 'link'
}
