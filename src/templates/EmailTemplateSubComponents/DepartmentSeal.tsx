import React, { CSSProperties, FC } from 'react'
import { EmailSubComponentProps } from './shared'
import { EmailBlock } from 'src/ui'
import { StyleDefaults } from '../styles'
import { buildDepartmentSealUrl } from 'src/utils/siteUrl'
import { appModeAsStateAbbreviation } from 'src/utils/appMode'
import { departmentSealByImageName, departmentSealsForState } from 'src/utils/departmentSeals'
import { DepartmentSealValue } from 'src/appTypes'
import { useUserInfoValue } from 'src/utils/UserInfoContext'
import { departmentSealSchema } from 'src/utils/userInfoSchemas'

const { Row } = EmailBlock

const defaultValue = (): DepartmentSealValue => {
  const stateAbbreviation = appModeAsStateAbbreviation() ?? 'US'
  const [departmentSeal] = departmentSealsForState(stateAbbreviation)

  return { seal: departmentSeal?.imageName ?? 'US-DOL.png' }
}

export const useDepartmentSealValue = () =>
  useUserInfoValue('departmentSeal', defaultValue(), departmentSealSchema)

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
  return <DepartmentSealMarkup departmentSealImageName={value.seal} />
}
