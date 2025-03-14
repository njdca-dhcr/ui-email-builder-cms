import React, { CSSProperties, FC, ReactNode } from 'react'
import { CompleteEmailCSS } from './EmailCSS'
import { Colors } from '../styles'

interface HtmlProps {
  children: ReactNode
  lang: string
  xmlns: string
  'xmlns:v': string
  'xmlns:o': string
}

const Html: FC<HtmlProps> = ({ children, ...props }) => {
  return <html {...props}>{children}</html>
}

interface EmailLayoutHtmlStringProps {
  html: string
  title: string
}

interface EmailLayoutChildrenProps {
  children: ReactNode
  title: string
}

type EmailLayoutProps = EmailLayoutHtmlStringProps | EmailLayoutChildrenProps

export const EmailLayout: FC<EmailLayoutProps> = ({ title, ...props }) => {
  if ('children' in props) {
    return (
      <HtmlLayout title={title}>
        <div style={styles.container}>{props.children}</div>
      </HtmlLayout>
    )
  } else {
    return (
      <HtmlLayout title={title}>
        <div style={styles.container} dangerouslySetInnerHTML={{ __html: props.html }} />
      </HtmlLayout>
    )
  }
}

const HtmlLayout: FC<{ children: ReactNode; title: string }> = ({ children, title }) => {
  return (
    <Html
      {...{
        lang: 'en',
        xmlns: 'http://www.w3.org/1999/xhtml',
        'xmlns:v': 'urn:schemas-microsoft-com:vml',
        'xmlns:o': 'urn:schemas-microsoft-com:office:office',
      }}
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="format-detection" content="telephone=no,address=no,email=no,date=no,url=no" />
        <meta name="color-scheme" content="light" />
        <meta name="supported-color-schemes" content="light" />
        <title>{title}</title>
        <link
          href="https://fonts.googleapis.com/css?family=Public%20Sans:700&display=swap&subset=cyrillic"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Public%20Sans:600&display=swap&subset=cyrillic"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Public%20Sans:400&display=swap&subset=cyrillic"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Public%20Sans:400i&display=swap&subset=cyrillic"
          rel="stylesheet"
        />
        <link href="https://fonts.googleapis.com/css?family=EB+Garamond:400" rel="stylesheet" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@500&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@1,700&display=swap"
          rel="stylesheet"
        />
        <CompleteEmailCSS />
      </head>
      <body style={styles.body} {...{ width: '100%' }}>
        {children}
      </body>
    </Html>
  )
}

// Styles in the emails must remain inline
const styles = {
  body: {
    background: Colors.grayLight,
    margin: 0,
    padding: '0 !important',
    msoLineHeightRule: 'exactly',
    letterSpacing: '-0.0125em',
  } as CSSProperties,
  container: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 'fit-content',
  } as CSSProperties,
}
