import React, { FC } from 'react'
import startCase from 'lodash.startcase'
import { VisuallyHidden } from '@reach/visually-hidden'
import { Heading, Paragraph } from 'src/ui/Layout'
import { Select } from 'src/ui/Select'
import { StateSealKey, StateSeals } from 'src/ui/StateSeal'
import { StateSealMarkup, useStateSealValue } from 'src/templates/EmailTemplateComponents/StateSeal'
import { EmailBlock } from '../EmailBlock'
import { EditableElement } from '../EditableElement'
import { Spacing } from 'src/templates/styles'

const stateSealOptions = Object.keys(StateSeals).map((key) => ({
  label: startCase(key),
  value: key,
}))

export const EditStateSeal: FC = () => {
  const [value, setValue] = useStateSealValue()

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
            onChange={((stateSealKey: StateSealKey) => setValue({ ...value, stateSealKey })) as any}
            options={stateSealOptions}
            value={value.stateSealKey}
          />
        </div>
      </form>
      <div className="edit-state-seal-preview">
        <EmailBlock.Table className="desktop" maxWidth={Spacing.layout.maxWidth}>
          <StateSealMarkup
            stateSealKey={value.stateSealKey}
            additionalDisclaimer={
              <EditableElement
                element="span"
                label="Additional Disclaimer"
                value={value.additionalDisclaimer}
                onValueChange={(additionalDisclaimer) =>
                  setValue({ ...value, additionalDisclaimer })
                }
              />
            }
          />
        </EmailBlock.Table>
      </div>
    </>
  )
}
