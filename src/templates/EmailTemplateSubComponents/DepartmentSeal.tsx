import React, { CSSProperties, FC } from 'react'
import { EmailSubComponentProps } from './shared'
import { EmailBlock } from 'src/ui'
import { useLocalStorageJSON } from 'src/utils/useLocalStorage'
import { StyleDefaults } from '../styles'
import { buildDepartmentSealUrl } from 'src/utils/siteUrl'
import { appModeAsStateAbbreviation } from 'src/utils/appMode'
import { departmentSealByImageName, departmentSealsForState } from 'src/utils/departmentSeals'

const { Row } = EmailBlock

const defaultValue = (): string => {
  const stateAbbreviation = appModeAsStateAbbreviation() ?? 'US'
  const [departmentSeal] = departmentSealsForState(stateAbbreviation)

  return departmentSeal?.imageName ?? 'US-DOL.png'
}

export const useDepartmentSealValue = () => {
  return useLocalStorageJSON<string>('department-seal', defaultValue())
}

export const DepartmentSealMarkup: FC<{ departmentSealImageName: string }> = ({
  departmentSealImageName,
}) => {
  const departmentSeal = departmentSealByImageName(departmentSealImageName)

  return (
    <Row
      data-testid="department-seal"
      className="department-seal"
      elements={[
        {
          part: 'cell',
          style: StyleDefaults.inline.colors,
          className: StyleDefaults.layout.narrow,
        },
        { part: 'table', style: tableStyles, maxWidth: '60%', width: 'unset' },
        'row',
        'cell',
      ]}
    >
      {departmentSeal && (
        <img
          alt={departmentSeal.label}
          src={buildDepartmentSealUrl(`/${departmentSeal.imageName}`)}
          style={imageStyles}
        />
      )}
    </Row>
  )
}

const tableStyles: CSSProperties = {
  overflow: 'hidden',
}

const imageStyles: CSSProperties = {
  height: 60,
}

export const DepartmentSeal: FC<EmailSubComponentProps<'DepartmentSeal'>> = () => {
  const [value] = useDepartmentSealValue()
  return <DepartmentSealMarkup departmentSealImageName={value} />
}
