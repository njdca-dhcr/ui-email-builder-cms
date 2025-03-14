import React, { CSSProperties, FC } from 'react'
import { EmailSubComponentProps } from './shared'
import {
  BoxColor,
  BoxColorConfigs,
  EditableElement,
  EditableReceipt,
  EmailBlock,
  RichTextEditableElement,
  UswdsIcon,
} from 'src/ui'
import { useIsCurrentlyActiveEmailPart } from '../CurrentlyActiveEmailPart'
import { useEmailPartsContentFor } from '../EmailPartsContent'
import { Borders, Colors, Spacing, SpacingCell, StyleDefaults, Text } from '../styles'
import { useSyncSidebarAndPreviewScroll } from '../SyncSidebarAndPreviewScroll'
import { EmailParts, StatusVariant } from 'src/appTypes'

export const useStatusValue = (emailSubComponent: EmailParts.Status) => {
  return useEmailPartsContentFor(emailSubComponent)
}

const { Table, Row, Cell } = EmailBlock

export const Status: FC<EmailSubComponentProps<'Status'>> = ({ emailSubComponent, readOnly }) => {
  const { activate } = useIsCurrentlyActiveEmailPart(emailSubComponent.id)
  const [value, setValue] = useStatusValue(emailSubComponent)
  const { previewRef, scrollSidebar } = useSyncSidebarAndPreviewScroll(emailSubComponent.id)

  const boxColorConfig = BoxColorConfigs[value.boxColor]

  return (
    <Row
      key={value.variant}
      className="status"
      elements={['cell']}
      onClick={(event) => {
        activate(event)
        scrollSidebar()
      }}
      onFocus={(event) => {
        activate(event)
        scrollSidebar()
      }}
    >
      <Table>
        <Row
          elements={[
            { part: 'cell', style: styles.outerCell, className: StyleDefaults.layout.narrow },
            'table',
            'row',
            { part: 'cell', style: styles.innerCell },
            'table',
          ]}
        >
          <Row>
            <EditableElement
              readOnly={readOnly}
              ref={previewRef}
              aria-level={2}
              element="td"
              value={value.status}
              label="Status title"
              onValueChange={(status) => setValue({ ...value, status })}
              role="heading"
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
              readOnly={readOnly}
              element="td"
              value={value.statusDueTo}
              label="Status due to label"
              onValueChange={(statusDueTo) => setValue({ ...value, statusDueTo })}
              style={styles.statusDueTo}
            />
          </Row>
          {[StatusVariant.MissingDocument].includes(value.variant) ? (
            <>
              <Row>
                <EditableElement
                  readOnly={readOnly}
                  element="td"
                  value={value.documentsNeededLabel}
                  label="Documents needed label"
                  onValueChange={(documentsNeededLabel) =>
                    setValue({ ...value, documentsNeededLabel })
                  }
                  style={styles.documentsNeededLabel}
                />
              </Row>
              <Row>
                <EditableElement
                  readOnly={readOnly}
                  element="td"
                  value={value.documentsNeededValue}
                  label="Documents needed value"
                  onValueChange={(documentsNeededValue) =>
                    setValue({ ...value, documentsNeededValue })
                  }
                  style={styles.documentsNeededValue}
                />
              </Row>
              <Row elements={['cell', { part: 'table', role: 'table', width: 'unset' }]}>
                <Row role="row">
                  <EditableElement
                    readOnly={readOnly}
                    element="td"
                    value={value.emailToLabel}
                    label="Email to label"
                    onValueChange={(emailToLabel) => setValue({ ...value, emailToLabel })}
                    role="rowheader"
                    style={styles.emailToLabel}
                  />
                  <EditableElement
                    readOnly={readOnly}
                    element="td"
                    value={value.emailToValue}
                    label="Email to value"
                    onValueChange={(emailToValue) => setValue({ ...value, emailToValue })}
                    role="cell"
                    style={styles.emailToValue}
                  />
                </Row>
                <Row role="row">
                  <EditableElement
                    readOnly={readOnly}
                    element="td"
                    value={value.subjectLineLabel}
                    label="Subject line label"
                    onValueChange={(subjectLineLabel) => setValue({ ...value, subjectLineLabel })}
                    role="rowheader"
                    style={styles.subjectLineLabel}
                  />
                  <EditableElement
                    readOnly={readOnly}
                    element="td"
                    value={value.subjectLineValue}
                    label="Subject line value"
                    onValueChange={(subjectLineValue) => setValue({ ...value, subjectLineValue })}
                    role="cell"
                    style={styles.subjectLineValue}
                  />
                </Row>
              </Row>
            </>
          ) : (
            value.showDescription && (
              <Row>
                <RichTextEditableElement
                  readOnly={readOnly}
                  element="td"
                  value={value.description}
                  label="Status description"
                  onValueChange={(description) => setValue({ ...value, description })}
                  style={styles.description}
                />
              </Row>
            )
          )}
        </Row>
        <Row
          condition={[
            StatusVariant.OverviewWithReasonAndAmountDue,
            StatusVariant.OverviewWithReasonAndAmountBreakdown,
          ].includes(value.variant)}
          elements={[
            { part: 'cell', style: styles.amountContainer, className: StyleDefaults.layout.narrow },
            {
              part: 'table',
              width:
                StatusVariant.OverviewWithReasonAndAmountDue === value.variant
                  ? 'unset'
                  : undefined,
              style: {
                ...styles.amountTable,
                ...(StatusVariant.OverviewWithReasonAndAmountDue === value.variant
                  ? {
                      paddingTop: Spacing.size.medium,
                      paddingBottom: Spacing.size.medium,
                    }
                  : {}),
                backgroundColor: boxColorConfig.backgroundColor,
                borderLeft: Borders.large(boxColorConfig.accentColor),
              },
            },
          ]}
        >
          <Row>
            <Cell align="center" style={styles.amountIcon}>
              <UswdsIcon icon={value.icon} />
            </Cell>
            <EditableElement
              readOnly={readOnly}
              aria-level={3}
              element="td"
              value={value.amountLabel}
              label="Amount label"
              onValueChange={(amountLabel) => setValue({ ...value, amountLabel })}
              role="heading"
              style={styles.amountLabel}
            />
          </Row>
          <Row
            condition={[StatusVariant.OverviewWithReasonAndAmountBreakdown].includes(value.variant)}
          >
            <Cell>{null}</Cell>
            <Cell style={styles.breakdownContainer}>
              <EditableReceipt
                readOnly={readOnly}
                lineItems={value.amountLineItems}
                total={value.amountTotal}
                onLineItemChange={(index, part, newValue) => {
                  setValue({
                    ...value,
                    amountLineItems: value.amountLineItems.map((lineItem, i) =>
                      i === index ? { ...lineItem, [part]: newValue } : lineItem,
                    ),
                  })
                }}
                onTotalChange={(part, newValue) => {
                  setValue({
                    ...value,
                    amountTotal: { ...value.amountTotal, [part]: newValue },
                  })
                }}
              />
            </Cell>
          </Row>
        </Row>
        {value.showSupportiveInformation && (
          <>
            <Row>
              <SpacingCell size="medium" />
            </Row>
            <Row>
              <RichTextEditableElement
                readOnly={readOnly}
                element="td"
                className={StyleDefaults.layout.narrow}
                value={value.supportiveInformation}
                label="Status supportive information"
                onValueChange={(supportiveInformation) =>
                  setValue({ ...value, supportiveInformation })
                }
                style={styles.supportiveInformation}
              />
            </Row>
          </>
        )}
        {[StatusVariant.MissingDocument].includes(value.variant) &&
          value.showMissingDocumentDeadline && (
            <>
              <Row>
                <SpacingCell size="medium" />
              </Row>
              <Row condition={[StatusVariant.MissingDocument].includes(value.variant)}>
                <EditableElement
                  readOnly={readOnly}
                  element="td"
                  className={StyleDefaults.layout.narrow}
                  value={value.missingDocumentDeadline}
                  label="Status deadline description"
                  onValueChange={(missingDocumentDeadline) =>
                    setValue({ ...value, missingDocumentDeadline })
                  }
                  style={styles.missingDocumentDeadline}
                />
              </Row>
            </>
          )}
        <Row>
          <SpacingCell size={value.spaceAfter ? 'extraLarge' : 'medium'} />
        </Row>
      </Table>
    </Row>
  )
}

