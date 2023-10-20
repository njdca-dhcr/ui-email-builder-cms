import React, { FC } from 'react'
import { Select } from 'src/ui'
import { UswdsIconVariants } from 'src/ui/UswdsIcon'

interface UswdsIconSelectProps {
  onChange: (icon: keyof typeof UswdsIconVariants) => void
  value: keyof typeof UswdsIconVariants
  labelId: string
}

const iconOptions = (Object.keys(UswdsIconVariants) as Array<keyof typeof UswdsIconVariants>).map((key) => ({
  label: key,
  value: key,
}))

export const UswdsIconSelect: FC<UswdsIconSelectProps> = ({ onChange, value, labelId }) => {
  return (
    <Select
      labelId={labelId}
      options={iconOptions}
      onChange={onChange as any}
      value={value}
    />
  )
}