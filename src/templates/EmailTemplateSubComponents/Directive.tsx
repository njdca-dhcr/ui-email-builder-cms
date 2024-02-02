import React, { CSSProperties, FC } from 'react'
import { EmailSubComponentProps } from './shared'
import { EditableElement } from 'src/ui/EditableElement'
import { useIsCurrentlyActiveEmailPart } from '../CurrentlyActiveEmailPart'
import { useEmailPartsContentFor } from '../EmailPartsContent'
import { Borders, Colors, Font, Spacing, StyleDefaults, Text } from '../styles'
import { EmailBlock } from 'src/ui'
import { useSyncSidebarAndPreviewScroll } from '../SyncSidebarAndPreviewScroll'

const DISPLAYED_HREF_MAX_WIDTH = 297

export const enum DirectiveVariant {
  OneStep,
  ThreeStep,
  StepTwoExpansion,
  // CostBreakdown,
  PayOnline,
}

export interface DirectiveValue {
  variant: DirectiveVariant

  // Always Used
  title: string
  showTitle: boolean
  label: string
  linkHref: string
  buttonLabel: string

  // OneStep
  step1Label: string
  step1Additional: string
  oneStepSupportiveText: string

  // ThreeStep uses OneStep values
  step2Label: string
  showStep1AdditionalContent: boolean
  showStep2AdditionalContent: boolean
  step2Additional: string
  step3Label: string
  showStep3AdditionalContent: boolean
  step3Additional: string

  // StepTwoExpansion uses ThreeStep values
  step2Tertiary: string
  step2CaseNumber: string

  // PayOnline uses OneStep values
  alternativePaymentLabel: string
  payOnlineSupportiveText: string

  // CostBreakdown
}

export const defaultValue: DirectiveValue = {
  variant: DirectiveVariant.OneStep,
  title: 'Directive Title',
  showTitle: true,
  label: 'To help resolve this issue, complete the following steps:',
  linkHref:
    'https://link.embedded-into-the-button-above.should-be-shown-here-in-order-to-give-an-alternative-way-to-access-a-link',
  buttonLabel: 'Get Started',
  step1Label: 'Step 1 Directive',
  showStep1AdditionalContent: true,
  step1Additional: 'Additional information around Step 1',
  oneStepSupportiveText:
    'Supportive information around how the status above was informed and how a claimant will receive more detailed information and/or a determination.',
  step2Label: 'Step 2 Directive',
  showStep2AdditionalContent: true,
  step2Additional: 'Additional information around Step 2',
  step2Tertiary:
    'Tertiary information around Step 2, (usually involving an alternate way to complete the second step).',
  step2CaseNumber: 'Case #: [000000]',
  step3Label: 'Step 3 Directive',
  showStep3AdditionalContent: true,
  step3Additional: 'Additional information around Step 3',
  alternativePaymentLabel:
    'Or, send a check here: <br>Bureau of Benefit Payment Control<br>c/o Refund Processing Station<br>P.O. Box 951<br>Trenton, NJ 08625-0951',
  payOnlineSupportiveText:
    'Make the check or money order payable to NJ Dept. of Labor and Workforce Development. Be sure to write your name and social security number on the payment.',
}

export const useDirectiveValue = (id: string) => {
  return useEmailPartsContentFor(id, defaultValue)
}

const { Table, Row, Cell, Link } = EmailBlock

