import React, { useState } from 'react'
import { render } from '@testing-library/react'
import { EditableTerms, TableTerm } from '../EditableTermsTable'
import { faker } from '@faker-js/faker'
import userEvent from '@testing-library/user-event'
import { EditableElement } from '../EditableElement'

describe(EditableTerms.Table.displayName!, () => {
  it('is a table', () => {
    const { queryAllByRole } = render(
      <EditableTerms.Table collection={[{ label: '', value: '' }]} setCollection={jest.fn()}>
        <tr />
      </EditableTerms.Table>,
    )
    expect(queryAllByRole('table')).toHaveLength(1)
  })

  it('displays its children', () => {
    const value = faker.lorem.paragraph()
    const { baseElement } = render(
      <EditableTerms.Table collection={[{ label: '', value: '' }]} setCollection={jest.fn()}>
        <tr>
          <td>{value}</td>
        </tr>
      </EditableTerms.Table>,
    )
    expect(baseElement).toContainHTML(`<tr><td>${value}</td></tr>`)
  })

  it('can edit the labels', async () => {
    const user = userEvent.setup()
    const handleChange = jest.fn()
    const { getByLabelText } = render(
      <EditableTerms.Table
        setCollection={handleChange}
        collection={[
          { label: 'a', value: '' },
          { label: 'b', value: '' },
          { label: 'c', value: '' },
        ]}
      >
        <EditableTerms.Row
          index={0}
          label={(labelProps) => <EditableElement {...labelProps} label="Label 1" />}
          value={jest.fn()}
        />
        <EditableTerms.Row
          index={1}
          label={(labelProps) => <EditableElement {...labelProps} label="Label 2" />}
          value={jest.fn()}
        />
        <EditableTerms.Row
          index={2}
          label={(labelProps) => <EditableElement {...labelProps} label="Label 3" />}
          value={jest.fn()}
        />
      </EditableTerms.Table>,
    )
    expect(handleChange).not.toHaveBeenCalled()

    await user.type(getByLabelText('Label 1'), 'a')
    expect(handleChange).toHaveBeenLastCalledWith([
      { label: 'aa', value: '' },
      { label: 'b', value: '' },
      { label: 'c', value: '' },
    ])

    await user.type(getByLabelText('Label 2'), 'a')
    expect(handleChange).toHaveBeenLastCalledWith([
      { label: 'a', value: '' },
      { label: 'ba', value: '' },
      { label: 'c', value: '' },
    ])

    await user.type(getByLabelText('Label 3'), 'a')
    expect(handleChange).toHaveBeenLastCalledWith([
      { label: 'a', value: '' },
      { label: 'b', value: '' },
      { label: 'ca', value: '' },
    ])
  })

  it('can edit the values', async () => {
    const user = userEvent.setup()
    const handleChange = jest.fn()
    const { getByLabelText } = render(
      <EditableTerms.Table
        setCollection={handleChange}
        collection={[
          { label: '', value: 'a' },
          { label: '', value: 'b' },
          { label: '', value: 'c' },
        ]}
      >
        <EditableTerms.Row
          index={0}
          label={jest.fn()}
          value={(valueProps) => <EditableElement {...valueProps} label="Value 1" />}
        />
        <EditableTerms.Row
          index={1}
          label={jest.fn()}
          value={(valueProps) => <EditableElement {...valueProps} label="Value 2" />}
        />
        <EditableTerms.Row
          index={2}
          label={jest.fn()}
          value={(valueProps) => <EditableElement {...valueProps} label="Value 3" />}
        />
      </EditableTerms.Table>,
    )
    expect(handleChange).not.toHaveBeenCalled()

    await user.type(getByLabelText('Value 1'), 'a')
    expect(handleChange).toHaveBeenLastCalledWith([
      { label: '', value: 'aa' },
      { label: '', value: 'b' },
      { label: '', value: 'c' },
    ])

    await user.type(getByLabelText('Value 2'), 'a')
    expect(handleChange).toHaveBeenLastCalledWith([
      { label: '', value: 'a' },
      { label: '', value: 'ba' },
      { label: '', value: 'c' },
    ])

    await user.type(getByLabelText('Value 3'), 'a')
    expect(handleChange).toHaveBeenLastCalledWith([
      { label: '', value: 'a' },
      { label: '', value: 'b' },
      { label: '', value: 'ca' },
    ])
  })

  describe('label keypresses', () => {
    const Dummy = ({ initial }: { initial: TableTerm[] }) => {
      const [collection, setCollection] = useState(initial)
      return (
        <EditableTerms.Table collection={collection} setCollection={setCollection}>
          {collection.map((_item, index) => (
            <EditableTerms.Row
              key={index}
              index={index}
              label={(props) => <EditableElement {...props} label={`Row Label ${index + 1}`} />}
              value={(props) => <EditableElement {...props} label={`Row Value ${index + 1}`} />}
            />
          ))}
        </EditableTerms.Table>
      )
    }

    it('moves to the value when enter is pressed', async () => {
      const user = userEvent.setup()
      const { getByLabelText } = render(
        <Dummy
          initial={[
            { label: '', value: 'First Value' },
            { label: '', value: 'Second Value' },
          ]}
        />,
      )

      await user.type(getByLabelText('Row Label 1'), '[Enter]')
      expect(getByLabelText('Row Value 1')).toHaveFocus()
      expect(window.getSelection()!.toString()).toEqual('First Value')

      await user.type(getByLabelText('Row Label 2'), '[Enter]')
      expect(getByLabelText('Row Value 2')).toHaveFocus()
      expect(window.getSelection()!.toString()).toEqual('Second Value')
    })

    it('removes the row when backspace is pressed and there is no label or value', async () => {
      const user = userEvent.setup()
      const { getByLabelText, queryAllByRole } = render(
        <Dummy
          initial={[
            { label: 'a', value: 'a' },
            { label: '', value: '' },
            { label: 'b', value: 'b' },
          ]}
        />,
      )

      expect(queryAllByRole('row')).toHaveLength(3)
      await user.type(getByLabelText('Row Label 2'), '[Backspace]')
      expect(queryAllByRole('row')).toHaveLength(2)
    })

    it('focuses on the previous row after removing a row', async () => {
      const user = userEvent.setup()
      const { getByLabelText } = render(
        <Dummy
          initial={[
            { label: 'a', value: 'a' },
            { label: '', value: '' },
            { label: 'b', value: 'b' },
          ]}
        />,
      )

      await user.type(getByLabelText('Row Label 2'), '[Backspace]')
      expect(getByLabelText('Row Value 1')).toHaveFocus()
    })

    it('does not remove the row when backspace is pressed but there is label content', async () => {
      const user = userEvent.setup()
      const { getByLabelText, queryAllByRole } = render(
        <Dummy
          initial={[
            { label: 'a', value: 'a' },
            { label: 'cc', value: '' },
            { label: 'b', value: 'b' },
          ]}
        />,
      )

      expect(queryAllByRole('row')).toHaveLength(3)
      await user.type(getByLabelText('Row Label 2'), '[Backspace]')
      expect(queryAllByRole('row')).toHaveLength(3)
    })

    it('does not remove the row when backspace is pressed but there is value content', async () => {
      const user = userEvent.setup()
      const { getByLabelText, queryAllByRole } = render(
        <Dummy
          initial={[
            { label: 'a', value: 'a' },
            { label: '', value: 'cc' },
            { label: 'b', value: 'b' },
          ]}
        />,
      )

      expect(queryAllByRole('row')).toHaveLength(3)
      await user.type(getByLabelText('Row Label 2'), '[Backspace]')
      expect(queryAllByRole('row')).toHaveLength(3)
    })

    it('cannot remove the last row', async () => {
      const user = userEvent.setup()
      const { getByLabelText, queryAllByRole } = render(
        <Dummy initial={[{ label: '', value: '' }]} />,
      )

      expect(queryAllByRole('row')).toHaveLength(1)
      await user.type(getByLabelText('Row Label 1'), '[Backspace]')
      expect(queryAllByRole('row')).toHaveLength(1)
    })
  })

  describe('value keypresses', () => {
    const Dummy = ({ initial }: { initial: TableTerm[] }) => {
      const [collection, setCollection] = useState(initial)
      return (
        <EditableTerms.Table collection={collection} setCollection={setCollection}>
          {collection.map((_item, index) => (
            <EditableTerms.Row
              key={index}
              index={index}
              label={(props) => <EditableElement {...props} label={`Row Label ${index + 1}`} />}
              value={(props) => <EditableElement {...props} label={`Row Value ${index + 1}`} />}
            />
          ))}
        </EditableTerms.Table>
      )
    }

    it('adds a new row when enter is pressed', async () => {
      const user = userEvent.setup()
      const { getByLabelText, queryAllByRole } = render(
        <Dummy
          initial={[
            { label: 'a', value: 'a' },
            { label: 'b', value: 'b' },
          ]}
        />,
      )

      expect(queryAllByRole('row')).toHaveLength(2)
      await user.type(getByLabelText('Row Value 2'), '[Enter]')
      expect(queryAllByRole('row')).toHaveLength(3)
      await user.type(getByLabelText('Row Value 3'), '[Enter]')
      expect(queryAllByRole('row')).toHaveLength(4)
    })

    it('focuses the new row when enter is pressed', async () => {
      const user = userEvent.setup()
      const { getByLabelText } = render(
        <Dummy
          initial={[
            { label: 'a', value: 'a' },
            { label: 'b', value: 'b' },
          ]}
        />,
      )
      await user.type(getByLabelText('Row Value 2'), '[Enter]')
      expect(getByLabelText('Row Label 3')).toHaveFocus()
      const selection = window.getSelection()!
      expect(selection.toString()).toEqual('Label')
    })
  })
})

