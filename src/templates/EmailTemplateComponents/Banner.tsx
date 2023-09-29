import React, { FC } from 'react'
import { EmailComponentProps } from './shared'
import { Colors, Font, Spacing } from '../styles'

export const Banner: FC<EmailComponentProps> = ({ children }) => {
  return (
    <tr id="header-row">
      <td>
        <table
          width="100%"
          align="center"
          className="el-center"
          cellSpacing="0"
          cellPadding="0"
          border={0}
        >
          <tr>
            <td style={{
              backgroundColor: Colors.black,
              color: Colors.white,
              width: '100vw !important',
              padding: Spacing.layout.paddingHorizontal.paddingLeft,
            }}>
              <table cellSpacing={0} cellPadding="0" border={0} width="100%">
                <tr>
                  <td style={{
                    width: '100%',
                    paddingLeft: '0',
                    textAlign: 'left',
                  }}>
                    <div style={{
                      height: Font.size.small,
                      lineHeight: Font.size.small,
                      fontSize: Font.size.small,
                      display: 'none'
                    }}>
                      &nbsp;
                    </div>

                    <table cellSpacing="0" cellPadding="0" border={0} width="100%">
                      <tr>
                        <td style={{
                          textAlign: 'left',
                        }}>
                          <div style={{lineHeight: '127%'}}>
                            <a target="_blank" rel="noopener noreferrer" href="https://www.nj.gov/labor/" style={{
                              color: Colors.white,
                              lineHeight: '100%',
                              fontFamily: Font.family.default,
                              fontSize: Font.size.small,
                              textAlign: 'left',
                              fontWeight: Font.weight.bold,
                              textDecoration: 'underline',
                              whiteSpace: 'nowrap'
                            }}>
                              New Jersey Department of Labor and Workforce Development
                            </a>
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td style={{
                    width: '100%',
                    paddingLeft: '0px',
                    textAlign: 'left',
                  }}>
                    <div style={{
                      height: Font.size.tiny,
                      lineHeight: Font.size.tiny,
                      fontSize: Font.size.tiny,
                      display: 'none'
                    }}>
                      &nbsp;
                    </div>
                    <table cellSpacing="0" cellPadding="0" border={0} width="100%">
                      <tr>
                        <td style={{
                          textAlign: 'right',
                          paddingLeft: '0',
                        }}>
                          <div style={{lineHeight: '150%'}}>
                            <a target="_blank" rel="noopener noreferrer" href="https://myunemployment.nj.gov"
                              style={{
                                  color: Colors.white,
                                  lineHeight: "150%",
                                  fontFamily: Font.family.default,
                                  fontSize: Font.size.small,
                                  textAlign: "right",
                                  textDecoration: "underline"
                                }}>myunemployment.nj.gov</a>
                          </div>
                        </td>
                      </tr>
                    </table>
                    <div style={{
                      maxWidth: '120px',
                      height: Font.size.tiny,
                      lineHeight: Font.size.tiny,
                      fontSize: Font.size.tiny,
                      display: 'none'
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
  )
}