export const Directive: FC<EmailSubComponentProps> = ({ emailSubComponent }) => {
  const { activate } = useIsCurrentlyActiveEmailPart(emailSubComponent.id)
  const [value, setValue] = useEmailPartsContentFor(emailSubComponent.id, defaultValue)
  const { previewRef, scrollSidebar } = useSyncSidebarAndPreviewScroll(emailSubComponent.id)

  return (
    <Row
      className="directive"
      elements={[
        { part: 'cell', className: 'section-wrapper' },
        { part: 'table', className: 'el-center', align: 'center' },
        'row',
        { part: 'cell', className: StyleDefaults.layout.wide, style: styles.outerCellStyles },
        {
          part: 'table',
          style: [DirectiveVariant.PayOnline].includes(value.variant) ? styles.payOnlineBox : {},
        },
      ]}
      onClick={(event) => {
        activate(event)
        scrollSidebar()
      }}
      onFocus={(event) => {
        activate(event)
        scrollSidebar()
      }}
    >
      <tr ref={previewRef} />
      {/* Directive Title */}
      {value.showTitle && (
        <>
          <Row elements={['cell', 'table', 'row', { part: 'cell', style: { textAlign: 'left' } }]}>
            <div style={{ lineHeight: '150%' }}>
              <h2 style={styles.stepNumberLabel}>
                {[DirectiveVariant.PayOnline].includes(value.variant) ? (
                  <>
                    <b>Pay Online</b> today
                  </>
                ) : (
                  <EditableElement
                    element="b"
                    label="Directive Title"
                    onValueChange={(title) => setValue({ ...value, title })}
                    value={value.title}
                  />
                )}
              </h2>
            </div>
          </Row>
        </>
      )}

      {/* One Step or Pay Online */}
      {[DirectiveVariant.OneStep, DirectiveVariant.PayOnline].includes(value.variant) && (
        <>
          <Row elements={['cell', { part: 'table', align: 'left' }]}>
            {/* Space Above Button */}
            <Row elements={['cell']}>
              <div style={styles.whiteSpace}>&nbsp;</div>
            </Row>

            {/* Button */}
            <Row
              elements={[
                'cell',
                { part: 'table', width: 'unset', className: 'get-started-button' },
                'row',
                { part: 'cell', style: styles.getStartedButton },
              ]}
            >
              <Link to={value.linkHref}>
                <EditableElement
                  element="span"
                  value={value.buttonLabel}
                  label="Directive Button"
                  onValueChange={(buttonLabel) => setValue({ ...value, buttonLabel })}
                  style={styles.getStartedButtonText}
                />
              </Link>
            </Row>

            {/* Space After Button */}
            <Row elements={['cell']}>
              <div style={styles.whiteSpace}>&nbsp;</div>
            </Row>

            {/* Same Link As Button */}
            <Row elements={[{ part: 'cell', style: styles.linkText, className: 'displayed-href' }]}>
              <Link to={value.linkHref}>
                <EditableElement
                  element="span"
                  label="Directive Link"
                  value={value.linkHref}
                  onValueChange={(linkHref) => setValue({ ...value, linkHref })}
                />
              </Link>
            </Row>
          </Row>

          {[DirectiveVariant.OneStep].includes(value.variant) && (
            <tr>
              <EditableElement
                element="td"
                label="Supportive information"
                onValueChange={(oneStepSupportiveText) =>
                  setValue({ ...value, oneStepSupportiveText })
                }
                value={value.oneStepSupportiveText}
                style={styles.supportiveInformation}
              />
            </tr>
          )}

          {[DirectiveVariant.PayOnline].includes(value.variant) && (
            <>
              <tr>
                <EditableElement
                  element="td"
                  label="Alternative payment information"
                  onValueChange={(alternativePaymentLabel) =>
                    setValue({ ...value, alternativePaymentLabel })
                  }
                  value={value.alternativePaymentLabel}
                  style={styles.alternativePayment}
                />
              </tr>

              <tr>
                <td>
                  <div style={{ height: '15px', lineHeight: '15px', fontSize: '15px' }}>&nbsp;</div>
                </td>
              </tr>

              <tr>
                <EditableElement
                  element="td"
                  label="Supportive information"
                  onValueChange={(payOnlineSupportiveText) =>
                    setValue({ ...value, payOnlineSupportiveText })
                  }
                  value={value.payOnlineSupportiveText}
                  style={styles.supportiveInformation}
                />
              </tr>
            </>
          )}
        </>
      )}

      {/* Three Step Directive and Step 2 Expansion */}
      {[DirectiveVariant.ThreeStep, DirectiveVariant.StepTwoExpansion].includes(value.variant) && (
        <>
          {/* Directive Label */}
          <Row elements={['cell', 'table', 'row', { part: 'cell', style: { textAlign: 'left' } }]}>
            <div style={{ lineHeight: '150%' }}>
              <EditableElement
                element="span"
                label="Label for the Directive"
                onValueChange={(label) => setValue({ ...value, label })}
                value={value.label}
                style={styles.directiveLabelStyles}
              />
            </div>
          </Row>

          {/* Space Above Steps */}
          <Row elements={['cell']}>
            <div style={{ height: '15px', lineHeight: '15px', fontSize: '15px' }}>&nbsp;</div>
          </Row>

          <Row>
            <Cell align="left">
              <Table>
                {/* Step 1 */}
                <Row elements={['cell', 'table']}>
                  {/* Step 1 Circle Number and Label */}
                  <Row elements={['cell', 'table', 'row']}>
                    {/* Step 1 Circle Number */}
                    <Cell style={styles.circleNumberCell}>
                      <div className="circle-number" style={styles.circleNumbers}>
                        <Table
                          className="circle-number-table el-center"
                          align="center"
                          style={styles.circleNumberTableStyles}
                          elements={['row', 'cell']}
                        >
                          1
                        </Table>
                      </div>
                    </Cell>

                    {/* Step 1 Label */}
                    <Cell style={{ paddingLeft: '18px', paddingTop: '4px' }}>
                      <div style={{ lineHeight: '145%' }}>
                        <span style={styles.stepNumberLabel}>
                          <EditableElement
                            element="b"
                            label="Label for Step 1"
                            onValueChange={(step1Label) => setValue({ ...value, step1Label })}
                            value={value.step1Label}
                          />
                        </span>
                      </div>
                    </Cell>
                  </Row>

                  {/* Gap between circled number and bar */}
                  <Row elements={['cell']}>
                    <div style={styles.gap}>&nbsp;</div>
                  </Row>

                  {/* Step 1 Bar & Additional Information */}
                  <Row elements={['cell', 'table', 'row']}>
                    <Cell style={styles.emptyCellBeforeBar}>&nbsp;</Cell>
                    <Cell style={styles.additionalInfo} elements={['table']}>
                      <Row>
                        {value.showStep1AdditionalContent && (
                          <Cell style={{ lineHeight: '16px' }}>
                            <EditableElement
                              element="span"
                              label="Additional information for Step 1"
                              onValueChange={(step1Additional) =>
                                setValue({ ...value, step1Additional })
                              }
                              value={value.step1Additional}
                              style={styles.stepDescription}
                            />
                          </Cell>
                        )}
                      </Row>

                      {/* Button & Link */}
                      <Row elements={['cell', { part: 'table', align: 'left' }]}>
                        {/* Space Above Button */}
                        <Row elements={['cell']}>
                          <div style={styles.whiteSpace}>&nbsp;</div>
                        </Row>

                        {/* Button */}
                        <Row
                          elements={[
                            'cell',
                            { part: 'table', width: 'unset' },
                            'row',
                            { part: 'cell', style: styles.getStartedButton },
                          ]}
                        >
                          <Link to={value.linkHref}>
                            <EditableElement
                              element="span"
                              value={value.buttonLabel}
                              label="Directive Button"
                              onValueChange={(buttonLabel) => setValue({ ...value, buttonLabel })}
                              style={styles.getStartedButtonText}
                            />
                          </Link>
                        </Row>

                        {/* Space After Button */}
                        <Row elements={['cell']}>
                          <div style={styles.whiteSpace}>&nbsp;</div>
                        </Row>

                        {/* Same Link As Button */}
                        <Row
                          elements={[
                            { part: 'cell', style: styles.linkText, className: 'displayed-href' },
                          ]}
                        >
                          <Link to={value.linkHref}>
                            <EditableElement
                              element="span"
                              label="Directive Link"
                              value={value.linkHref}
                              onValueChange={(linkHref) => setValue({ ...value, linkHref })}
                            />
                          </Link>
                        </Row>
                      </Row>
                    </Cell>
                  </Row>

                  {/* Gap between circled number and bar */}
                  <Row elements={['cell']}>
                    <div style={{ lineHeight: 0, paddingTop: Spacing.size.tiny }}>&nbsp;</div>
                  </Row>
                </Row>

                {/* Step 2 */}
                <Row elements={['cell', 'table']}>
                  {/* Step 2 Circle Number and Label */}
                  <Row elements={['cell', 'table', 'row']}>
                    {/* Step 2 Circle Number */}
                    <Cell style={styles.circleNumberCell}>
                      <div className="circle-number" style={styles.circleNumbers}>
                        <Table
                          className="circle-number-table el-center"
                          align="center"
                          style={styles.circleNumberTableStyles}
                          elements={['row', 'cell']}
                        >
                          2
                        </Table>
                      </div>
                    </Cell>

                    {/* Step 2 Label */}
                    <Cell style={{ paddingLeft: '18px', paddingTop: '4px' }}>
                      <div style={{ lineHeight: '145%' }}>
                        <span style={styles.stepNumberLabel}>
                          <EditableElement
                            element="b"
                            label="Label for Step 2"
                            onValueChange={(step2Label) => setValue({ ...value, step2Label })}
                            value={value.step2Label}
                          />
                        </span>
                      </div>
                    </Cell>
                  </Row>

                  {/* Gap between circled number and bar */}
                  <Row elements={['cell']}>
                    <div style={styles.gap}>&nbsp;</div>
                  </Row>

                  {/* Step 2 Bar & Additional Information */}
                  <Row elements={['cell', 'table', 'row']}>
                    <Cell style={styles.emptyCellBeforeBar}>&nbsp;</Cell>

                    {/* Step 2 Additional Information */}
                    <Cell style={styles.additionalInfo}>
                      {value.showStep2AdditionalContent && (
                        <>
                          <div style={{ lineHeight: '16px' }}>
                            <EditableElement
                              element="span"
                              label="Additional information for Step 2"
                              onValueChange={(step2Additional) =>
                                setValue({ ...value, step2Additional })
                              }
                              value={value.step2Additional}
                              style={styles.stepDescription}
                            />
                          </div>
                          <div style={styles.whiteSpace}>&nbsp;</div>

                          {[DirectiveVariant.StepTwoExpansion].includes(value.variant) && (
                            <>
                              <EditableElement
                                element="div"
                                label="Tertiary information for Step 2"
                                onValueChange={(step2Tertiary) =>
                                  setValue({ ...value, step2Tertiary })
                                }
                                value={value.step2Tertiary}
                                style={styles.supportiveInformation}
                              />
                              <div style={styles.whiteSpace}>&nbsp;</div>

                              <EditableElement
                                element="div"
                                label="Case number information"
                                onValueChange={(step2CaseNumber) =>
                                  setValue({ ...value, step2CaseNumber })
                                }
                                value={value.step2CaseNumber}
                                style={styles.expansionCaseNumber}
                              />
                              <div style={styles.whiteSpace}>&nbsp;</div>
                            </>
                          )}
                        </>
                      )}
                    </Cell>
                  </Row>

                  {/* Gap between circled number and bar */}
                  <Row elements={['cell']}>
                    <div style={styles.gap}>&nbsp;</div>
                  </Row>
                </Row>

                {/* Step 3 */}
                <Row elements={['cell', 'table']}>
                  {/* Step 3 Circle Number and Label */}
                  <Row elements={['cell', 'table', 'row']}>
                    {/* Step 3 Circle Number */}
                    <Cell style={styles.circleNumberCell}>
                      <div className="circle-number" style={styles.circleNumbers}>
                        <Table
                          className="circle-number-table el-center"
                          align="center"
                          style={styles.circleNumberTableStyles}
                          elements={['row', 'cell']}
                        >
                          3
                        </Table>
                      </div>
                    </Cell>

                    {/* Step 3 Label */}
                    <Cell style={{ paddingLeft: '18px', paddingTop: '4px' }}>
                      <div style={{ lineHeight: '145%' }}>
                        <span style={styles.stepNumberLabel}>
                          <EditableElement
                            element="b"
                            label="Label for Step 3"
                            onValueChange={(step3Label) => setValue({ ...value, step3Label })}
                            value={value.step3Label}
                          />
                        </span>
                      </div>
                    </Cell>
                  </Row>

                  {/* Step 3 Additional Information */}
                  <Row elements={['cell', 'table', 'row']}>
                    <Cell style={styles.emptyCellBeforeBar}>&nbsp;</Cell>
                    {value.showStep3AdditionalContent && (
                      <Cell style={styles.step3AdditionalInfo}>
                        <div style={{ lineHeight: '16px' }}>
                          <EditableElement
                            element="span"
                            label="Additional information for Step 3"
                            onValueChange={(step3Additional) =>
                              setValue({ ...value, step3Additional })
                            }
                            value={value.step3Additional}
                            style={styles.stepDescription}
                          />
                        </div>
                        <div style={styles.whiteSpace}>&nbsp;</div>
                      </Cell>
                    )}
                  </Row>
                </Row>
              </Table>
            </Cell>
          </Row>
        </>
      )}
    </Row>
  )
}