const styles = {
  outerCell: {
    ...StyleDefaults.inline.colors,
  } as CSSProperties,
  innerCell: {
    paddingLeft: Spacing.size.large,
    borderLeft: Borders.large(Colors.alert.neutral.dark),
    paddingTop: Spacing.size.small,
    paddingBottom: Spacing.size.small,
  } as CSSProperties,
  title: {
    ...Text.header.h2.bold,
    paddingBottom: Spacing.size.small,
  } as CSSProperties,
  statusDueTo: {
    ...Text.body.main.regular,
    paddingBottom: Spacing.size.tiny,
  } as CSSProperties,
  description: {
    ...Text.body.main.regular,
  } as CSSProperties,
  documentsNeededLabel: {
    ...Text.body.main.regular,
  } as CSSProperties,
  documentsNeededValue: {
    ...Text.body.main.bold,
    paddingTop: Spacing.size.tiny,
    paddingBottom: Spacing.size.medium,
  } as CSSProperties,
  emailToLabel: {
    ...Text.body.secondary.bold,
    paddingRight: Spacing.size.small,
    paddingBottom: Spacing.size.tiny,
  } as CSSProperties,
  emailToValue: {
    ...Text.body.secondary.regular,
  } as CSSProperties,
  subjectLineLabel: {
    ...Text.body.secondary.bold,
    paddingRight: Spacing.size.small,
    verticalAlign: 'top',
  } as CSSProperties,
  subjectLineValue: {
    ...Text.body.secondary.regular,
  } as CSSProperties,
  amountContainer: {
    ...StyleDefaults.inline.colors,
    paddingTop: Spacing.size.small,
  } as CSSProperties,
  amountTable: {
    paddingLeft: Spacing.informationalBox.horizontal.left,
    paddingRight: Spacing.informationalBox.horizontal.right,
    paddingTop: Spacing.informationalBox.vertical,
    paddingBottom: Spacing.informationalBox.vertical,
  } as CSSProperties,
  amountIcon: {
    paddingRight: Spacing.size.medium,
    width: 32,
  } as CSSProperties,
  amountLabel: {
    ...Text.header.h3.bold,
    lineHeight: '25px',
    verticalAlign: 'middle',
  } as CSSProperties,
  breakdownContainer: {
    paddingTop: Spacing.size.medium,
  } as CSSProperties,
  totalLabel: {
    ...Text.body.main.bold,
    paddingTop: Spacing.size.tiny,
  } as CSSProperties,
  totalValue: {
    ...Text.body.main.bold,
    paddingTop: Spacing.size.tiny,
  } as CSSProperties,
  supportiveInformation: {
    ...StyleDefaults.inline.colors,
    ...Text.caption.large.regular,
    color: Colors.grayDark,
  } as CSSProperties,
  missingDocumentDeadline: {
    ...StyleDefaults.inline.colors,
    ...Text.caption.large.boldItalic,
  } as CSSProperties,
} as const
