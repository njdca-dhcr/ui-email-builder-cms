import React, { CSSProperties, FC, useCallback } from 'react'
import { EmailSubComponentProps } from './shared'
import { EmailBlock } from 'src/ui/EmailBlock'
import { EditableElement } from 'src/ui/EditableElement'
import { useIsCurrentlyActiveEmailSubComponent } from '../CurrentlyActiveEmailPart'
import { useEmailPartsContentForSubComponent } from '../EmailPartsContent'
import { Borders, Colors, Spacing, SpacingCell, StyleDefaults, Text } from '../styles'
import { UswdsIcon } from 'src/ui'
import { UswdsIconVariantKey } from 'src/ui/UswdsIcon'
import { EditableList, EditableListItem } from 'src/ui/EditableList'

export const enum LoginDetailsVariant {
  Details,
  Information,
}

const { Row, Cell, Link } = EmailBlock

interface LoginDetailsValue {
  variant: LoginDetailsVariant
  loginDetailsTitle: string
  usernameLabel: string
  usernameValue: string
  resetPasswordMessage: string
  button: string
  buttonHref: string
  resetPasswordDetails: string
  loginDetailsIcon: UswdsIconVariantKey
  loginInformationTitle: string
  loginInformationDescription: string
  loginInformationList: string[]
  loginInformationIcon: UswdsIconVariantKey
}

const defaultValue: LoginDetailsValue = {
  variant: LoginDetailsVariant.Details,
  // Details
  loginDetailsTitle: 'Login Details',
  usernameLabel: 'Your username is:',
  usernameValue: 'CAPTAIN AMERICA',
  resetPasswordMessage:
    "If you're having trouble logging in, send a request to reset your password.",
  button: 'Reset Password',
  buttonHref: '',
  resetPasswordDetails:
    'Your request may take up to 7-10 business days. An email will be sent to you when your password has been reset.',
  loginDetailsIcon: 'Lock',
  // Information
  loginInformationTitle: 'Important Login Information',
  loginInformationDescription:
    'Login using the same Login ID and Password you used to file your claim.',
  loginInformationList: [
    `<b>If you do not have an account,</b> create one here. After creating your account, return to this email and get started.`,
    `<b>Forget your username and password?</b> Follow the links on the login page to help access your account.`,
  ],
  loginInformationIcon: 'LockOpen',
}

export const useLoginDetailsValue = (componentId: string, id: string) =>
  useEmailPartsContentForSubComponent(componentId, id, defaultValue)

