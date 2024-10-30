import React, { CSSProperties, FC } from 'react'
import { EmailSubComponentProps } from './shared'
import { useEmailPartsContentFor } from '../EmailPartsContent'
import { useIsCurrentlyActiveEmailPart } from '../CurrentlyActiveEmailPart'
import { Borders, Colors, Font, Spacing, StyleDefaults, Text } from '../styles'
import {
  BoxColorConfigs,
  EditableElement,
  EmailBlock,
  RichTextAdditionalStyles,
  RichTextEditableElement,
  UswdsIcon,
} from 'src/ui'
import { useSyncSidebarAndPreviewScroll } from '../SyncSidebarAndPreviewScroll'
import { EmailTemplate, RulesRightsRegulationsVariant } from 'src/appTypes'

const DISPLAYED_HREF_MAX_WIDTH = 297

export const useRulesRightsRegulationsValue = (
  emailSubComponent: EmailTemplate.RulesRightsRegulations,
) => {
  return useEmailPartsContentFor(emailSubComponent)
}

const { Row, Cell, Link, Table } = EmailBlock

export const RulesRightsRegulations: FC<EmailSubComponentProps<'RulesRightsRegulations'>> = ({
  emailSubComponent,
}) => {
  const { activate } = useIsCurrentlyActiveEmailPart(emailSubComponent.id)
  const [value, setValue] = useRulesRightsRegulationsValue(emailSubComponent)
  const { previewRef, scrollSidebar } = useSyncSidebarAndPreviewScroll(emailSubComponent.id)
  const isReminder = value.variant === RulesRightsRegulationsVariant.Reminder
  const isAppealRights = value.variant === RulesRightsRegulationsVariant.AppealRights
  const isYourRights = value.variant === RulesRightsRegulationsVariant.YourRights
  const boxColorConfig = BoxColorConfigs[value.boxColor]

  return (
    <Row
      key={value.variant}
      className="rules-rights-regulations"
      elements={[
        { part: 'cell', style: styles.outerContainer, className: StyleDefaults.layout.wide },
        'table',
        'row',
        {
          part: 'cell',
          style: {
            ...styles.innerContainer,
            backgroundColor: boxColorConfig.backgroundColor,
            borderLeft: Borders.large(boxColorConfig.accentColor),
          },
        },
        'table',
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
      <Row>
        {(isReminder || isAppealRights) && (
          <Cell style={styles.iconContainer}>
            <UswdsIcon icon={value.icon} />
          </Cell>
        )}
        {isReminder && (
          <EditableElement
            aria-level={2}
            element="td"
            value={value.reminderTitle}
            label="Reminder title"
            onValueChange={(reminderTitle) => setValue({ ...value, reminderTitle })}
            role="heading"
            style={styles.reminderTitle}
          />
        )}
        {isAppealRights && (
          <EditableElement
            aria-level={2}
            element="td"
            value={value.appealRightsTitle}
            label="Appeal Rights title"
            onValueChange={(appealRightsTitle) => setValue({ ...value, appealRightsTitle })}
            role="heading"
            style={styles.reminderTitle}
          />
        )}
        {isYourRights && (
          <EditableElement
            aria-level={2}
            element="td"
            value={value.yourRightsTitle}
            label="Your Rights title"
            onValueChange={(yourRightsTitle) => setValue({ ...value, yourRightsTitle })}
            role="heading"
            style={styles.reminderTitle}
          />
        )}
      </Row>
      <Row>
        {(isReminder || isAppealRights) && <Cell>{null}</Cell>}
        <Cell elements={['table']} condition={isReminder}>
          <Row>
            <RichTextEditableElement
              element="td"
              className="rrr-reminder"
              label="Reminder description"
              value={value.reminderDescription}
              onValueChange={(reminderDescription) => setValue({ ...value, reminderDescription })}
              style={styles.reminderDescription}
            />
          </Row>
        </Cell>
        <Cell elements={['table']} condition={isAppealRights}>
          <Row>
            <RichTextEditableElement
              element="td"
              value={value.appealRightsSummary}
              label="Appeal Rights summary"
              onValueChange={(appealRightsSummary) => setValue({ ...value, appealRightsSummary })}
              style={styles.appealSummary}
            />
          </Row>
          <Row condition={value.appealRightsShowInstruction}>
            <RichTextEditableElement
              element="td"
              value={value.appealRightsInstruction}
              label="Appeal Rights instruction"
              onValueChange={(appealRightsInstruction) =>
                setValue({ ...value, appealRightsInstruction })
              }
              style={styles.appealInstruction}
            />
          </Row>
          <Row
            elements={[
              'cell',
              { part: 'table', width: 'unset', className: StyleDefaults.layout.button },
              'row',
              { part: 'cell', style: styles.appealButton },
            ]}
          >
            <Link to={value.appealRightsHref}>
              <EditableElement
                element="span"
                value={value.appealRightsButton}
                label="Appeal Rights button"
                onValueChange={(appealRightsButton) => setValue({ ...value, appealRightsButton })}
                style={styles.appealButtonText}
              />
            </Link>
          </Row>
          <Row
            className="displayed-href"
            elements={[
              'cell',
              { part: 'table', maxWidth: DISPLAYED_HREF_MAX_WIDTH },
              'row',
              { part: 'cell', style: styles.appealHref },
            ]}
          >
            <Link to={value.appealRightsHref}>
              <EditableElement
                element="span"
                value={value.appealRightsHref}
                label="Appeal Rights link"
                onValueChange={(appealRightsHref) => setValue({ ...value, appealRightsHref })}
              />
            </Link>
          </Row>
          <Row condition={value.appealRightsShowInfoLabel}>
            <EditableElement
              element="td"
              id="appeal-rights-label"
              value={value.appealRightsInfoLabel}
              label="Appeal Rights information label"
              onValueChange={(appealRightsInfoLabel) =>
                setValue({ ...value, appealRightsInfoLabel })
              }
              style={styles.appealInfoLabel}
            />
          </Row>
          <Row condition={value.appealRightsShowInfo}>
            <RichTextEditableElement
              element="td"
              label="Appeal Rights information"
              value={value.appealRightsInfo}
              onValueChange={(appealRightsInfo) => setValue({ ...value, appealRightsInfo })}
              style={styles.appealRightsInfo}
            />
          </Row>
        </Cell>
        <Cell condition={isYourRights}>
          <Table>
            <Row condition={value.showYourRightsDescription}>
              <RichTextEditableElement
                element="td"
                value={value.yourRightsDescription}
                label="Your Rights description"
                onValueChange={(yourRightsDescription) =>
                  setValue({ ...value, yourRightsDescription })
                }
                style={styles.yourRightsDescription}
              />
            </Row>
            <Row>
              <RichTextEditableElement
                element="td"
                label="Your Rights body"
                value={value.yourRightsList}
                onValueChange={(yourRightsList) => setValue({ ...value, yourRightsList })}
                style={styles.yourRightsList}
                additionalStyles={styles.yourRightsListRichText}
              />
            </Row>
          </Table>
        </Cell>
      </Row>
    </Row>
  )
}

const styles = {
  outerContainer: {
    ...StyleDefaults.inline.colors,
  } as CSSProperties,
  innerContainer: {
    backgroundColor: Colors.alert.neutral.light,
    borderLeft: Borders.large(Colors.alert.neutral.dark),
    paddingLeft: Spacing.informationalBox.horizontal.left,
    paddingRight: Spacing.informationalBox.horizontal.right,
    paddingBottom: Spacing.informationalBox.vertical,
    paddingTop: Spacing.informationalBox.vertical,
  } as CSSProperties,
  iconContainer: {
    paddingRight: Spacing.size.medium,
    paddingTop: Spacing.size.tiny,
  } as CSSProperties,
  reminderTitle: {
    ...Text.header.h3.bold,
  } as CSSProperties,
  reminderDescription: {
    ...Text.body.main.regular,
    paddingTop: Spacing.size.medium,
  } as CSSProperties,
  appealSummary: {
    ...Text.body.secondary.regular,
    paddingBottom: Spacing.size.large,
    paddingTop: Spacing.size.small,
  } as CSSProperties,
  appealInstruction: {
    ...Text.body.secondary.regular,
    paddingBottom: Spacing.size.medium,
  } as CSSProperties,
  appealText: {
    ...Text.body.secondary.regular,
  } as CSSProperties,
  appealButton: {
    backgroundColor: Colors.black,
    borderRadius: 10,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 44,
    paddingRight: 44,
    textAlign: 'center',
  } as CSSProperties,
  appealButtonText: {
    ...Text.body.main.bold,
    color: Colors.white,
    textDecoration: 'none',
  } as CSSProperties,
  appealHref: {
    ...Text.caption.small.regular,
    color: Colors.gray,
    paddingTop: Spacing.size.medium,
    textDecoration: 'underline',
    maxWidth: DISPLAYED_HREF_MAX_WIDTH,
    overflowWrap: 'break-word',
    wordBreak: 'break-all',
  } as CSSProperties,
  appealRightsInfo: {
    ...Text.body.secondary.regular,
    paddingTop: Spacing.size.small,
  } as CSSProperties,
  appealInfoLabel: {
    ...Text.header.h4.bold,
    paddingTop: Spacing.size.extraLarge,
  } as CSSProperties,
  yourRightsDescription: {
    ...Text.body.secondary.regular,
    paddingTop: Spacing.size.medium,
  },
  yourRightsList: {
    ...Text.body.list.small,
    paddingTop: Spacing.size.medium,
  } as CSSProperties,
  yourRightsListRichText: {
    'list-item': {
      marginBottom: Font.size.small,
    },
  } as RichTextAdditionalStyles,
} as const
