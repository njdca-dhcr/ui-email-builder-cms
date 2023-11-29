import React, { CSSProperties, FC } from 'react'
import { EmailSubComponentProps } from '../EmailTemplateSubComponents/shared'
import { EmailBlock } from 'src/ui/EmailBlock'
import { EditableElement } from 'src/ui/EditableElement'
import { useIsCurrentlyActiveEmailPart } from '../CurrentlyActiveEmailPart'
import { useEmailPartsContentFor } from '../EmailPartsContent'
import { Borders, Spacing, SpacingCell, StyleDefaults, Text, Font } from '../styles'
import { BoxColor, BoxColorConfigs } from 'src/ui/SelectBoxColor'
import { UswdsIcon, UswdsIconVariantKey } from 'src/ui/UswdsIcon'

interface InformationalBoxValue {
  boxColor: BoxColor
  icon: UswdsIconVariantKey
  title: string
  description: string
}

const defaultValue: InformationalBoxValue = {
  boxColor: BoxColor.BenefitBlue,
  icon: 'LockOpen',
  title: 'Application confirmation number',
  description: 'Confirmation number: 123456789',
}

export const useInformationalBoxValue = (id: string) => {
  return useEmailPartsContentFor(id, defaultValue)
}

const { Table, Row, Cell } = EmailBlock

export const InformationalBox: FC<EmailSubComponentProps> = ({ emailSubComponent }) => {
  const { activate } = useIsCurrentlyActiveEmailPart(emailSubComponent.id)
  const [value, setValue] = useInformationalBoxValue(emailSubComponent.id)

  const boxColorConfig = BoxColorConfigs[value.boxColor]

  return (
    <>
      <Row
        onClick={activate}
        elements={[
          'cell',
          'table',
          'row',
          { part: 'cell', style: styles.outerCell, className: StyleDefaults.layout.wide },
          'table',
          'row',
          {
            part: 'cell',
            style: {
              ...styles.innerCell,
              backgroundColor: boxColorConfig.backgroundColor,
              borderLeft: Borders.large(boxColorConfig.accentColor),
            },
          },
          'table',
          'row',
        ]}
      >
        <Cell>
          <UswdsIcon icon={value.icon} />
        </Cell>
        <Cell elements={['table']}>
          <Row>
            <Cell>value.title</Cell>
          </Row>
          <Row>
            <Cell>value.description</Cell>
          </Row>
        </Cell>
      </Row>
      <Row>
        <SpacingCell size='extraLarge'/>
      </Row>
    </>
  )
}

const styles = {
  outerCell: {
    ...StyleDefaults.inline.colors,
  } as CSSProperties,
  innerCell: {
    paddingTop: Spacing.size.medium,
    paddingBottom: Spacing.size.medium,
  } as CSSProperties,
}
