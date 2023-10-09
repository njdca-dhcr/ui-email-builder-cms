import React, { CSSProperties, FC } from 'react'
import { EmailSubComponentProps } from './shared'
import { EditableElement } from 'src/ui/EditableElement'
import { useIsCurrentlyActiveEmailSubComponent } from '../CurrentlyActiveEmailPart'
import { useEmailPartsContentForSubComponent } from '../EmailPartsContent'
import { Colors, DefaultStyles, Font, Spacing } from '../styles'

const defaultValue = {
  title: 'Received & Under Review',
  description:
    'It may take up to 2 weeks to determine if payment can be processed for the week(s) in question',
}

export const Directive: FC<EmailSubComponentProps> = ({ componentId, id }) => {
  const { activate } = useIsCurrentlyActiveEmailSubComponent(componentId, id)
  
  const [value, setValue, { initialValue }] = useEmailPartsContentForSubComponent(
    componentId,
    id,
    defaultValue,
  )
  return (<>
    <tr>
      <td className="section-wrapper">
        <table width="100%" align="center" className="el-center" cellSpacing="0" cellPadding="0"
          border={0}>
          <tr>
            <td>
              <table cellSpacing="0" cellPadding="0" border={0} width="100%">
                
                {/* Directive Title */}
                <tr>
                  <td>
                    <table cellSpacing="0" cellPadding="0" border={0} width="100%">
                      <tr>
                        <td style={{textAlign: 'left'}}>
                          <div style={{lineHeight: '150%'}}>
                            <span style={directiveLabelStyles}>
                              To help resolve this issue, complete the following steps:
                            </span>
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                {/* Space Above Steps */}
                <tr>
                  <td>
                    <div style={{
                          height: '15px',
                          lineHeight: '15px',
                          fontSize: '15px'
                    }}>
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
                                  <table className="circle-number-table el-center" width="100%" align="center"
                                    cellSpacing="0" cellPadding="0" border={0}
                                    style={circleNumberTableStyles}>
                                    <tr>
                                      <td>
                                        1
                                      </td>
                                    </tr>
                                  </table>
                                </div>
                              </td>


                              <td style={{
                                    paddingLeft: '18px',
                                    paddingTop: '4px'
                              }}>
                                <div style={{
                                      lineHeight: '145%'
                                }}>
                                  <span style={stepNumberLabel}><b>Step 1 Label</b>
                                  </span>
                                </div>
                              </td>
                            </tr>

                            {/* Step 1 Description */}
                            <tr>
                              <td align="center">
                                <div id="step-bar-1-2" className="step-bar"></div>
                              </td>
                              <td style={{paddingLeft: '18px', paddingTop: '5px'}}>
                                <div style={{
                                      lineHeight: '16px'
                                }}>
                                  <span style={stepDescriptionStyles}>
                                    Step 1 Description
                                  </span>
                                </div>

                                {/* Button Table */ }
                                <table align="left" cellSpacing="0" cellPadding="0" border={0}
                                  width="100%">
                                  {/* Space Above Button */ }
                                  <tr>
                                    <td>
                                      <div style={{
                                            height: '10px',
                                            lineHeight: '10px',
                                            fontSize: '10px'
                                      }}>
                                        &nbsp;
                                      </div>
                                    </td>
                                  </tr>

                                  {/* Button */}
                                  <tr>
                                    <td>
                                      <table cellSpacing="0" cellPadding="0" border={0}
                                        width="100%">
                                        <tr>
                                          <td>
                                            <a className="get-started-btn" rel="noopener"
                                              target="_blank"
                                              href="{!eadj_UI_Case__c.eadj_Custom_Link__c}">
                                              <div>
                                                <div style={{
                                                  height: '10px',
                                                  lineHeight: '10px',
                                                  fontSize: '10px'
                                                }}>
                                                  {/* <!--[if mso]>
                                                    <i style={{letterSpacing: 161px; mso-font-width: -100%;">&nbsp;</i>
                                                  <![endif]--> */}
                                                  &nbsp;
                                                </div>
                                                {/* <!--[if mso]>
                                                  <i style={{letterSpacing: 43px; mso-font-width: -100%;">&nbsp;</i>
                                                <![endif]--> */}
                                                <span>
                                                  Get Started
                                                </span>
                                                {/* <!--[if mso]>
                                                  <i style={{letterSpacing: 40px; mso-font-width: -100%;">&nbsp;</i>
                                                <![endif]--> */}
                                                <div style={{
                                                  height: '10px',
                                                  lineHeight: '10px',
                                                  fontSize: '10px'
                                                }}>
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
                                      <div style={{
                                            height: '10px',
                                            lineHeight: '10px',
                                            fontSize: '10px'
                                      }}>
                                        &nbsp;
                                      </div>
                                    </td>
                                  </tr>

                                  {/* Same Link As Button */}
                                  <tr>
                                    <td>
                                      <div className="link-div" style={{
                                            lineHeight: '150%',
                                            wordBreak: 'break-all',
                                            paddingBottom: '16px'
                                      }}>
                                        <a target="_blank" rel="noopener noreferrer"
                                          href="https://google.com" style={{
                                              color: '#3d4551',
                                              lineHeight: '150%',
                                              fontFamily: 'Public Sans, Helvetica, Arial, sans-serif',
                                              fontSize: '12px',
                                              textDecoration: 'underline',
                                              textAlign: 'left',
                                    }}>
                                          https://google.com
                                        </a>
                                      </div>
                                    </td>
                                  </tr>
                                </table>

                              </td>
                            </tr>

                            { /* Step 2 */}
                            <tr>
                              <td>
                                <div className="circle-number" style={circleNumberStyles}>
                                  <table className="circle-number-table el-center" width="100%" align="center"
                                   cellSpacing="0" cellPadding="0" border={0}
                                    style={circleNumberTableStyles}>
                                    <tr>
                                      <td>
                                        2
                                      </td>
                                    </tr>
                                  </table>
                                </div>
                              </td>
                              <td style={{paddingLeft: '18px', paddingTop: '5px'}}>
                                <div style={{
                                      lineHeight: '145%',
                                      paddingTop: '2px'
                                }}>
                                  <span style={stepNumberLabel}><b>Step 2</b>
                                  </span>
                                </div>
                              </td>
                            </tr>

                            { /* Step 2 Description */}
                            <tr>
                              <td align="center">
                                <div className="step-bar" id="step-bar-2-3"></div>
                              </td>
                              <td style={{paddingLeft: '18px', paddingTop: '5px'}}>
                                <div style={{
                                      lineHeight: '16px'
                                }}>
                                  <span style={stepDescriptionStyles}>
                                    Step 2 description
                                  </span>
                                </div>
                                <div style={{
                                  height: '10px',
                                  lineHeight: '10px',
                                  fontSize: '10px'
                                }}>
                                  &nbsp;
                                </div>
                              </td>
                            </tr>

                            {/* Step 3 */}
                            <tr>
                              <td>
                                <div className="circle-number" style={circleNumberStyles}>
                                  <table className="circle-number-table el-center" width="100%" align="center"
                                    cellSpacing="0" cellPadding="0" border={0}
                                    style={circleNumberTableStyles}>
                                    <tr>
                                      <td>
                                        3
                                      </td>
                                    </tr>
                                  </table>
                                </div>
                              </td>
                              <td style={{
                                    paddingLeft: '18px',
                                    paddingTop: '4px'
                              }}>
                                <div style={{
                                      lineHeight: '175%'
                                }}>
                                  <span style={stepNumberLabel}><b>Step 3</b>
                                  </span>
                                </div>
                              </td>
                            </tr>

                            {/* Step 3 Description */}
                            <tr>
                              <td align="center">
                                <div className="step-bar" id="step-bar-2-3"></div>
                              </td>
                              <td style={{paddingLeft: '18px', paddingTop: '5px'}}>
                                <div style={{
                                      lineHeight: '16px'
                                }}>
                                  <span style={stepDescriptionStyles}>
                                    Step 3 description
                                  </span>
                                </div>
                                <div style={{
                                  height: '10px',
                                  lineHeight: '10px',
                                  fontSize: '10px'
                                }}>
                                  &nbsp;
                                </div>
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
    {children}
  </>)
}

