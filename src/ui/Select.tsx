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

interface Props {
  labelId: string
  onChange: (value: string) => void
  options: { label: string; value: string }[]
  value: string
}

export const Select: FC<Props> = ({ labelId, onChange, options, value }) => {
  return (
    <ListboxInput aria-labelledby={labelId} className="select" value={value} onChange={onChange}>
      <ListboxButton arrow={<ChevronDownIcon />} className="select-button" />
      <ListboxPopover className="select-options-popover">
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
