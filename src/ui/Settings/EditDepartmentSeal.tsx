import React, { FC, useMemo } from 'react'
import {
  DepartmentSealMarkup,
  useDepartmentSealValue,
} from 'src/templates/EmailTemplateSubComponents/DepartmentSeal'
import { Heading, Paragraph } from 'src/ui/Layout'
import { Select } from '../Select'
import { EmailBlock } from '../EmailBlock'
import { Spacing } from 'src/templates/styles'
import { appModeAsStateAbbreviation } from 'src/utils/appMode'
import { DEPARTMENT_SEALS, departmentSealsForState } from 'src/utils/departmentSeals'
import { LoadingOverlay } from '../LoadingOverlay'
import { SaveButton } from './SaveButton'
import { useUpdateDepartmentSeal } from 'src/network/useUpdateDepartmentSeal'
import { Form, FormErrorMessage } from '../Form'

const buildOptions = (): Array<{ label: string; value: string }> => {
  const stateAbbreviation = appModeAsStateAbbreviation()
  const departmentSeals = stateAbbreviation
    ? departmentSealsForState(stateAbbreviation)
    : DEPARTMENT_SEALS

  return departmentSeals.map((departmentSeal) => {
    return { label: departmentSeal.label, value: departmentSeal.imageName }
  })
}

export const EditDepartmentSeal: FC = () => {
  const [departmentSeal, setValue, { hasChanges }] = useDepartmentSealValue()
  const { error, mutate, isPending } = useUpdateDepartmentSeal()
  const options = useMemo(buildOptions, [])

  return (
    <Form onSubmit={() => mutate(departmentSeal)}>
      <Heading element="h2" subheading>
        Department Seal
      </Heading>
      <Paragraph>This will automatically show up when creating new emails.</Paragraph>
      <FormErrorMessage errorMessage={error?.message} />
      <div className="edit-department-seal-field-group">
        <label id="department-seal-select">Current Seal</label>
        <Select
          labelId="department-seal-select"
          value={departmentSeal.seal}
          onChange={(newValue) => setValue({ seal: newValue })}
          options={options}
        />
      </div>
      <div className="department-seal-preview-container">
        <EmailBlock.Table maxWidth={Spacing.layout.maxWidth} className="desktop">
          <DepartmentSealMarkup departmentSealImageName={departmentSeal.seal} />
        </EmailBlock.Table>
      </div>
      <SaveButton hasChanges={hasChanges} isPending={isPending} />
      {isPending && <LoadingOverlay description="Saving department seal" />}
    </Form>
  )
}
