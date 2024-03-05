import React, { CSSProperties, FC } from 'react'
import { EmailSubComponentProps } from '../EmailTemplateSubComponents/shared'
import { EmailBlock } from 'src/ui/EmailBlock'
import { EditableElement } from 'src/ui/EditableElement'
import { useIsCurrentlyActiveEmailPart } from '../CurrentlyActiveEmailPart'
import { useEmailPartsContentFor } from '../EmailPartsContent'
import { Borders, Spacing, StyleDefaults, Text, Font } from '../styles'
import { BoxColor, BoxColorConfigs } from 'src/ui/SelectBoxColor'
import { UswdsIcon } from 'src/ui/UswdsIcon'
import { useSyncSidebarAndPreviewScroll } from '../SyncSidebarAndPreviewScroll'
import { EmailTemplate, InformationalBoxValue } from 'src/appTypes'

const defaultValue: InformationalBoxValue = {
  boxColor: BoxColor.BenefitBlue,
  icon: 'LockOpen',
  title: 'Application confirmation number',
  description: 'Confirmation number: 123456789',
}

export const useInformationalBoxValue = (emailSubComponent: EmailTemplate.InformationalBox) => {
  return useEmailPartsContentFor(emailSubComponent, defaultValue)
}

const { Row, Cell } = EmailBlock

export const InformationalBox: FC<EmailSubComponentProps<'InformationalBox'>> = ({
  emailSubComponent,
}) => {
  const { activate } = useIsCurrentlyActiveEmailPart(emailSubComponent.id)
  const [value, setValue] = useInformationalBoxValue(emailSubComponent)
  const { previewRef, scrollSidebar } = useSyncSidebarAndPreviewScroll(emailSubComponent.id)

  const boxColorConfig = BoxColorConfigs[value.boxColor]

  return (
    <Row
      className="informational-box"
      onClick={(event) => {
        activate(event)
        scrollSidebar()
      }}
      onFocus={(event) => {
        activate(event)
        scrollSidebar()
      }}
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
      <Cell style={styles.iconContainer} align="left">
        <UswdsIcon icon={value.icon} />
      </Cell>
      <Cell style={{ width: '100%' }} elements={['table']}>
        <Row>
          <Cell>
            <EditableElement
              ref={previewRef}
              aria-level={2}
              element="div"
              value={value.title}
              label="Informational box title"
              onValueChange={(title) => setValue({ ...value, title })}
              role="heading"
              style={styles.title}
            />
          </Cell>
        </Row>
        <Row>
          <Cell>
            <EditableElement
              element="span"
              value={value.description}
              label="Informational box content"
              onValueChange={(description) => setValue({ ...value, description })}
              style={{ fontFamily: Font.family.default }}
            />
          </Cell>
        </Row>
      </Cell>
    </Row>
  )
}

const styles = {
  outerCell: {
    ...StyleDefaults.inline.colors,
    fontFamily: Font.family.default,
  } as CSSProperties,
  innerCell: {
    paddingTop: Spacing.informationalBox.vertical,
    paddingBottom: Spacing.informationalBox.vertical,
    paddingLeft: Spacing.informationalBox.horizontal.left,
    paddingRight: Spacing.informationalBox.horizontal.right,
  } as CSSProperties,
  iconContainer: {
    paddingRight: Spacing.size.medium,
  } as CSSProperties,
  title: {
    ...Text.header.h3.bold,
    paddingBottom: Spacing.size.medium,
    lineHeight: '1.2',
  } as CSSProperties,
}
