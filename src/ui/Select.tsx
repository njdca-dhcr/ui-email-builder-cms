import React, { FC } from 'react'
import {
  ListboxInput,
  ListboxButton,
  ListboxPopover,
  ListboxList,
  ListboxOption,
} from '@reach/listbox'
import '@reach/listbox/styles.css'
import { ChevronDownIcon } from './ChevronDownIcon'
import classNames from 'classnames'

interface Props {
  labelId: string
  onChange: (value: string) => void
  options: { label: string; value: string }[]
  size?: 'small' | 'large'
  value: string
}

export const Select: FC<Props> = ({ labelId, onChange, options, size, value }) => {
  return (
    <ListboxInput
      aria-labelledby={labelId}
      className={classNames('select', size)}
      value={value}
      onChange={onChange}
    >
      <ListboxButton arrow={<ChevronDownIcon />} className="select-button" />
      <ListboxPopover className={classNames('select-options-popover', size)}>
        <ListboxList>
          {options.map((option) => (
            <ListboxOption key={option.value} value={option.value} className="select-option">
              {option.label}
            </ListboxOption>
          ))}
        </ListboxList>
      </ListboxPopover>
    </ListboxInput>
  )
}
