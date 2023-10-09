import React, { CSSProperties, FC } from 'react'
import { EmailSubComponentProps } from './shared'
import { EditableElement } from 'src/ui/EditableElement'
import { useIsCurrentlyActiveEmailSubComponent } from '../CurrentlyActiveEmailPart'
import { useEmailPartsContentForSubComponent } from '../EmailPartsContent'
import { Colors, DefaultStyles, Font, Spacing } from '../styles'

export const enum DirectiveVariant {
  OneStep,
  ThreeStep,
  StepTwoExpansion,
  CostBreakdown,
  PayOnline,
}

export interface DirectiveValue {
  variant: DirectiveVariant

  // Always Used
  title: string
  linkHref: string
  buttonLabel: string

  // OneStep
  step1Label: string
  step1Additional: string
  oneStepSupportiveText: string

  // ThreeStep uses OneStep values
  step2Label: string
  step2Additional: string
  step3Label: string
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
  linkHref: 'https://',
  buttonLabel: 'Get Started',
  step1Label: 'Step 1 Directive',
  step1Additional: 'Additional information around Step 1',
  oneStepSupportiveText:
    'Supportive information around how the status above was informed and how a claimant will receive more detailed information and/or a determination.',
  step2Label: 'Step 2 Directive',
  step2Additional: 'Additional information around Step 2',
  step2Tertiary:
    'Tertiary information around Step 2, (usually involving an alternate way to complete the second step).',
  step2CaseNumber: 'Case #: [000000]',
  step3Label: 'Step 3 Directive',
  step3Additional: 'Additional information around Step 3',
  alternativePaymentLabel:
    'Or, send a check here: <br>Bureau of Benefit Payment Control<br>c/o Refund Processing Station<br>P.O. Box 951<br>Trenton, NJ 08625-0951',
  payOnlineSupportiveText:
    'May the check or money order payable to NJ Dept. of Labor and Workforce Development. Be sure to write your name and social security number on the payment.',
}

