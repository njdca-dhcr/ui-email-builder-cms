import React, { FC } from 'react'
import startCase from 'lodash.startcase'
import { VisuallyHidden } from '@reach/visually-hidden'
import { Heading, Paragraph } from 'src/ui/Layout'
import { Select } from 'src/ui/Select'
import { StateSeal, StateSeals, StateSealKey } from 'src/ui/StateSeal'
import { useStateSealValue } from 'src/templates/EmailTemplateComponents/StateSeal'

const stateSealOptions = Object.keys(StateSeals).map((key) => ({
  label: startCase(key),
  value: key,
}))

export const EditStateSeal: FC = () => {
  const [stateSeal, setStateSeal] = useStateSealValue()

  return (
    <>
      <form>
        <Heading element="h2" subheading>
          Select State
        </Heading>
        <Paragraph>Your state seal will show at the top of all emails.</Paragraph>

        <div className="edit-state-seal-field-group">
          <VisuallyHidden as="label" id="state-seal-select">
            Select your state
          </VisuallyHidden>
          <Select
            labelId="state-seal-select"
            onChange={(value) => setStateSeal(value as StateSealKey)}
            options={stateSealOptions}
            value={stateSeal}
          />
        </div>
      </form>
      <div className="edit-state-seal-preview">
        <StateSeal state={stateSeal} />
      </div>
    </>
  )
}
