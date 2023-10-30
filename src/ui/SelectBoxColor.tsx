import React, { FC } from 'react'
import { Select } from './Select'

export enum BoxColor {
  BenefitBlue = 'Benefit Blue',
  GrantedGreen = 'Granted Green',
  GoverningGray = 'Governing Gray',
  YieldingYellow = 'Yielding Yellow',
}

interface BoxColorConfig {
  accentColor: string
  backgroundColor: string
}

export const BoxColorConfigs = {
  [BoxColor.BenefitBlue]: { accentColor: '#00BDE3', backgroundColor: '#E7F6F8' } as BoxColorConfig,
  [BoxColor.GrantedGreen]: { accentColor: '#8CEAB7', backgroundColor: '#DAFBE9' } as BoxColorConfig,
  [BoxColor.GoverningGray]: {
    accentColor: '#3D4551',
    backgroundColor: '#F0F0F0',
  } as BoxColorConfig,
  [BoxColor.YieldingYellow]: {
    accentColor: '#FFBE2E',
    backgroundColor: '#FAF3D1',
  } as BoxColorConfig,
} as const

interface Props {
  labelId: string
  onChange: (boxColor: BoxColor) => void
  value: BoxColor
}

export const SelectBoxColor: FC<Props> = ({ labelId, onChange, value }) => {
  return (
    <Select
      labelId={labelId}
      value={value}
      onChange={(newValue) => onChange(newValue as BoxColor)}
      options={[
        { label: BoxColor.BenefitBlue, value: BoxColor.BenefitBlue },
        { label: BoxColor.GrantedGreen, value: BoxColor.GrantedGreen },
        { label: BoxColor.GoverningGray, value: BoxColor.GoverningGray },
        { label: BoxColor.YieldingYellow, value: BoxColor.YieldingYellow },
      ]}
    />
  )
}
