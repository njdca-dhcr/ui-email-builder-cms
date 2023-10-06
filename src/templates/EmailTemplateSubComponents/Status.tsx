import React, { CSSProperties, FC, useMemo } from 'react'
import { EmailSubComponentProps } from './shared'
import { EmailTable, TableAndCell } from 'src/ui/EmailTable'
import { EditableElement } from 'src/ui/EditableElement'
import { useIsCurrentlyActiveEmailSubComponent } from '../CurrentlyActiveEmailPart'
import { useEmailPartsContentForSubComponent } from '../EmailPartsContent'
import { Colors, DefaultStyles, Font, Spacing } from '../styles'

export const enum StatusVariant {
  Overview,
  OverviewWithReason,
  MissingDocument,
  OverviewWithReasonAndAmountDue,
  OverviewWithReasonAndAmountBreakdown,
}

export interface StatusValue {
  variant: StatusVariant
  // Always used
  status: string
  description: string
  supportiveInformation: string
  // Often
  connector: string
  // Missing Document
  emailToLabel: string
  emailToValue: string
  subjectLineLabel: string
  subjectLineValue: string
  missingDocumentDeadline: string
  // Amount/Breakdown
  amountLabel: string
  overpaymentLabel: string
  overpaymentValue: string
  waivedLabel: string
  waivedValue: string
  totalLabel: string
  totalValue: string
}

export const defaultValue: StatusValue = {
  variant: StatusVariant.Overview,
  status: 'Status of Claim',
  connector: 'because...',
  description: '{Data Reference} or a sentence that colors more of the status of claim',
  supportiveInformation:
    'Supportive information around how the status above was informed and how a claimant will receive more detailed information and/or a determination.',
  emailToLabel: '',
  emailToValue: '',
  subjectLineLabel: '',
  subjectLineValue: '',
  missingDocumentDeadline: '',
  amountLabel: '',
  overpaymentLabel: '',
  overpaymentValue: '',
  waivedLabel: '',
  waivedValue: '',
  totalLabel: '',
  totalValue: '',
}

export const useStatusValue = (componentId: string, id: string) => {
  return useEmailPartsContentForSubComponent(componentId, id, defaultValue)
}

export const Status: FC<EmailSubComponentProps> = ({ componentId, id }) => {
  const { activate } = useIsCurrentlyActiveEmailSubComponent(componentId, id)
  const [value, setValue] = useStatusValue(componentId, id)

  const initialValue = useMemo(() => value, [value.variant])

  return (
    <tr key={value.variant} onClick={activate}>
      <td>
        <EmailTable>
          <tr>
            <td style={outerCellStyles}>
              <TableAndCell style={innerCellStyles}>
                <EmailTable>
                  <tr>
                    <EditableElement
                      element="td"
                      initialValue={initialValue.status}
                      label="Status title"
                      onValueChange={(status) => setValue({ ...value, status })}
                      style={titleStyles}
                      value={value.status}
                    />
                  </tr>
                  {[StatusVariant.OverviewWithReason].includes(value.variant) && (
                    <tr>
                      <EditableElement
                        element="td"
                        initialValue={initialValue.connector}
                        label='Status connector ("because", etc)'
                        onValueChange={(connector) => setValue({ ...value, connector })}
                        value={value.connector}
                        style={connectorStyles}
                      />
                    </tr>
                  )}
                  <tr>
                    <EditableElement
                      element="td"
                      initialValue={initialValue.description}
                      label="Status description"
                      onValueChange={(description) => setValue({ ...value, description })}
                      style={descriptionStyles}
                      value={value.description}
                    />
                  </tr>
                </EmailTable>
              </TableAndCell>
            </td>
          </tr>
          <tr>
            <EditableElement
              element="td"
              initialValue={initialValue.supportiveInformation}
              label="Status supportive information"
              onValueChange={(supportiveInformation) =>
                setValue({ ...value, supportiveInformation })
              }
              value={value.supportiveInformation}
              style={supportiveInformationStyles}
            />
          </tr>
        </EmailTable>
      </td>
    </tr>
  )
}

const outerCellStyles: CSSProperties = {
  ...DefaultStyles,
  paddingBottom: Spacing.size.medium,
  paddingTop: Spacing.size.medium,
}

const innerCellStyles: CSSProperties = {
  paddingLeft: 12,
  borderLeft: `8px solid ${Colors.grayDark}`,
  paddingTop: Spacing.size.small,
  paddingBottom: Spacing.size.small,
}

const titleStyles: CSSProperties = {
  fontSize: Font.size.extraLarge,
  fontWeight: Font.weight.bold,
  lineHeight: Font.lineHeight.default,
  paddingBottom: Spacing.size.small,
}

const connectorStyles: CSSProperties = {
  paddingBottom: Spacing.size.tiny,
}

const descriptionStyles: CSSProperties = {
  fontWeight: Font.weight.bold,
  lineHeight: Font.lineHeight.default,
}

const supportiveInformationStyles: CSSProperties = {
  ...DefaultStyles,
  color: Colors.grayDark,
  fontSize: Font.size.small,
  fontStyle: 'italic',
}