describe(EditableTerms.Row.displayName!, () => {
  it('is a row', () => {
    const { queryAllByRole } = render(
      <table>
        <tbody>
          <EditableTerms.Row index={0} label={jest.fn()} value={jest.fn()} />
        </tbody>
      </table>,
    )
    expect(queryAllByRole('row')).toHaveLength(1)
  })

  describe('label', () => {
    it('is given the correct props', () => {
      const text = faker.lorem.paragraph()
      const handleLabel = jest.fn().mockReturnValue(<td>{text}</td>)
      const { queryByText } = render(
        <table>
          <tbody>
            <EditableTerms.Row index={0} label={handleLabel} value={jest.fn()} />
          </tbody>
        </table>,
      )
      expect(queryByText(text)).not.toBeNull()
      expect(handleLabel).toHaveBeenCalledWith({
        key: expect.any(String),
        element: 'td',
        role: 'rowheader',
        value: expect.any(String),
        onValueChange: expect.any(Function),
        onKeyUp: expect.any(Function),
        onBeforeInput: expect.any(Function),
        ref: expect.anything(),
      })
    })
  })

  describe('value', () => {
    it('is given the correct props', () => {
      const text = faker.lorem.paragraph()
      const handleValue = jest.fn().mockReturnValue(<td>{text}</td>)
      const { queryByText } = render(
        <table>
          <tbody>
            <EditableTerms.Row index={0} label={jest.fn()} value={handleValue} />
          </tbody>
        </table>,
      )
      expect(queryByText(text)).not.toBeNull()
      expect(handleValue).toHaveBeenCalledWith({
        key: expect.any(String),
        element: 'td',
        role: 'cell',
        value: expect.any(String),
        onValueChange: expect.any(Function),
        onKeyUp: expect.any(Function),
        onBeforeInput: expect.any(Function),
        ref: expect.anything(),
      })
    })
  })
})