export const Directive: FC<EmailSubComponentProps> = ({ componentId, id }) => {
  const { activate } = useIsCurrentlyActiveEmailSubComponent(componentId, id)

  const [value, setValue, { initialValue }] = useEmailPartsContentForSubComponent(
    componentId,
    id,
    defaultValue,
  )
  return (
    <>
      <tr>
        <td className="section-wrapper">
          <table
            width="100%"
            align="center"
            className="el-center"
            cellSpacing="0"
            cellPadding="0"
            border={0}
          >
            <tr>
              <td>
                <table cellSpacing="0" cellPadding="0" border={0} width="100%">
                  {/* Directive Title */}
                  <tr>
                    <td>
                      <table cellSpacing="0" cellPadding="0" border={0} width="100%">
                        <tr>
                          <td style={{ textAlign: 'left' }}>
                            <div style={{ lineHeight: '150%' }}>
                              <EditableElement
                                element="span"
                                initialValue={initialValue.title}
                                label="Title for the Directive"
                                onValueChange={(title) => setValue({ ...value, title })}
                                value={value.title}
                                style={directiveLabelStyles}
                              />
                            </div>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  {/* Space Above Steps */}
                  <tr>
                    <td>
                      <div style={{ height: '15px', lineHeight: '15px', fontSize: '15px' }}>
                        &nbsp;
                      </div>
                    </td>
                  </tr>

                  {/* Steps */}
                  <tr>
                    <td>
                      <table width="100%" align="center" cellSpacing="0" cellPadding="0" border={0}>
                        <tr>
                          <td>
                            <table cellSpacing="0" cellPadding="0" border={0} width="100%">
                              {/* Step 1 */}
                              <tr>
                                <td>
                                  <div className="circle-number" style={circleNumberStyles}>
                                    <table
                                      className="circle-number-table el-center"
                                      width="100%"
                                      align="center"
                                      cellSpacing="0"
                                      cellPadding="0"
                                      border={0}
                                      style={circleNumberTableStyles}
                                    >
                                      <tr>
                                        <td>1</td>
                                      </tr>
                                    </table>
                                  </div>
                                </td>

                                <td style={{ paddingLeft: '18px', paddingTop: '4px' }}>
                                  <div style={{ lineHeight: '145%' }}>
                                    <span style={stepNumberLabel}>
                                      <EditableElement
                                        element="b"
                                        initialValue={initialValue.step1Label}
                                        label="Label for Step 1"
                                        onValueChange={(step1Label) =>
                                          setValue({ ...value, step1Label })
                                        }
                                        value={value.step1Label}
                                      />
                                    </span>
                                  </div>
                                </td>
                              </tr>

                              {/* Step 1 Additional Information */}
                              <tr>
                                <td align="center">
                                  <div
                                    id="step-bar-1-2"
                                    className="step-bar"
                                    style={stepBar12Styles}
                                  ></div>
                                </td>
                                <td style={tdPaddingStyles}>
                                  <div style={{ lineHeight: '16px' }}>
                                    <EditableElement
                                      element="span"
                                      initialValue={initialValue.step1Additional}
                                      label="Additional information for Step 1"
                                      onValueChange={(step1Additional) =>
                                        setValue({ ...value, step1Additional })
                                      }
                                      value={value.step1Additional}
                                      style={stepDescriptionStyles}
                                    />
                                  </div>

                                  {/* Button Table */}
                                  <table
                                    align="left"
                                    cellSpacing="0"
                                    cellPadding="0"
                                    border={0}
                                    width="100%"
                                  >
                                    {/* Space Above Button */}
                                    <tr>
                                      <td>
                                        <div style={spaceStyles}>&nbsp;</div>
                                      </td>
                                    </tr>

                                    {/* Button */}
                                    <tr>
                                      <td>
                                        <table
                                          cellSpacing="0"
                                          cellPadding="0"
                                          border={0}
                                          width="100%"
                                        >
                                          <tr>
                                            <td>
                                              <a
                                                className="get-started-btn"
                                                rel="noopener"
                                                target="_blank"
                                                href={value.linkHref}
                                                style={getStartedButtonStyles}
                                              >
                                                <div>
                                                  <div style={spaceStyles}>
                                                    {/* <!--[if mso]>
                                                    <i style={{letterSpacing: 161px; mso-font-width: -100%;">&nbsp;</i>
                                                  <![endif]--> */}
                                                    &nbsp;
                                                  </div>
                                                  {/* <!--[if mso]>
                                                  <i style={{letterSpacing: 43px; mso-font-width: -100%;">&nbsp;</i>
                                                <![endif]--> */}
                                                  <span>{value.buttonLabel}</span>
                                                  {/* <!--[if mso]>
                                                  <i style={{letterSpacing: 40px; mso-font-width: -100%;">&nbsp;</i>
                                                <![endif]--> */}
                                                  <div style={spaceStyles}>
                                                    {/* <!--[if mso]>
                                                    <i style={{letterSpacing: 161px; mso-font-width: -100%;">&nbsp;</i>
                                                  <![endif]--> */}
                                                    &nbsp;
                                                  </div>
                                                </div>
                                              </a>
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>

                                    {/* Space After Button */}
                                    <tr>
                                      <td>
                                        <div style={spaceStyles}>&nbsp;</div>
                                      </td>
                                    </tr>

                                    {/* Same Link As Button */}
                                    <tr>
                                      <td>
                                        <div
                                          className="link-div"
                                          style={{
                                            lineHeight: '150%',
                                            wordBreak: 'break-all',
                                            paddingBottom: '16px',
                                          }}
                                        >
                                          <a
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            href={value.linkHref}
                                            style={hrefTextStyles}
                                          >
                                            {value.linkHref}
                                          </a>
                                        </div>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>

                              {/* Step 2 */}
                              <tr>
                                <td>
                                  <div className="circle-number" style={circleNumberStyles}>
                                    <table
                                      className="circle-number-table el-center"
                                      width="100%"
                                      align="center"
                                      cellSpacing="0"
                                      cellPadding="0"
                                      border={0}
                                      style={circleNumberTableStyles}
                                    >
                                      <tr>
                                        <td>2</td>
                                      </tr>
                                    </table>
                                  </div>
                                </td>
                                <td style={tdPaddingStyles}>
                                  <div style={{ lineHeight: '145%', paddingTop: '2px' }}>
                                    <span style={stepNumberLabel}>
                                      <EditableElement
                                        element="b"
                                        initialValue={initialValue.step2Label}
                                        label="Label for Step 2"
                                        onValueChange={(step2Label) =>
                                          setValue({ ...value, step2Label })
                                        }
                                        value={value.step2Label}
                                      />
                                    </span>
                                  </div>
                                </td>
                              </tr>

                              {/* Step 2 Additional Information */}
                              <tr>
                                <td align="center">
                                  <div
                                    className="step-bar"
                                    id="step-bar-2-3"
                                    style={stepBar23Styles}
                                  ></div>
                                </td>
                                <td style={tdPaddingStyles}>
                                  <div style={{ lineHeight: '16px' }}>
                                    <EditableElement
                                      element="span"
                                      initialValue={initialValue.step2Additional}
                                      label="Additional information for Step 2"
                                      onValueChange={(step2Additional) =>
                                        setValue({ ...value, step2Additional })
                                      }
                                      value={value.step2Additional}
                                      style={stepDescriptionStyles}
                                    />
                                  </div>
                                  <div style={spaceStyles}>&nbsp;</div>
                                </td>
                              </tr>

                              {/* Step 3 */}
                              <tr>
                                {/* Step 3 Circle Number */}
                                <td>
                                  <div className="circle-number" style={circleNumberStyles}>
                                    <table
                                      className="circle-number-table el-center"
                                      width="100%"
                                      align="center"
                                      cellSpacing="0"
                                      cellPadding="0"
                                      border={0}
                                      style={circleNumberTableStyles}
                                    >
                                      <tr>
                                        <td>3</td>
                                      </tr>
                                    </table>
                                  </div>
                                </td>

                                {/* Step 3 Label */}
                                <td style={tdPaddingStyles}>
                                  <div style={{ lineHeight: '175%' }}>
                                    <span style={stepNumberLabel}>
                                      <EditableElement
                                        element="b"
                                        initialValue={initialValue.step3Label}
                                        label="Label for Step 3"
                                        onValueChange={(step3Label) =>
                                          setValue({ ...value, step3Label })
                                        }
                                        value={value.step3Label}
                                      />
                                    </span>
                                  </div>
                                </td>
                              </tr>

                              {/* Step 3 Additional Information */}
                              <tr>
                                <td align="center">
                                  <div
                                    className="step-bar"
                                    id="step-bar-2-3"
                                    style={stepBar23Styles}
                                  ></div>
                                </td>
                                <td style={tdPaddingStyles}>
                                  <div style={{ lineHeight: '16px' }}>
                                    <EditableElement
                                      element="span"
                                      initialValue={initialValue.step3Additional}
                                      label="Additional information for Step 3"
                                      onValueChange={(step3Additional) =>
                                        setValue({ ...value, step3Additional })
                                      }
                                      value={value.step3Additional}
                                      style={stepDescriptionStyles}
                                    />
                                  </div>
                                  <div style={spaceStyles}>&nbsp;</div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </>
  )
}

