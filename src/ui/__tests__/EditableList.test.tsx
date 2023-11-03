import React, { useState } from 'react'
import { faker } from '@faker-js/faker'
import { render } from '@testing-library/react'
import { EditableList, EditableListItem } from '../EditableList'
import userEvent from '@testing-library/user-event'

describe('EditableList', () => {
  it('is an ordered list', () => {
    const { queryAllByRole } = render(
      <EditableList element="ol" collection={[faker.lorem.word()]} setCollection={jest.fn()}>
        <li />
      </EditableList>,
    )
    expect(queryAllByRole('list')).toHaveLength(1)
  })

  it('displays its children', () => {
    const value = faker.lorem.paragraph()
    const { baseElement } = render(
      <EditableList element="ol" collection={[faker.lorem.word()]} setCollection={jest.fn()}>
        <li>
          <span>{value}</span>
        </li>
      </EditableList>,
    )
    expect(baseElement).toContainHTML(`<li><span>${value}</span></li>`)
  })

  describe('editing list items', () => {
    it('can change different elements', async () => {
      const user = userEvent.setup()
      const handleChange = jest.fn()
      const { getByLabelText } = render(
        <EditableList element="ol" collection={['a', 'b', 'c']} setCollection={handleChange}>
          <EditableListItem index={0} value="a" label="Item 1" />
          <EditableListItem index={1} value="b" label="Item 2" />
          <EditableListItem index={2} value="c" label="Item 3" />
        </EditableList>,
      )
      expect(handleChange).not.toHaveBeenCalled()

      await user.type(getByLabelText('Item 1'), 'a')
      expect(handleChange).toHaveBeenLastCalledWith(['aa', 'b', 'c'])

      await user.type(getByLabelText('Item 2'), 'a')
      expect(handleChange).toHaveBeenLastCalledWith(['a', 'ba', 'c'])

      await user.type(getByLabelText('Item 3'), 'a')
      expect(handleChange).toHaveBeenLastCalledWith(['a', 'b', 'ca'])
    })
  })

  describe('adding list items', () => {
    const Dummy = () => {
      const [collection, setCollection] = useState(['a', 'b', 'c'])

      return (
        <EditableList element="ol" collection={collection} setCollection={setCollection}>
          {collection.map((item, index) => (
            <EditableListItem key={index} index={index} value={item} label={`Item ${index + 1}`} />
          ))}
        </EditableList>
      )
    }

    it('can add a new list item when "Enter" is pressed', async () => {
      const user = userEvent.setup()
      const { queryAllByRole, getByLabelText } = render(<Dummy />)
      expect(queryAllByRole('listitem')).toHaveLength(3)

      await user.type(getByLabelText('Item 2'), '[Enter]')
      expect(queryAllByRole('listitem')).toHaveLength(4)

      await user.type(getByLabelText('Item 1'), '[Enter]')
      expect(queryAllByRole('listitem')).toHaveLength(5)
    })

    it('focuses on the new list item after adding it', async () => {
      const user = userEvent.setup()
      const { getByLabelText } = render(<Dummy />)

      await user.type(getByLabelText('Item 2'), '[Enter]')
      expect(getByLabelText('Item 3')).toHaveFocus()
    })
  })

  describe('removing list items', () => {
    const Dummy = ({ initial }: { initial: string[] }) => {
      const [collection, setCollection] = useState(initial)

      return (
        <EditableList element="ol" collection={collection} setCollection={setCollection}>
          {collection.map((item, index) => (
            <EditableListItem key={index} index={index} value={item} label={`Item ${index + 1}`} />
          ))}
        </EditableList>
      )
    }

    it('can remove list items when "Backspace" is pressed and the list item is empty', async () => {
      const user = userEvent.setup()
      const { getByLabelText, queryAllByRole } = render(<Dummy initial={['a', '', 'b', '', 'c']} />)

      expect(queryAllByRole('listitem')).toHaveLength(5)

      await user.type(getByLabelText('Item 4'), '[Backspace]')
      expect(queryAllByRole('listitem')).toHaveLength(4)

      await user.type(getByLabelText('Item 2'), '[Backspace]')
      expect(queryAllByRole('listitem')).toHaveLength(3)
    })

    it('cannot remove list items when "Backspace" is pressed and the list item is not empty', async () => {
      const user = userEvent.setup()
      const { getByLabelText, queryAllByRole } = render(<Dummy initial={['aa', 'bb', 'cc']} />)

      expect(queryAllByRole('listitem')).toHaveLength(3)

      await user.type(getByLabelText('Item 1'), '[Backspace]')
      expect(queryAllByRole('listitem')).toHaveLength(3)

      await user.type(getByLabelText('Item 2'), '[Backspace]')
      expect(queryAllByRole('listitem')).toHaveLength(3)

      await user.type(getByLabelText('Item 3'), '[Backspace]')
      expect(queryAllByRole('listitem')).toHaveLength(3)
    })

    it('focuses on the previous list item after removing a list item', async () => {
      const user = userEvent.setup()
      const { getByLabelText } = render(<Dummy initial={['aaa', '', 'bb', '', 'c']} />)

      await user.type(getByLabelText('Item 4'), '[Backspace]')
      expect(getByLabelText('Item 3')).toHaveFocus()
      expect(getByLabelText('Item 3'))

      await user.type(getByLabelText('Item 2'), '[Backspace]')
      expect(getByLabelText('Item 1')).toHaveFocus()
    })

    it('cannot remove the last list item', async () => {
      const user = userEvent.setup()
      const { getByLabelText, queryAllByRole } = render(<Dummy initial={['']} />)

      expect(queryAllByRole('listitem')).toHaveLength(1)
      await user.type(getByLabelText('Item 1'), '[Backspace]')
      expect(queryAllByRole('listitem')).toHaveLength(1)
    })
  })
})

describe('EditableListItem', () => {
  it('is a list item', () => {
    const { queryByRole } = render(
      <EditableListItem index={0} value={faker.lorem.word()} label={faker.lorem.word()} />,
    )
    expect(queryByRole('listitem')).not.toBeNull()
  })

  it('is labelled', () => {
    const label = faker.lorem.word()
    const { queryByLabelText } = render(
      <EditableListItem index={0} value={faker.lorem.word()} label={label} />,
    )
    expect(queryByLabelText(label)).not.toBeNull()
  })

  it('displays its initial value', () => {
    const value = faker.lorem.word()
    const { getByRole } = render(
      <EditableListItem index={0} value={value} label={faker.lorem.word()} />,
    )
    expect(getByRole('listitem')).toHaveTextContent(value)
  })
})
