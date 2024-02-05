import React, { FC, ReactElement } from 'react'
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
  options: { label: string | ReactElement; value: string }[]
  size?: 'small' | 'large'
  value: string
  renderValue?: (props: { value: string | null; valueLabel: string | null }) => ReactElement
  'data-testid'?: string
}

export const Select: FC<Props> = ({
  labelId,
  onChange,
  options,
  renderValue,
  size,
  value,
  ...props
}) => {
  return (
    <ListboxInput
      aria-labelledby={labelId}
      className={classNames('select', size)}
      data-testid={props['data-testid']}
      value={value}
      onChange={onChange}
    >
      {({ value, valueLabel }) => (
        <>
          <ListboxButton arrow={<ChevronDownIcon />} className="select-button">
            <span data-value={value}>
              {renderValue ? renderValue({ value, valueLabel }) : valueLabel}
            </span>
          </ListboxButton>
          <ListboxPopover className={classNames('select-options-popover', size)}>
            <ListboxList>
              {options.map((option) => (
                <ListboxOption key={option.value} value={option.value} className="select-option">
                  {option.label}
                </ListboxOption>
              ))}
            </ListboxList>
          </ListboxPopover>
        </>
      )}
    </ListboxInput>
  )
}
