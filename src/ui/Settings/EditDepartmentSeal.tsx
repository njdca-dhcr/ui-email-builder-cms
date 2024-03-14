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
  const [value, setValue] = useDepartmentSealValue()

  const options = useMemo(buildOptions, [])

  return (
    <form>
      <Heading element="h2" subheading>
        Department Seal
      </Heading>
      <Paragraph>This will automatically show up when creating new emails.</Paragraph>

      <div className="edit-department-seal-field-group">
        <label id="department-seal-select">Current Seal</label>
        <Select
          labelId="department-seal-select"
          value={value}
          onChange={(newValue) => setValue(newValue)}
          options={options}
        />
      </div>
      <div className="department-seal-preview-container">
        <EmailBlock.Table maxWidth={Spacing.layout.maxWidth} className="desktop">
          <DepartmentSealMarkup departmentSealImageName={value} />
        </EmailBlock.Table>
      </div>
    </form>
  )
}
