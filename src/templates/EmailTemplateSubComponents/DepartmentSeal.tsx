import React, { CSSProperties, FC } from 'react'
import { EmailSubComponentProps } from './shared'
import { EmailBlock } from 'src/ui'
import { useLocalStorageJSON } from 'src/utils/useLocalStorage'
import { DepartmentSealKey, DepartmentSealsMapping } from 'src/utils/departmentSeals'
import { SpacingCell, StyleDefaults } from '../styles'
import Config from '../../../gatsby-config'

const { Row } = EmailBlock

const defaultValue: DepartmentSealKey = 'SHIELD'

export const useDepartmentSealValue = () => {
  return useLocalStorageJSON<DepartmentSealKey>('department-seal', defaultValue)
}

export const DepartmentSealMarkup: FC<{ departmentSealKey: DepartmentSealKey }> = ({
  departmentSealKey,
}) => {
  const departmentSeal = DepartmentSealsMapping[departmentSealKey]
  return (
    <Row
      data-testid="department-seal"
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
      <img
        alt={departmentSeal.label}
        src={`${Config.siteMetadata?.siteUrl}/department-seals/${departmentSeal.imageName}`}
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