const grayBar = '#dcdee0'

const styles = {
  outerCellStyles: {
    ...StyleDefaults.inline.colors,
    ...Text.body.main.regular,
  } as CSSProperties,
  directiveLabelStyles: {
    ...Text.body.main.regular,
    color: Colors.black,
    textAlign: 'left',
  } as CSSProperties,
  stepNumberLabel: {
    ...Text.header.h3.regular,
    color: Colors.black,
    textAlign: 'left',
    margin: 0,
  } as CSSProperties,
  circleNumberTableStyles: {
    ...Text.header.h3.bold,
    color: Colors.black,
    lineHeight: '26px',
    marginTop: '5px',
  } as CSSProperties,
  circleNumberCell: {
    width: '38px',
  } as CSSProperties,
  circleNumbers: {
    borderWidth: '4px',
    borderStyle: 'solid',
    borderColor: Colors.black,
    borderRadius: '50%',
    textAlign: 'center',
    width: '38px',
    height: '38px',
    margin: 0,
  } as CSSProperties,
  stepDescription: {
    ...Text.body.main.regular,
    color: Colors.black,
    textAlign: 'left',
  } as CSSProperties,
  prePostInfo: {
    paddingTop: Spacing.size.tiny,
  } as CSSProperties,
  gap: {
    lineHeight: 0,
    paddingTop: Spacing.size.tiny,
  } as CSSProperties,
  emptyCellBeforeBar: {
    minHeight: Spacing.size.small,
    paddingLeft: Spacing.size.medium,
  } as CSSProperties,
  additionalInfo: {
    paddingLeft: '38px',
    paddingTop: '5px',
    width: '100%',
    borderLeft: Borders.large(grayBar),
  } as CSSProperties,
  getStartedButton: {
    backgroundColor: Colors.black,
    borderRadius: 10,
    paddingTop: Spacing.size.medium,
    paddingBottom: Spacing.size.medium,
    paddingLeft: 65,
    paddingRight: 65,
    textAlign: 'center',
  } as CSSProperties,
  getStartedButtonText: {
    color: Colors.white,
    fontWeight: Font.weight.bold,
  } as CSSProperties,
  linkText: {
    ...Text.caption.small.regular,
    color: Colors.gray,
    display: 'block',
    paddingBottom: Spacing.size.medium,
    textDecoration: 'underline',
    maxWidth: DISPLAYED_HREF_MAX_WIDTH,
    overflowWrap: 'break-word',
    wordBreak: 'break-all',
  } as CSSProperties,
  step3AdditionalInfo: {
    paddingLeft: '46px',
    paddingTop: '5px',
    width: '100%',
  } as CSSProperties,
  payOnlineBox: {
    border: Borders.medium(Colors.alert.warning.light),
    borderRadius: '10px',
    padding: '30px 40px',
  } as CSSProperties,
  supportiveInformation: {
    ...StyleDefaults.inline.colors,
    ...Text.body.tertiary.italic,
    color: Colors.grayDark,
  } as CSSProperties,
  alternativePayment: {
    ...Text.body.secondary.bold,
  } as CSSProperties,
  expansionCaseNumber: {
    ...Text.body.secondary.regular,
  } as CSSProperties,
  whiteSpace: {
    height: '10px',
    lineHeight: '10px',
    fontSize: '10px',
  } as CSSProperties,
}
