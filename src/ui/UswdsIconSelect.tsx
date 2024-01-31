import React, { FC } from 'react'
import startCase from 'lodash.startcase'
import { Select } from 'src/ui'
import { UswdsIconVariantKey, UswdsIconVariants } from 'src/ui/UswdsIcon'

interface UswdsIconSelectProps {
  onChange: (icon: UswdsIconVariantKey) => void
  value: UswdsIconVariantKey
  labelId: string
}

const iconOptions = Object.keys(UswdsIconVariants).map((key) => ({
  label: startCase(key),
  value: key,
}))

export const UswdsIconSelect: FC<UswdsIconSelectProps> = ({ onChange, value, labelId }) => {
  return (
    <Select
      size="small"
      labelId={labelId}
      options={iconOptions}
      onChange={(value) => onChange(value as UswdsIconVariantKey)}
      value={value}
    />
  )
}