const directiveLabelStyles: CSSProperties = {
  color: '#1b1b1b',
  lineHeight: '150%',
  fontFamily: 'Public Sans, Helvetica, Arial, sans-serif',
  fontSize: '16px',
  textAlign: 'left',
}

const circleNumberStyles: CSSProperties = {
  borderWidth: '4px',
  borderStyle: 'solid',
  borderColor: '#1b1b1b',
  borderRadius: '50%',
  textAlign: 'center',
  width: '38px',
  height: '38px',
  margin: 'auto',
}

const circleNumberTableStyles: CSSProperties = {
  fontFamily: 'Public Sans, Helvetica, Arial, sans-serif',
  fontWeight: 700,
  fontSize: '22px',
  color: '#1b1b1b',
  lineHeight: '26px',
  marginTop: '5px',
}

const stepNumberLabel: CSSProperties = {
  color: '#1b1b1b',
  lineHeight: '145%',
  fontFamily: 'Public Sans, Helvetica, Arial, sans-serif',
  fontSize: '22px',
  textAlign: 'left',
}

const stepDescriptionStyles: CSSProperties = {
  color: '#1b1b1b',
  lineHeight: '150%',
  fontFamily: 'Public Sans, Helvetica, Arial, sans-serif',
  fontSize: '16px',
  textAlign: 'left',
}

const hrefTextStyles: CSSProperties = {
  color: '#3d4551',
  lineHeight: '150%',
  fontFamily: 'Public Sans, Helvetica, Arial, sans-serif',
  fontSize: '12px',
  textDecoration: 'underline',
  textAlign: 'left',
}

const spaceStyles: CSSProperties = {
  height: '10px',
  lineHeight: '10px',
  fontSize: '10px',
}

const tdPaddingStyles: CSSProperties = {
  paddingLeft: '18px',
  paddingTop: '5px',
}

const stepBar12Styles: CSSProperties = {
  width: '8px',
  height: '180px',
  background: '#dcdee0',
  marginTop: '4px',
  marginBottom: '4px',
}

const stepBar23Styles: CSSProperties = {
  width: '8px',
  height: '50px',
  background: '#dcdee0',
  marginTop: '4px',
  marginBottom: '4px',
}

const getStartedButtonStyles: CSSProperties = {
  backgroundColor: '#1b1b1b',
  fontSize: '16px',
  fontFamily: 'Public Sans, Helvetica, Arial, sans-serif',
  fontWeight: 700,
  textDecoration: 'none',
  color: '#ffffff',
  borderRadius: '10px',
  display: 'inline-block',
  width: '220px',
  textAlign: 'center',
  padding: '5px 0px'
}