import React, { CSSProperties, FC } from 'react'
import { EmailSubComponentProps } from './shared'
import { useIsCurrentlyActiveEmailSubComponent } from '../CurrentlyActiveEmailPart'
import { EmailTable, TableAndCell } from 'src/ui/EmailTable'
import { EditableElement } from 'src/ui/EditableElement'
import { useEmailPartsContentForSubComponent } from '../EmailPartsContent'
import { DefaultStyles, Font, Spacing } from '../styles'

const defaultValue = {
  title: 'Supplemental Content Title',
  description:
    'Aenean lacinia bibendum nulla sed consectetur. Cras mattis consectetur purus sit amet fermentum. Curabitur blandit tempus porttitor. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
}

export const SupplementalContent: FC<EmailSubComponentProps> = ({ componentId, id }) => {
  const { activate } = useIsCurrentlyActiveEmailSubComponent(componentId, id)
  const [value, setValue, { initialValue }] = useEmailPartsContentForSubComponent(
    componentId,
    id,
    defaultValue,
  )

  return (
    <tr onClick={activate}>
      <td style={outerCellStyles}>
        <TableAndCell>
          <EmailTable>
            <tr>
              <EditableElement
                element="td"
                initialValue={initialValue.title}
                label="Supplemental content title"
                onValueChange={(title) => setValue({ ...value, title })}
                style={titleStyles}
                value={value.title}
              />
            </tr>
            <tr>
              <EditableElement
                element="td"
                initialValue={initialValue.description}
                label="Supplemental content description"
                onValueChange={(description) => setValue({ ...value, description })}
                style={descriptionStyles}
                value={value.description}
              />
            </tr>
          </EmailTable>
        </TableAndCell>
      </td>
    </tr>
  )
}

const outerCellStyles: CSSProperties = {
  ...DefaultStyles,
  paddingBottom: Spacing.size.medium,
  paddingTop: Spacing.size.medium,
}

const titleStyles: CSSProperties = {
  fontSize: Font.size.large,
  fontWeight: Font.weight.bold,
  paddingBottom: Spacing.size.small,
}
const descriptionStyles: CSSProperties = {
  lineHeight: Font.lineHeight.default,
}
