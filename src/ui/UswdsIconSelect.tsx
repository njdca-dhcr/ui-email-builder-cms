import React, { FC } from 'react'
import { Select } from 'src/ui'
import { UswdsIconVariantKey, UswdsIconVariants } from 'src/ui/UswdsIcon'

interface UswdsIconSelectProps {
  onChange: (icon: UswdsIconVariantKey) => void
  value: UswdsIconVariantKey
  labelId: string
}

const iconOptions = Object.keys(UswdsIconVariants).map((key) => ({
  label: key,
  value: key,
}))

export const UswdsIconSelect: FC<UswdsIconSelectProps> = ({ onChange, value, labelId }) => {
  return (
    <Select
      labelId={labelId}
      options={iconOptions}
      onChange={(value) => onChange(value as UswdsIconVariantKey)}
      value={value}
    />
  )
}
