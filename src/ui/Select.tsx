import React, { FC, ReactElement } from 'react'
import * as BaseSelect from '@radix-ui/react-select'
import { CheckIcon, ChevronUpIcon } from '@radix-ui/react-icons'
import { ChevronDownIcon } from './ChevronDownIcon'
import classNames from 'classnames'
import './Select.css'
import { useDidMount } from 'src/utils/useDidMount'

interface Props {
  className?: string
  labelId: string
  onChange: (value: string) => void
  options: { label: string | ReactElement; value: string }[]
  size?: 'small' | 'large'
  align?: 'start' | 'center' | 'end'
  value: string
  renderValue?: (props: { value: string | null; valueLabel: string | null }) => ReactElement
  'data-testid'?: string
  name?: string
  contentClassName?: string
  sideOffset?: number
}

export const Select: FC<Props> = ({
  className,
  labelId,
  onChange,
  options,
  renderValue,
  size,
  value,
  name,
  align = 'start',
  contentClassName,
  sideOffset = 0,
  ...props
}) => {
  const mounted = useDidMount()

  if (!mounted) return null

  const valueLabel: string | null =
    options.find((option) => option.value === value)?.label ?? (null as any)

  return (
    <div className={classNames('SelectContainer', size, className)}>
      <BaseSelect.Root value={value} onValueChange={onChange} name={name}>
        <BaseSelect.Trigger
          className="SelectTrigger"
          aria-labelledby={labelId}
          data-testid={props['data-testid']}
        >
          <BaseSelect.Value>
            {renderValue ? renderValue({ value, valueLabel }) : valueLabel}
          </BaseSelect.Value>
          <BaseSelect.Icon className="SelectIcon">
            <ChevronDownIcon />
          </BaseSelect.Icon>
        </BaseSelect.Trigger>
        <BaseSelect.Portal>
          <BaseSelect.Content
            className={classNames('SelectContent', size, contentClassName)}
            position="popper"
            align={align}
            sideOffset={sideOffset}
          >
            <BaseSelect.ScrollUpButton className="SelectScrollButton">
              <ChevronUpIcon />
            </BaseSelect.ScrollUpButton>
            <BaseSelect.Viewport className="SelectViewport">
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </BaseSelect.Viewport>
            <BaseSelect.ScrollDownButton className="SelectScrollButton">
              <ChevronDownIcon />
            </BaseSelect.ScrollDownButton>
          </BaseSelect.Content>
        </BaseSelect.Portal>
      </BaseSelect.Root>
    </div>
  )
}

const SelectItem = React.forwardRef<any, any>(({ children, className, ...props }, forwardedRef) => {
  return (
    <BaseSelect.Item
      className={classNames('SelectItem', className)}
      {...(props as any)}
      ref={forwardedRef}
    >
      <BaseSelect.ItemText>{children}</BaseSelect.ItemText>
      <BaseSelect.ItemIndicator className="SelectItemIndicator">
        <CheckIcon />
      </BaseSelect.ItemIndicator>
    </BaseSelect.Item>
  )
})
