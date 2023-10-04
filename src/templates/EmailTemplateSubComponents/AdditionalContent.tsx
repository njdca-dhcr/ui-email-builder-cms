import React, { CSSProperties, FC } from 'react'
import { EmailSubComponentProps } from './shared'
import { useIsCurrentlyActiveEmailSubComponent } from '../CurrentlyActiveEmailPart'
import { useEmailPartsContentForSubComponent } from '../EmailPartsContent'
import { Colors, DefaultStyles, Font, Spacing } from '../styles'
import { EditableElement } from 'src/ui/EditableElement'

const defaultValue =
  'The [INSERT STATE] Department of Labor and Workforce Development is an equal opportunity employer and offers equal opportunity programs. Auxiliary aids and services are available upon request to assist individuals with disabilities.'

export const AdditionalContent: FC<EmailSubComponentProps> = ({ id, componentId }) => {
  const { activate } = useIsCurrentlyActiveEmailSubComponent(componentId, id)
  const [value, setValue, { initialValue }] = useEmailPartsContentForSubComponent(
    componentId,
    id,
    defaultValue,
  )

  return (
    <tr onClick={activate}>
      <EditableElement
        data-testid="footer-additional-content"
        element="td"
        initialValue={initialValue}
        label="Additional content"
        onValueChange={setValue}
        style={styles}
        value={value}
      />
    </tr>
  )
}

const styles: CSSProperties = {
  ...DefaultStyles,
  color: Colors.gray,
  fontSize: Font.size.tiny,
  paddingBottom: Spacing.size.medium,
}