const directiveLabelStyles: CSSProperties = {
  color: '#1b1b1b',
  lineHeight: '150%',
  fontFamily: 'Public Sans, Helvetica, Arial, sans-serif',
  fontSize: '16px',
  textAlign: 'left'
}

const circleNumberStyles: CSSProperties = {
  borderWidth: '4px',
  borderStyle: 'solid',
  borderColor: '#1b1b1b',
  borderRadius: '50%',
  textAlign: 'center',
  width: '38px',
  height: '38px',
  margin: 'auto'
}

const circleNumberTableStyles: CSSProperties = {
  fontFamily: 'Public Sans, Helvetica, Arial, sans-serif',
  fontWeight: 700,
  fontSize: '22px',
  color: '#1b1b1b',
  lineHeight: '26px',
  marginTop: '5px'
}

const stepNumberLabel: CSSProperties = {
  color: '#1b1b1b',
  lineHeight: '145%',
  fontFamily: 'Public Sans, Helvetica, Arial, sans-serif',
  fontSize: '22px',
  textAlign: 'left'
}

const stepDescriptionStyles: CSSProperties = {
  color: '#1b1b1b',
  lineHeight: '150%',
  fontFamily: 'Public Sans, Helvetica, Arial, sans-serif',
  fontSize: '16px',
  textAlign: 'left',
}