import React, { FC } from 'react'
import startCase from 'lodash.startcase'
import { Heading } from 'src/ui/Layout'
import { Select } from 'src/ui/Select'
import { StateSeals, StateSealKey } from 'src/ui/StateSeal'
import { useStateSealValue } from 'src/templates/EmailTemplateComponents/StateSeal'

const stateSealOptions = Object.keys(StateSeals).map((key) => ({
  label: startCase(key),
  value: key,
}))

export const StateSealSelect: FC = () => {
  const [stateSeal, setStateSeal] = useStateSealValue()

  return (
    <>
      <Heading element="h2" subheading>
        Select State
      </Heading>
      <Select
        labelId="string"
        onChange={(value) => setStateSeal(value as StateSealKey)}
        options={stateSealOptions}
        value={stateSeal}
      />
    </>
  )
}
