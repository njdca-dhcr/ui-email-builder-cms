import React, { CSSProperties, FC, useMemo } from 'react'
import { EmailSubComponentProps } from './shared'
import { EditableElement } from 'src/ui/EditableElement'
import { useIsCurrentlyActiveEmailSubComponent } from '../CurrentlyActiveEmailPart'
import { useEmailPartsContentForSubComponent } from '../EmailPartsContent'
import { Colors, DefaultStyles, Font, Spacing } from '../styles'
import { EmailBlock } from 'src/ui/EmailBlock'
import { WarningIcon } from 'src/ui/WarningIcon'

export const enum StatusVariant {
  Overview,
  OverviewWithReason,
  MissingDocument,
  OverviewWithReasonAndAmountDue,
  OverviewWithReasonAndAmountBreakdown,
}

interface StatusValue {
  variant: StatusVariant
  // Always used
  status: string
  description: string
  supportiveInformation: string
  statusDueTo: string
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

const defaultValue: StatusValue = {
  variant: StatusVariant.Overview,
  status: 'Status of Claim',
  statusDueTo: 'because...',
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
  amountLabel: 'You owe $200',
  overpaymentLabel: 'Overpayment Total',
  overpaymentValue: '$200',
  waivedLabel: 'Amount waived',
  waivedValue: '$50',
  totalLabel: 'You must pay',
  totalValue: '$150',
}

export const useStatusValue = (componentId: string, id: string) => {
  return useEmailPartsContentForSubComponent(componentId, id, defaultValue)
}

const { Table, Row, Cell } = EmailBlock

export const Status: FC<EmailSubComponentProps> = ({ componentId, id }) => {
  const { activate } = useIsCurrentlyActiveEmailSubComponent(componentId, id)
  const [value, setValue] = useStatusValue(componentId, id)

  const initialValue = useMemo(() => value, [value.variant])

  return (
    <Row key={value.variant} elements={['cell']} onClick={activate}>
      <Table>
        <Row
          elements={[
            { part: 'cell', style: styles.outerCell },
            'table',
            'row',
            { part: 'cell', style: styles.innerCell },
            'table',
          ]}
        >
          <Row>
            <EditableElement
              element="td"
              initialValue={initialValue.status}
              label="Status title"
              onValueChange={(status) => setValue({ ...value, status })}
              style={styles.title}
            />
          </Row>
          <Row
            condition={[
              StatusVariant.OverviewWithReason,
              StatusVariant.OverviewWithReasonAndAmountDue,
              StatusVariant.OverviewWithReasonAndAmountBreakdown,
            ].includes(value.variant)}
          >
            <EditableElement
              element="td"
              initialValue={initialValue.statusDueTo}
              label="Status due to label"
              onValueChange={(statusDueTo) => setValue({ ...value, statusDueTo })}
              style={styles.statusDueTo}
            />
          </Row>
          {[StatusVariant.MissingDocument].includes(value.variant) ? (
            <>
              <Row>
                <EditableElement
                  element="td"
                  initialValue={initialValue.documentsNeededLabel}
                  label="Documents needed label"
                  onValueChange={(documentsNeededLabel) =>
                    setValue({ ...value, documentsNeededLabel })
                  }
                />
              </Row>
              <Row>
                <EditableElement
                  element="td"
                  initialValue={initialValue.documentsNeededValue}
                  label="Documents needed value"
                  onValueChange={(documentsNeededValue) =>
                    setValue({ ...value, documentsNeededValue })
                  }
                  style={styles.documentsNeededValue}
                />
              </Row>
              <Row elements={['cell', { part: 'table', width: 'unset' }]}>
                <Row>
                  <EditableElement
                    element="td"
                    initialValue={initialValue.emailToLabel}
                    label="Email to label"
                    onValueChange={(emailToLabel) => setValue({ ...value, emailToLabel })}
                    style={styles.emailToLabel}
                  />
                  <EditableElement
                    element="td"
                    initialValue={initialValue.emailToValue}
                    label="Email to value"
                    onValueChange={(emailToValue) => setValue({ ...value, emailToValue })}
                    style={styles.emailToValue}
                  />
                </Row>
                <Row>
                  <EditableElement
                    element="td"
                    initialValue={initialValue.subjectLineLabel}
                    label="Subject line label"
                    onValueChange={(subjectLineLabel) => setValue({ ...value, subjectLineLabel })}
                    style={styles.subjectLineLabel}
                  />
                  <EditableElement
                    element="td"
                    initialValue={initialValue.subjectLineValue}
                    label="Subject line value"
                    onValueChange={(subjectLineValue) => setValue({ ...value, subjectLineValue })}
                    style={styles.subjectLineValue}
                  />
                </Row>
              </Row>
            </>
          ) : (
            <Row>
              <EditableElement
                element="td"
                initialValue={initialValue.description}
                label="Status description"
                onValueChange={(description) => setValue({ ...value, description })}
                style={styles.description}
              />
            </Row>
          )}
        </Row>
        <Row
          condition={[
            StatusVariant.OverviewWithReasonAndAmountDue,
            StatusVariant.OverviewWithReasonAndAmountBreakdown,
          ].includes(value.variant)}
          elements={[
            { part: 'cell', style: styles.amountContainer },
            { part: 'table', maxWidth: 345, style: styles.amountTable },
          ]}
        >
          <Row>
            <Cell align="center" style={styles.amountIcon}>
              <WarningIcon />
            </Cell>
            <EditableElement
              element="td"
              initialValue={initialValue.amountLabel}
              label="Amount label"
              onValueChange={(amountLabel) => setValue({ ...value, amountLabel })}
              style={styles.amountLabel}
            />
          </Row>
          <Row
            condition={[StatusVariant.OverviewWithReasonAndAmountBreakdown].includes(value.variant)}
          >
            <Cell>{null}</Cell>
            <Cell elements={[{ part: 'table', maxWidth: 273 }]} style={styles.breakdownContainer}>
              <Row>
                <EditableElement
                  element="td"
                  initialValue={initialValue.overpaymentLabel}
                  label="Overpayment label"
                  onValueChange={(overpaymentLabel) => setValue({ ...value, overpaymentLabel })}
                  style={styles.overpaymentLabel}
                />
                <EditableElement
                  align="right"
                  element="td"
                  initialValue={initialValue.overpaymentValue}
                  label="Overpayment value"
                  onValueChange={(overpaymentValue) => setValue({ ...value, overpaymentValue })}
                  style={styles.overpaymentValue}
                />
              </Row>
              <Row>
                <EditableElement
                  element="td"
                  initialValue={initialValue.waivedLabel}
                  label="Waived label"
                  onValueChange={(waivedLabel) => setValue({ ...value, waivedLabel })}
                  style={styles.waivedLabel}
                />
                <EditableElement
                  align="right"
                  element="td"
                  initialValue={initialValue.waivedValue}
                  label="Waived value"
                  onValueChange={(waivedValue) => setValue({ ...value, waivedValue })}
                  style={styles.waivedValue}
                />
              </Row>
              <Row>
                <EditableElement
                  element="td"
                  initialValue={initialValue.totalLabel}
                  label="Amount total label"
                  onValueChange={(totalLabel) => setValue({ ...value, totalLabel })}
                  style={styles.totalLabel}
                />
                <EditableElement
                  align="right"
                  element="td"
                  initialValue={initialValue.totalValue}
                  label="Amount total value"
                  onValueChange={(totalValue) => setValue({ ...value, totalValue })}
                  style={styles.totalValue}
                />
              </Row>
            </Cell>
          </Row>
        </Row>
        <Row>
          <EditableElement
            element="td"
            initialValue={initialValue.supportiveInformation}
            label="Status supportive information"
            onValueChange={(supportiveInformation) => setValue({ ...value, supportiveInformation })}
            style={styles.supportiveInformation}
          />
        </Row>
        <Row condition={[StatusVariant.MissingDocument].includes(value.variant)}>
          <EditableElement
            element="td"
            initialValue={initialValue.missingDocumentDeadline}
            label="Status deadline description"
            onValueChange={(missingDocumentDeadline) =>
              setValue({ ...value, missingDocumentDeadline })
            }
            style={styles.missingDocumentDeadline}
          />
        </Row>
      </Table>
    </Row>
  )
}

const styles = {
  outerCell: {
    ...DefaultStyles,
    paddingBottom: Spacing.size.medium,
    paddingTop: Spacing.size.medium,
  } as CSSProperties,
  innerCell: {
    paddingLeft: 12,
    borderLeft: `8px solid ${Colors.grayDark}`,
    paddingTop: Spacing.size.small,
    paddingBottom: Spacing.size.small,
  } as CSSProperties,
  title: {
    fontSize: Font.size.extraLarge,
    fontWeight: Font.weight.bold,
    lineHeight: Font.lineHeight.default,
    paddingBottom: Spacing.size.small,
  } as CSSProperties,
  statusDueTo: {
    paddingBottom: Spacing.size.tiny,
  } as CSSProperties,
  description: {
    fontWeight: Font.weight.bold,
    lineHeight: Font.lineHeight.default,
  } as CSSProperties,
  documentsNeededValue: {
    fontSize: Font.size.medium,
    fontWeight: Font.weight.bold,
    paddingTop: Spacing.size.tiny,
    paddingBottom: Spacing.size.medium,
  } as CSSProperties,
  emailToLabel: {
    fontSize: Font.size.small,
    fontWeight: Font.weight.bold,
    paddingRight: Spacing.size.small,
    paddingBottom: Spacing.size.tiny,
  } as CSSProperties,
  emailToValue: {
    fontSize: Font.size.small,
    fontWeight: Font.weight.normal,
  } as CSSProperties,
  subjectLineLabel: {
    fontSize: Font.size.small,
    fontWeight: Font.weight.bold,
    paddingRight: Spacing.size.small,
    verticalAlign: 'top',
  } as CSSProperties,
  subjectLineValue: {
    fontSize: Font.size.small,
    fontWeight: Font.weight.normal,
  } as CSSProperties,
  amountContainer: {
    ...DefaultStyles,
    paddingRight: Spacing.size.small,
    paddingTop: Spacing.size.small,
    paddingBottom: Spacing.size.large,
  } as CSSProperties,
  amountTable: {
    backgroundColor: Colors.warningBackground,
    borderLeft: `8px solid ${Colors.warning}`,
    padding: Spacing.size.medium,
    paddingRight: Spacing.size.extraLarge,
  } as CSSProperties,
  amountIcon: {
    verticalAlign: 'center',
    paddingRight: Spacing.size.medium,
    width: 32,
  } as CSSProperties,
  amountLabel: {
    verticalAlign: 'center',
    fontWeight: Font.weight.bold,
    fontSize: Font.size.large,
  } as CSSProperties,
  breakdownContainer: {
    paddingTop: Spacing.size.medium,
  } as CSSProperties,
  overpaymentLabel: {
    fontSize: Font.size.small,
    fontWeight: Font.weight.normal,
    lineHeight: Font.lineHeight.default,
    paddingBottom: Spacing.size.tiny,
  } as CSSProperties,
  overpaymentValue: {
    fontSize: Font.size.small,
    fontWeight: Font.weight.normal,
    lineHeight: Font.lineHeight.default,
    paddingBottom: Spacing.size.tiny,
  } as CSSProperties,
  waivedLabel: {
    fontStyle: 'italic',
    fontSize: Font.size.small,
    fontWeight: Font.weight.bold,
    lineHeight: Font.lineHeight.default,
    borderBottom: `2px solid ${Colors.black}`,
    paddingBottom: Spacing.size.small,
  } as CSSProperties,
  waivedValue: {
    fontStyle: 'italic',
    fontSize: Font.size.small,
    fontWeight: Font.weight.bold,
    lineHeight: Font.lineHeight.default,
    borderBottom: `2px solid ${Colors.black}`,
    paddingBottom: Spacing.size.small,
  } as CSSProperties,
  totalLabel: {
    fontSize: Font.size.medium,
    fontWeight: Font.weight.bold,
    lineHeight: Font.lineHeight.default,
    paddingTop: Spacing.size.tiny,
  } as CSSProperties,
  totalValue: {
    fontSize: Font.size.medium,
    fontWeight: Font.weight.bold,
    lineHeight: Font.lineHeight.default,
    paddingTop: Spacing.size.tiny,
  } as CSSProperties,
  supportiveInformation: {
    ...DefaultStyles,
    color: Colors.grayDark,
    fontSize: Font.size.small,
    fontStyle: 'italic',
  } as CSSProperties,
  missingDocumentDeadline: {
    ...DefaultStyles,
    fontSize: Font.size.small,
    fontWeight: Font.weight.bold,
    fontStyle: 'italic',
    paddingTop: Spacing.size.medium,
  } as CSSProperties,
} as const
