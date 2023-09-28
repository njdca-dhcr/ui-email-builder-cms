import React, { FC, CSSProperties } from 'react'
import { EmailComponentProps } from './shared'

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
            <td className="dk-gray" style={styles}>
              <table cellSpacing={0} cellPadding="0" border={0} width="100%">
                <tr>
                  <td>
                    <div
                      style={{
                        height: '12px',
                        lineHeight: '12px',
                        fontSize: '12px',
                      }}
                    >
                      &nbsp;
                    </div>

                    <table cellSpacing="0" cellPadding="0" border={0} width="100%">
                      <tr>
                        <td style={{ paddingLeft: '20px', textAlign: 'left' }}>
                          <div style={{ lineHeight: '127%' }}>
                            <a
                              target="_blank"
                              rel="noopener noreferrer"
                              href="https://www.nj.gov/labor/"
                              style={{
                                color: '#ffffff !important',
                                lineHeight: '127%',
                                fontFamily: 'Public Sans, Helvetica, Arial, sans-serif',
                                fontSize: '12px',
                                textAlign: 'left',
                                fontWeight: 700,
                                textDecoration: 'underline',
                                whiteSpace: 'nowrap',
                              }}
                            >
                              New Jersey Department of Labor and Workforce Development
                            </a>
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td style={{ paddingTop: '15px' }}>
                    <div
                      style={{
                        height: '10px',
                        lineHeight: '10px',
                        fontSize: '10px',
                      }}
                    >
                      &nbsp;
                    </div>

                    <table cellSpacing="0" cellPadding="0" border={0} width="100%">
                      <tr>
                        <td
                          style={{
                            paddingRight: '20px',
                            textAlign: 'right',
                          }}
                        >
                          <div style={{ lineHeight: '150%' }}>
                            <a
                              target="_blank"
                              rel="noopener noreferrer"
                              href="https://myunemployment.nj.gov"
                              style={{
                                color: '#ffffff !important',
                                lineHeight: '150%',
                                fontFamily: 'Public Sans, Helvetica, Arial, sans-serif',
                                fontSize: '12px',
                                textAlign: 'right',
                                textDecoration: 'underline',
                              }}
                            >
                              myunemployment.nj.gov
                            </a>
                          </div>
                        </td>
                      </tr>
                    </table>
                    <div
                      style={{
                        maxWidth: '120px',
                        height: '10px',
                        lineHeight: '10px',
                        fontSize: '10px',
                      }}
                    >
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

const styles: CSSProperties = {
  backgroundColor: '#1b1b1b',
  color: '#ffffff',
}
