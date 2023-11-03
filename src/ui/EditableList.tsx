import React, {
  CSSProperties,
  FC,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { EditableElement } from './EditableElement'

interface EditableListContextValue {
  addNewItemAfter: (index: number) => void
  collection: string[]
  focus: (index: number, element: HTMLElement) => void
  removeItemAt: (index: number) => void
  setCollection: (collection: string[]) => void
  valueKey: boolean
}

const EditableListContext = createContext<EditableListContextValue>({
  addNewItemAfter: () => {},
  collection: [''],
  focus: () => {},
  removeItemAt: () => {},
  setCollection: () => {},
  valueKey: false,
})

const useEditableListContext = () => useContext(EditableListContext)

interface EditableListProps {
  children: ReactNode
  collection: string[]
  setCollection: (collection: string[]) => void
  style?: CSSProperties
}

const focusAndPlaceCursorAtEnd = (element: HTMLElement) => {
  const selection = window.getSelection()!
  const range = document.createRange()
  selection.removeAllRanges()
  range.selectNodeContents(element)
  range.collapse(false)
  selection.addRange(range)
  element.focus()
}

export const EditableList: FC<EditableListProps> = ({
  children,
  collection,
  setCollection,
  style,
}) => {
  const shouldFocusIndexRef = useRef<number>()
  const [valueKey, setValueKey] = useState(false)
  const toggleValueKey = useCallback(() => setValueKey(!valueKey), [valueKey])

  const contextValue: EditableListContextValue = useMemo(
    () => ({
      collection,
      setCollection,
      valueKey,
      addNewItemAfter: (index) => {
        const nextIndex = index + 1
        shouldFocusIndexRef.current = nextIndex
        setCollection([
          ...collection.slice(0, nextIndex),
          '',
          ...collection.slice(nextIndex, collection.length),
        ])
        toggleValueKey()
      },
      focus: (index, element) => {
        if (shouldFocusIndexRef.current === index) {
          focusAndPlaceCursorAtEnd(element)
          shouldFocusIndexRef.current = undefined
        }
      },
      removeItemAt: (index) => {
        const item = collection[index]
        if (item === '' && collection.length > 1) {
          shouldFocusIndexRef.current = index - 1
          setCollection(collection.filter((_item, currentIndex) => currentIndex !== index))
          toggleValueKey()
        }
      },
    }),
    [collection, setCollection, valueKey, toggleValueKey],
  )

  return (
    <EditableListContext.Provider value={contextValue}>
      <ol style={style}>{children}</ol>
    </EditableListContext.Provider>
  )
}

interface EditableListItemProps {
  index: number
  label: string
  style?: CSSProperties
  value: string
}

export const EditableListItem: FC<EditableListItemProps> = ({ index, label, style, value }) => {
  const domNodeRef = useRef<HTMLElement>()
  const { addNewItemAfter, collection, setCollection, focus, removeItemAt, valueKey } =
    useEditableListContext()

  useEffect(() => {
    if (domNodeRef.current) {
      focus(index, domNodeRef.current)
    }
  }, [focus, index, domNodeRef])

  return (
    <EditableElement
      ref={domNodeRef as any}
      element="li"
      label={label}
      style={style}
      value={value}
      valueKey={valueKey}
      onValueChange={(newValue) => {
        setCollection(
          collection.map((value, currentIndex) => (currentIndex === index ? newValue : value)),
        )
      }}
      onBeforeInput={(event) => {
        if ((event as any).data === '\n') {
          event.preventDefault()
        }
      }}
      onKeyUp={(event) => {
        event.stopPropagation()
        event.preventDefault()

        switch (event.key) {
          case 'Backspace':
            removeItemAt(index)
            break
          case 'Enter':
            addNewItemAfter(index)
            break
          default:
            break
        }
      }}
    />
  )
}
