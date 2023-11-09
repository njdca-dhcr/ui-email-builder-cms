import React, {
  CSSProperties,
  FC,
  KeyboardEvent,
  ReactElement,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { EmailBlock } from './EmailBlock'
import { CursorPosition, focusAndSetCursor } from 'src/utils/focus'

export interface TableTerm {
  label: string
  value: string
}

type CellKind = 'label' | 'value'

interface TableContextValue {
  addNewItemAfter: (index: number) => void
  collection: TableTerm[]
  focus: (index: number, kind: CellKind, element: HTMLElement) => void
  shouldFocus: (index: number, kind: CellKind, cursor: CursorPosition) => void
  removeItemAt: (index: number) => void
  setCollection: (collection: TableTerm[]) => void
  valueKey: boolean
}

const TableContext = createContext<TableContextValue>({
  addNewItemAfter: () => {},
  collection: [{ label: '', value: '' }],
  focus: () => {},
  shouldFocus: () => {},
  removeItemAt: () => {},
  setCollection: () => {},
  valueKey: false,
})

const useTableContext = () => useContext(TableContext)

interface TableProps {
  children: ReactNode
  collection: TableTerm[]
  setCollection: (collection: TableTerm[]) => void
  style?: CSSProperties
}

const Table: FC<TableProps> = ({ collection, setCollection, children, style }) => {
  const shouldFocusIndexRef = useRef<[number, CellKind, 'highlight' | 'end']>()
  const [valueKey, setValueKey] = useState(false)
  const toggleValueKey = useCallback(() => setValueKey(!valueKey), [valueKey])
  const contextValue: TableContextValue = useMemo(
    () => ({
      collection,
      setCollection,
      valueKey,
      addNewItemAfter: (index) => {
        const nextIndex = index + 1
        shouldFocusIndexRef.current = [nextIndex, 'label', 'highlight']
        setCollection([
          ...collection.slice(0, nextIndex),
          { label: 'Label', value: 'Value' },
          ...collection.slice(nextIndex, collection.length),
        ])
        toggleValueKey()
      },
      focus: (index, kind, element) => {
        if (!shouldFocusIndexRef.current) return
        const [focusIndex, focusKind, focusCursor] = shouldFocusIndexRef.current

        if (index === focusIndex && kind === focusKind) {
          focusAndSetCursor(element, focusCursor)
          shouldFocusIndexRef.current = undefined
        }
      },
      shouldFocus: (index, kind, cursor) => {
        shouldFocusIndexRef.current = [index, kind, cursor]
        toggleValueKey()
      },
      removeItemAt: (index) => {
        const item = collection[index]
        if (item?.label === '' && item?.value === '' && collection.length > 1) {
          shouldFocusIndexRef.current = [index - 1, 'value', 'end']
          setCollection(collection.filter((_item, currentIndex) => currentIndex !== index))
          toggleValueKey()
        }
      },
    }),
    [collection, setCollection, valueKey, toggleValueKey],
  )

  return (
    <TableContext.Provider value={contextValue}>
      <EmailBlock.Table role="table" style={style}>
        {children}
      </EmailBlock.Table>
    </TableContext.Provider>
  )
}
Table.displayName = 'EditableTerms.Table'

interface CellProps {
  key: string
  element: 'td'
  value: string
  onBeforeInput: (event: any) => void
  onValueChange: (value: string) => void
  onKeyUp: (event: KeyboardEvent<HTMLElement>) => void
  ref: any
}

interface LabelCellProps extends CellProps {
  role: 'rowheader'
}

interface ValueCellProps extends CellProps {
  role: 'cell'
}

interface RowProps {
  index: number
  label: (props: LabelCellProps) => ReactElement
  value: (props: ValueCellProps) => ReactElement
  style?: CSSProperties
}

const Row: FC<RowProps> = ({ index, label, value, style }) => {
  const labelRef = useRef<HTMLElement>()
  const valueRef = useRef<HTMLElement>()
  const { addNewItemAfter, collection, focus, shouldFocus, setCollection, removeItemAt, valueKey } =
    useTableContext()
  const rowValue = collection[index]
  const setRowValue = useCallback(
    (term: TableTerm) => {
      setCollection(collection.map((item, i) => (i === index ? term : item)))
    },
    [collection],
  )

  useEffect(() => {
    if (labelRef.current) {
      focus(index, 'label', labelRef.current)
    }
  }, [focus, index, labelRef])

  useEffect(() => {
    if (valueRef.current) {
      focus(index, 'value', valueRef.current)
    }
  }, [focus, index, valueRef])

  return (
    <EmailBlock.Row
      elements={[{ part: 'cell', style }, { part: 'table', width: 'unset' }, 'row']}
      role="row"
    >
      {label({
        key: `label-${index}-${valueKey}`,
        element: 'td',
        role: 'rowheader',
        ref: labelRef,
        value: rowValue.label,
        onValueChange: (label) => setRowValue({ ...rowValue, label }),
        onKeyUp: (event) => {
          event.stopPropagation()
          event.preventDefault()

          switch (event.key) {
            case 'Enter':
              shouldFocus(index, 'value', 'highlight')
              break
            case 'Backspace':
              removeItemAt(index)
              break
          }
        },
        onBeforeInput: (event) => {
          if (event.data === '\n') {
            event.preventDefault()
          }
        },
      })}
      {value({
        key: `value-${index}-${valueKey}`,
        element: 'td',
        role: 'cell',
        ref: valueRef,
        value: rowValue.value,
        onValueChange: (value) => setRowValue({ ...rowValue, value }),
        onKeyUp: (event) => {
          event.stopPropagation()
          event.preventDefault()

          switch (event.key) {
            case 'Enter':
              addNewItemAfter(index)
              break
          }
        },
        onBeforeInput: (event) => {
          if (event.data === '\n') {
            event.preventDefault()
          }
        },
      })}
    </EmailBlock.Row>
  )
}
Row.displayName = 'EditableTerms.Row'

export const EditableTerms = {
  Table,
  Row,
}
