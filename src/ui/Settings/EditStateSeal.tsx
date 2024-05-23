import React, { FC } from 'react'
import startCase from 'lodash.startcase'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { Heading, Paragraph, Select } from 'src/ui'
import { STATE_SEALS } from 'src/utils/StateSeal'
import { StateSealMarkup, useStateSealValue } from 'src/templates/EmailTemplateComponents/StateSeal'
import { EmailBlock } from '../EmailBlock'
import { EditableElement } from '../EditableElement'
import { Spacing } from 'src/templates/styles'
import { isAllStatesMode } from 'src/utils/appMode'
import { StateAbbreviation } from 'src/utils/statesAndTerritories'
import { useUpdateStateSeal } from 'src/network/useUpdateStateSeal'
import { SaveButton } from './SaveButton'
import { LoadingOverlay } from '../LoadingOverlay'
import { Form, FormErrorMessage } from '../Form'

const stateSealOptions = STATE_SEALS.map(({ state, image }) => ({
  label: startCase(image),
  value: state,
}))

export const EditStateSeal: FC = () => {
  const [stateSeal, setValue, { hasChanges }] = useStateSealValue()
  const { error, mutate, isPending } = useUpdateStateSeal()

  return (
    <Form onSubmit={() => mutate(stateSeal)}>
      <Heading element="h2" subheading>
        State Seal
      </Heading>
      <Paragraph>This state seal will show at the bottom of all emails.</Paragraph>
      <FormErrorMessage errorMessage={error?.message} />
      {isAllStatesMode() && (
        <div className="edit-state-seal-field-group">
          <VisuallyHidden>
            <label id="state-seal-select">Select your state</label>
          </VisuallyHidden>
          <Select
            labelId="state-seal-select"
            onChange={
              ((stateAbbreviation: StateAbbreviation) =>
                setValue({ ...stateSeal, stateAbbreviation })) as any
            }
            options={stateSealOptions}
            value={stateSeal.stateAbbreviation}
          />
        </div>
      )}
      <div className="edit-state-seal-preview">
        <EmailBlock.Table className="desktop" maxWidth={Spacing.layout.maxWidth - 150}>
          <StateSealMarkup
            leftJustify
            stateAbbreviation={stateSeal.stateAbbreviation}
            additionalDisclaimer={
              <EditableElement
                element="span"
                label="Additional Disclaimer"
                value={stateSeal.additionalDisclaimer}
                onValueChange={(additionalDisclaimer) =>
                  setValue({ ...stateSeal, additionalDisclaimer })
                }
              />
            }
          />
        </EmailBlock.Table>
      </div>
      <SaveButton hasChanges={hasChanges} isPending={isPending} />
      {isPending && <LoadingOverlay description="Saving state seal" />}
    </Form>
  )
}
