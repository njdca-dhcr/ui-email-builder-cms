import React, { FC, useMemo } from 'react'
import {
  DepartmentSealMarkup,
  useDepartmentSealValue,
} from 'src/templates/EmailTemplateSubComponents/DepartmentSeal'
import { Heading, Paragraph } from 'src/ui/Layout'
import { Select } from '../Select'
import { DepartmentSealKey, DepartmentSealsMapping } from 'src/utils/departmentSeals'
import { EmailBlock } from '../EmailBlock'
import { Spacing } from 'src/templates/styles'
import { isAllStatesMode } from 'src/utils/appMode'

const buildOptions = (): Array<{ label: string; value: string }> => {
  const options = Object.keys(DepartmentSealsMapping).map((key) => {
    const { label }: { label: string } = DepartmentSealsMapping[key as DepartmentSealKey]
    return { label, value: key }
  })

  if (isAllStatesMode()) {
    return options
  } else {
    return options.filter(({ value }) => value.startsWith('New-Jersey'))
  }
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
          onChange={(newValue) => setValue(newValue as DepartmentSealKey)}
          options={options}
        />
      </div>
      <div className="department-seal-preview-container">
        <EmailBlock.Table maxWidth={Spacing.layout.maxWidth} className="desktop">
          <DepartmentSealMarkup departmentSealKey={value} />
        </EmailBlock.Table>
      </div>
    </form>
  )
}