export const LoginDetails: FC<EmailSubComponentProps> = ({ componentId, id }) => {
  const { activate } = useIsCurrentlyActiveEmailSubComponent(componentId, id)
  const [value, setValue] = useEmailPartsContentForSubComponent(componentId, id, defaultValue)
  const isDetails = value.variant === LoginDetailsVariant.Details
  const isInformation = value.variant === LoginDetailsVariant.Information
  const setLoginInformationList = useCallback(
    (loginInformationList: string[]) => setValue({ ...value, loginInformationList }),
    [value, setValue],
  )

  return (
    <>
      <Row
        elements={[
          { part: 'cell', style: styles.outerContainer, className: StyleDefaults.layout.wide },
          { part: 'table', onClick: activate },
          'row',
          { part: 'cell', style: styles.innerContainer },
          'table',
        ]}
      >
        <Row>
          <Cell style={styles.iconContainer}>
            {isDetails && <UswdsIcon icon={value.loginDetailsIcon} />}
            {isInformation && <UswdsIcon icon={value.loginInformationIcon} />}
          </Cell>
          {isDetails && (
            <EditableElement
              aria-level={2}
              element="td"
              onValueChange={(loginDetailsTitle) => setValue({ ...value, loginDetailsTitle })}
              label="Login details title"
              role="heading"
              style={styles.title}
              value={value.loginDetailsTitle}
            />
          )}
          {isInformation && (
            <EditableElement
              aria-level={2}
              element="td"
              onValueChange={(loginInformationTitle) =>
                setValue({ ...value, loginInformationTitle })
              }
              label="Login information title"
              role="heading"
              style={styles.title}
              value={value.loginInformationTitle}
            />
          )}
        </Row>
        <Row condition={isDetails}>
          <Cell>{null}</Cell>
          <Cell elements={['table']}>
            <Row>
              <EditableElement
                element="td"
                onValueChange={(usernameLabel) => setValue({ ...value, usernameLabel })}
                label="Username label"
                style={styles.usernameLabel}
                value={value.usernameLabel}
              />
            </Row>
            <Row>
              <EditableElement
                element="td"
                onValueChange={(usernameValue) => setValue({ ...value, usernameValue })}
                label="Username value"
                style={styles.usernameValue}
                value={value.usernameValue}
              />
            </Row>
            <Row>
              <EditableElement
                element="td"
                onValueChange={(resetPasswordMessage) =>
                  setValue({ ...value, resetPasswordMessage })
                }
                label="Reset password message"
                style={styles.resetPasswordMessage}
                value={value.resetPasswordMessage}
              />
            </Row>
            <Row
              elements={[
                'cell',
                { part: 'table', width: 'unset' },
                'row',
                { part: 'cell', style: styles.button },
              ]}
            >
              <Link to={value.buttonHref}>
                <EditableElement
                  element="span"
                  onValueChange={(button) => setValue({ ...value, button })}
                  label="Reset password button"
                  style={styles.buttonText}
                  value={value.button}
                />
              </Link>
            </Row>
            <Row
              elements={[
                'cell',
                { part: 'table', maxWidth: 297 },
                'row',
                { part: 'cell', style: styles.buttonHref },
              ]}
            >
              {value.buttonHref ||
                'https://link.embedded-into-the-button-above.should-be-shown-here-in-order-to-give-an-alternative-way-to-access-a-link'}
            </Row>
            <Row>
              <EditableElement
                element="td"
                onValueChange={(resetPasswordDetails) =>
                  setValue({ ...value, resetPasswordDetails })
                }
                label="Reset password details"
                style={styles.resetPasswordDetails}
                value={value.resetPasswordDetails}
              />
            </Row>
          </Cell>
        </Row>
        <Row condition={isInformation}>
          <Cell>{null}</Cell>
          <Cell elements={['table']}>
            <Row>
              <EditableElement
                element="td"
                label="Login information description"
                value={value.loginInformationDescription}
                onValueChange={(loginInformationDescription) =>
                  setValue({ ...value, loginInformationDescription })
                }
                style={styles.loginInformationDescription}
              />
            </Row>
            <Row elements={[{ part: 'cell', style: styles.loginInformationListContainer }]}>
              <EditableList
                collection={value.loginInformationList}
                element="ul"
                setCollection={setLoginInformationList}
                style={styles.loginInformationList}
              >
                {value.loginInformationList.map((info, index) => (
                  <EditableListItem
                    key={index}
                    index={index}
                    value={info}
                    label={`Login information bullet ${index + 1}`}
                    style={styles.loginInformationListItem}
                  />
                ))}
              </EditableList>
            </Row>
          </Cell>
        </Row>
      </Row>
      <Row>
        <SpacingCell size="large" />
      </Row>
    </>
  )
}

const styles = {
  outerContainer: {
    ...StyleDefaults.inline.colors,
  } as CSSProperties,
  innerContainer: {
    backgroundColor: Colors.alert.info.light,
    borderLeft: Borders.large(Colors.alert.info.dark),
    paddingTop: Spacing.size.extraLarge,
    paddingBottom: Spacing.size.extraLarge,
    paddingLeft: Spacing.size.large,
    paddingRight: Spacing.size.large,
  } as CSSProperties,
  iconContainer: {
    paddingRight: Spacing.size.medium,
    paddingTop: Spacing.size.tiny,
  } as CSSProperties,
  title: {
    ...Text.header.h3.bold,
    paddingBottom: Spacing.size.tiny,
  } as CSSProperties,
  usernameLabel: {
    ...Text.body.secondary.regular,
  } as CSSProperties,
  usernameValue: {
    ...Text.body.secondary.bold,
    paddingBottom: Spacing.size.large,
  } as CSSProperties,
  resetPasswordMessage: {
    ...Text.body.secondary.regular,
    paddingBottom: Spacing.size.medium,
  } as CSSProperties,
  button: {
    backgroundColor: Colors.alert.info.dark,
    borderRadius: 10,
    paddingTop: Spacing.size.small,
    paddingBottom: Spacing.size.small,
    paddingLeft: Spacing.size.extraLarge,
    paddingRight: Spacing.size.extraLarge,
  } as CSSProperties,
  buttonText: {
    ...Text.body.main.bold,
    color: Colors.white,
    textDecoration: 'none',
  } as CSSProperties,
  buttonHref: {
    ...Text.caption.small.regular,
    color: Colors.gray,
    paddingBottom: Spacing.size.extraLarge,
    paddingTop: Spacing.size.small,
  } as CSSProperties,
  resetPasswordDetails: {
    ...Text.body.secondary.italic,
  } as CSSProperties,
  loginInformationDescription: {
    ...Text.body.main.semibold,
  } as CSSProperties,
  loginInformationListContainer: {
    paddingLeft: Spacing.size.large,
    paddingTop: Spacing.size.extraLarge,
  } as CSSProperties,
  loginInformationList: {
    margin: 0,
    padding: 0,
  } as CSSProperties,
  loginInformationListItem: {
    ...Text.body.secondary.italic,
  } as CSSProperties,
} as const
