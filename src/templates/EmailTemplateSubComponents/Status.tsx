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
  documentsNeededLabel: string
  documentsNeededValue: string
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
  documentsNeededLabel: 'We need the following:',
  documentsNeededValue: '{Name_of_document(s)}',
  emailToLabel: 'Email this to:',
  emailToValue: 'DUA@unemployment.gov',
  subjectLineLabel: 'Subject Line:',
  subjectLineValue: 'Eligible Pending Review Documents<br/>{Name_of_claimant}',
  missingDocumentDeadline:
    'If you do not submit your documents by 00/00/0000, you will be denied your claim and will be required to pay back any DUA funds released to you.',
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
                        label="Status due to label"
                        onValueChange={(connector) => setValue({ ...value, connector })}
                        value={value.connector}
                        style={connectorStyles}
                      />
                    </tr>
                  )}
                  {[StatusVariant.MissingDocument].includes(value.variant) ? (
                    <>
                      <tr>
                        <EditableElement
                          element="td"
                          initialValue={initialValue.documentsNeededLabel}
                          label="Documents needed label"
                          onValueChange={(documentsNeededLabel) =>
                            setValue({ ...value, documentsNeededLabel })
                          }
                          value={value.documentsNeededLabel}
                        />
                      </tr>
                      <tr>
                        <EditableElement
                          element="td"
                          initialValue={initialValue.documentsNeededValue}
                          label="Documents needed value"
                          onValueChange={(documentsNeededValue) =>
                            setValue({ ...value, documentsNeededValue })
                          }
                          value={value.documentsNeededValue}
                          style={{
                            fontSize: Font.size.medium,
                            fontWeight: Font.weight.bold,
                            paddingTop: Spacing.size.tiny,
                            paddingBottom: Spacing.size.medium,
                          }}
                        />
                      </tr>
                      <tr>
                        <td>
                          <EmailTable width="unset">
                            <tr>
                              <EditableElement
                                element="td"
                                initialValue={initialValue.emailToLabel}
                                label="Email to label"
                                onValueChange={(emailToLabel) =>
                                  setValue({ ...value, emailToLabel })
                                }
                                value={value.emailToLabel}
                                style={{
                                  fontSize: Font.size.small,
                                  fontWeight: Font.weight.bold,
                                  paddingRight: Spacing.size.small,
                                  paddingBottom: Spacing.size.tiny,
                                }}
                              />
                              <EditableElement
                                element="td"
                                initialValue={initialValue.emailToValue}
                                label="Email to value"
                                onValueChange={(emailToValue) =>
                                  setValue({ ...value, emailToValue })
                                }
                                value={value.emailToValue}
                                style={{
                                  fontSize: Font.size.small,
                                  fontWeight: Font.weight.normal,
                                }}
                              />
                            </tr>
                            <tr>
                              <EditableElement
                                element="td"
                                initialValue={initialValue.subjectLineLabel}
                                label="Subject line label"
                                onValueChange={(subjectLineLabel) =>
                                  setValue({ ...value, subjectLineLabel })
                                }
                                value={value.subjectLineLabel}
                                style={{
                                  fontSize: Font.size.small,
                                  fontWeight: Font.weight.bold,
                                  paddingRight: Spacing.size.small,
                                  verticalAlign: 'top',
                                }}
                              />
                              <EditableElement
                                element="td"
                                initialValue={initialValue.subjectLineValue}
                                label="Subject line value"
                                onValueChange={(subjectLineValue) =>
                                  setValue({ ...value, subjectLineValue })
                                }
                                value={value.subjectLineValue}
                                style={{
                                  fontSize: Font.size.small,
                                  fontWeight: Font.weight.normal,
                                }}
                              />
                            </tr>
                          </EmailTable>
                        </td>
                      </tr>
                    </>
                  ) : (
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
                  )}
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
          {[StatusVariant.MissingDocument].includes(value.variant) && (
            <tr>
              <EditableElement
                element="td"
                initialValue={initialValue.missingDocumentDeadline}
                label="Status deadline description"
                onValueChange={(missingDocumentDeadline) =>
                  setValue({ ...value, missingDocumentDeadline })
                }
                value={value.missingDocumentDeadline}
                style={{
                  ...DefaultStyles,
                  fontSize: Font.size.small,
                  fontWeight: Font.weight.bold,
                  fontStyle: 'italic',
                  paddingTop: Spacing.size.medium,
                }}
              />
            </tr>
          )}
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
