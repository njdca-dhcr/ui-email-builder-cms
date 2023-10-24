import React, { CSSProperties, FC } from 'react'
import { EmailSubComponentProps } from './shared'
import { EmailBlock } from 'src/ui'
import { useLocalStorageJSON } from 'src/utils/useLocalStorage'
import { DepartmentSealKey, DepartmentSealsMapping } from 'src/utils/departmentSeals'
import { SpacingCell, StyleDefaults } from '../styles'

const { Row } = EmailBlock

const defaultValue: DepartmentSealKey = 'SHIELD'

export const useDepartmentSealValue = () => {
  return useLocalStorageJSON<DepartmentSealKey>('department-seal', defaultValue)
}

export const DepartmentSealMarkup: FC<{ departmentSealKey: DepartmentSealKey }> = ({
  departmentSealKey,
}) => {
  return (
    <Row
      data-testid="department-seal"
      elements={[
        { part: 'cell', className: StyleDefaults.layout.narrow },
        { part: 'table', style: tableStyles, maxWidth: '60%', width: 'unset' },
        'row',
        'cell',
      ]}
    >
      <img
        alt=""
        src={`/department-seals/${DepartmentSealsMapping[departmentSealKey].imageName}`}
        style={imageStyles}
      />
    </Row>
  )
}

const tableStyles: CSSProperties = {
  overflow: 'hidden',
}

const imageStyles: CSSProperties = {
  height: 60,
}

export const DepartmentSeal: FC<EmailSubComponentProps> = () => {
  const [value] = useDepartmentSealValue()
  return (
    <>
      <DepartmentSealMarkup departmentSealKey={value} />
      <Row>
        <SpacingCell size="medium" />
      </Row>
      <Row>
        <SpacingCell size="medium" />
      </Row>
    </>
  )
}
