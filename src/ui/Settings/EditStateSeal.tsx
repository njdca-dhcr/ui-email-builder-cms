import React, { FC } from 'react'
import startCase from 'lodash.startcase'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { Heading, Paragraph } from 'src/ui/Layout'
import { Select } from 'src/ui/Select'
import { STATE_SEALS } from 'src/utils/StateSeal'
import { StateSealMarkup, useStateSealValue } from 'src/templates/EmailTemplateComponents/StateSeal'
import { EmailBlock } from '../EmailBlock'
import { EditableElement } from '../EditableElement'
import { Spacing } from 'src/templates/styles'
import { isAllStatesMode } from 'src/utils/appMode'
import { StateAbbreviation } from 'src/utils/statesAndTerritories'

const stateSealOptions = STATE_SEALS.map(({ state, image }) => ({
  label: startCase(image),
  value: state,
}))

export const EditStateSeal: FC = () => {
  const [value, setValue] = useStateSealValue()

  return (
    <>
      <Heading element="h2" subheading>
        State Seal
      </Heading>
      <Paragraph>This state seal will show at the bottom of all emails.</Paragraph>

      {isAllStatesMode() && (
        <form>
          <div className="edit-state-seal-field-group">
            <VisuallyHidden>
              <label id="state-seal-select">Select your state</label>
            </VisuallyHidden>
            <Select
              labelId="state-seal-select"
              onChange={
                ((stateAbbreviation: StateAbbreviation) =>
                  setValue({ ...value, stateAbbreviation })) as any
              }
              options={stateSealOptions}
              value={value.stateAbbreviation}
            />
          </div>
        </form>
      )}
      <div className="edit-state-seal-preview">
        <EmailBlock.Table className="desktop" maxWidth={Spacing.layout.maxWidth - 150}>
          <StateSealMarkup
            leftJustify
            stateAbbreviation={value.stateAbbreviation}
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
