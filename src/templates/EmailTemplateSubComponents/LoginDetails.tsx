import React, { CSSProperties, FC } from 'react'
import { EmailSubComponentProps } from './shared'
import { EmailBlock } from 'src/ui/EmailBlock'
import { EditableElement } from 'src/ui/EditableElement'
import { useIsCurrentlyActiveEmailSubComponent } from '../CurrentlyActiveEmailPart'
import { useEmailPartsContentForSubComponent } from '../EmailPartsContent'
import { LockIcon } from 'src/ui/LockIcon'
import { Colors, Font, Spacing, StyleDefaults } from '../styles'

const { Table, Row, Cell } = EmailBlock

interface LoginDetailsValue {
  title: string
  usernameLabel: string
  usernameValue: string
  resetPasswordMessage: string
  button: string
  buttonHref: string
  resetPasswordDetails: string
}

const defaultValue: LoginDetailsValue = {
  title: 'Login Details',
  usernameLabel: 'Your username is:',
  usernameValue: 'CAPTAIN AMERICA',
  resetPasswordMessage:
    "If you're having trouble logging in, send a request to reset your password.",
  button: 'Reset Password',
  buttonHref: '',
  resetPasswordDetails:
    'Your request may take up to 7-10 business days. An email will be sent to you when your password has been reset.',
}

export const useLoginDetailsValue = (componentId: string, id: string) =>
  useEmailPartsContentForSubComponent(componentId, id, defaultValue)

export const LoginDetails: FC<EmailSubComponentProps> = ({ componentId, id }) => {
  const { activate } = useIsCurrentlyActiveEmailSubComponent(componentId, id)
  const [value, setValue, { initialValue }] = useEmailPartsContentForSubComponent(
    componentId,
    id,
    defaultValue,
  )
  return (
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
          <LockIcon />
        </Cell>
        <EditableElement
          element="td"
          onValueChange={(title) => setValue({ ...value, title })}
          initialValue={initialValue.title}
          label="Login details title"
          style={styles.title}
        />
      </Row>
      <Row>
        <Cell>{null}</Cell>
        <Cell elements={['table']}>
          <Row>
            <EditableElement
              element="td"
              onValueChange={(usernameLabel) => setValue({ ...value, usernameLabel })}
              initialValue={initialValue.usernameLabel}
              label="Username label"
              style={styles.usernameLabel}
            />
          </Row>
          <Row>
            <EditableElement
              element="td"
              onValueChange={(usernameValue) => setValue({ ...value, usernameValue })}
              initialValue={initialValue.usernameValue}
              label="Username value"
              style={styles.usernameValue}
            />
          </Row>
          <Row>
            <EditableElement
              element="td"
              onValueChange={(resetPasswordMessage) => setValue({ ...value, resetPasswordMessage })}
              initialValue={initialValue.resetPasswordMessage}
              label="Reset password message"
              style={styles.resetPasswordMessage}
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
            <EditableElement
              element="a"
              href={value.buttonHref}
              onValueChange={(button) => setValue({ ...value, button })}
              initialValue={initialValue.button}
              label="Reset password button"
              style={styles.buttonText}
            />
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
              onValueChange={(resetPasswordDetails) => setValue({ ...value, resetPasswordDetails })}
              initialValue={initialValue.resetPasswordDetails}
              label="Reset password details"
              style={styles.resetPasswordDetails}
            />
          </Row>
        </Cell>
      </Row>
    </Row>
  )
}

const styles = {
  outerContainer: {
    ...StyleDefaults.inline.fontAndColors,
    paddingTop: Spacing.size.small,
    paddingBottom: Spacing.size.small,
  } as CSSProperties,
  innerContainer: {
    backgroundColor: Colors.blueLight,
    borderLeft: `8px solid ${Colors.blue}`,
    paddingTop: Spacing.size.extraLarge,
    paddingBottom: Spacing.size.extraLarge,
    paddingLeft: Spacing.size.large,
    paddingRight: Spacing.size.large,
  } as CSSProperties,
  iconContainer: {
    paddingRight: Spacing.size.medium,
  } as CSSProperties,
  title: {
    fontSize: Font.size.large,
    fontWeight: Font.weight.bold,
    paddingBottom: Spacing.size.tiny,
  } as CSSProperties,
  usernameLabel: {
    fontSize: Font.size.small,
  } as CSSProperties,
  usernameValue: {
    fontSize: Font.size.small,
    fontWeight: Font.weight.bold,
    paddingBottom: Spacing.size.large,
  } as CSSProperties,
  resetPasswordMessage: {
    fontSize: Font.size.small,
    paddingBottom: Spacing.size.medium,
  } as CSSProperties,
  button: {
    backgroundColor: Colors.blue,
    borderRadius: 10,
    paddingTop: Spacing.size.small,
    paddingBottom: Spacing.size.small,
    paddingLeft: Spacing.size.extraLarge,
    paddingRight: Spacing.size.extraLarge,
  } as CSSProperties,
  buttonText: {
    color: Colors.white,
    fontWeight: Font.weight.bold,
    textDecoration: 'none',
  } as CSSProperties,
  buttonHref: {
    color: Colors.gray,
    fontSize: Font.size.tiny,
    textDecoration: 'underline',
    paddingBottom: Spacing.size.extraLarge,
    paddingTop: Spacing.size.small,
  } as CSSProperties,
  resetPasswordDetails: {
    fontSize: Font.size.small,
    fontStyle: 'italic',
  } as CSSProperties,
} as const
