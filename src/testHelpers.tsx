import React, { FC, ReactElement, ReactNode } from 'react'
import { faker } from '@faker-js/faker'
import {
  CurrentlyActiveEmailPart,
  useCurrentlyActiveEmailPartData,
} from './templates/CurrentlyActiveEmailPart'
import { EmailPartsContent, useEmailPartsContentData } from './templates/EmailPartsContent'
import { render } from '@testing-library/react'
import { AppMode } from './utils/appMode'
import Config from '../gatsby-config'
import { AUTH_LOCAL_STORAGE_KEY, AuthInfo } from './utils/AuthContext'

export * from './factories'

export const urlFor = (path: string): string => `http://localhost${path}`

export type WrapperComponent = FC<{ children: ReactNode; additional?: ReactNode }>

export const emailPartWrapper: WrapperComponent = ({ additional, children }) => {
  return (
    <CurrentlyActiveEmailPart>
      <EmailPartsContent>
        {additional}
        <table>
          <tbody>{children}</tbody>
        </table>
        <ShowActiveEmailPart />
        <ShowEmailPartsContentKeys />
      </EmailPartsContent>
    </CurrentlyActiveEmailPart>
  )
}

export const renderEmailPart = (ui: ReactElement, additional?: ReactElement) => {
  const Component = emailPartWrapper
  return render(<Component additional={additional}>{ui}</Component>)
}

export const ShowActiveEmailPart: FC = () => {
  const [currentlyActive] = useCurrentlyActiveEmailPartData()
  return <span id="active-email-part-key">{currentlyActive}</span>
}

export const ShowEmailPartsContentKeys: FC = () => {
  const [data] = useEmailPartsContentData()
  const keys = Object.keys(data)
  return (
    <ul id="email-parts-content-keys">
      {keys.map((key) => (
        <li key={key} data-testid={key}>
          {key}
        </li>
      ))}
    </ul>
  )
}

export const expectActiveEmailPartToNotBe = (key: string, element: HTMLElement) => {
  expect(element.querySelector('#active-email-part-key')).not.toHaveTextContent(key)
}

export const expectActiveEmailPartToBe = (key: string, element: HTMLElement) => {
  expect(element.querySelector('#active-email-part-key')).toHaveTextContent(key)
}

export const expectEmailPartContentFor = (key: string, element: HTMLElement) => {
  const ul = element.querySelector('#email-parts-content-keys')
  expect(ul).not.toBeNull()
  const li = ul!.querySelector(`[data-testid="${key}"]`)
  expect(li).not.toBeNull()
}

export const asMock = <T extends (...args: any) => any>(func: T): jest.Mock<ReturnType<T>> => {
  return func as any
}

export const mockDataTransfer = ({
  plain,
  html,
}: {
  plain?: string
  html?: string
}): DataTransfer => {
  const data: { 'text/plain'?: string; 'text/html'?: string } = {
    'text/html': html,
    'text/plain': plain,
  }

  return {
    dropEffect: 'none',
    setData: (kind: 'text/html' | 'text/plain', value: string) => (data[kind] = value),
    getData: (kind: 'text/html' | 'text/plain') => data[kind] ?? '',
    effectAllowed: 'all',
    files: [] as any,
    types: [...(plain ? ['text/plain'] : []), ...(html ? ['text/html'] : [])],
    items: [] as any,
    clearData: () => null,
    setDragImage: () => null,
  }
}

export const mockAppMode = (appMode: AppMode | undefined) => {
  Config.siteMetadata = { ...Config.siteMetadata, appMode }
}

export const mockBackendUrl = (backendUrl: string | undefined) => {
  Config.siteMetadata = { ...Config.siteMetadata, backendUrl }
}

export const mockCognitoSigninUrl = (cognitoSigninUrl: string | undefined) => {
  Config.siteMetadata = { ...Config.siteMetadata, cognitoSigninUrl }
}

export const mockCognitoForgotPasswordUrl = (cognitoForgotPasswordUrl: string | undefined) => {
  Config.siteMetadata = { ...Config.siteMetadata, cognitoForgotPasswordUrl }
}

export const mockHtmlTranslationsCdnUrl = (htmlTranslationsCdnUrl: string | undefined) => {
  Config.siteMetadata = { ...Config.siteMetadata, htmlTranslationsCdnUrl }
}

export const userIsSignedIn = (auth?: Partial<AuthInfo>) => {
  const authToPersist: AuthInfo = {
    idToken: faker.lorem.words(3),
    refreshToken: faker.lorem.words(3),
    ...auth,
  }
  localStorage.setItem(AUTH_LOCAL_STORAGE_KEY, JSON.stringify(authToPersist))
}

export const userIsNotSignedIn = () => localStorage.removeItem(AUTH_LOCAL_STORAGE_KEY)

export const currentAuthCredentials = (): AuthInfo | null => {
  const json = localStorage.getItem(AUTH_LOCAL_STORAGE_KEY)

  if (!json) return null

  return JSON.parse(json)
}
