import React, { CSSProperties, FC } from 'react'
import { EmailSubComponentProps } from './shared'
import { EmailBlock } from 'src/ui/EmailBlock'
import { EditableElement } from 'src/ui/EditableElement'
import { useEmailPartsContentFor } from '../EmailPartsContent'
import { useIsCurrentlyActiveEmailPart } from '../CurrentlyActiveEmailPart'
import { Borders, Colors, Font, Spacing, StyleDefaults, Text } from '../styles'
import { BoxColor, BoxColorConfigs } from 'src/ui/SelectBoxColor'
import { UswdsIcon } from 'src/ui/'
import { useSyncSidebarAndPreviewScroll } from '../SyncSidebarAndPreviewScroll'
import { RichTextEditableElement } from 'src/ui/RichTextEditableElement'
import {
  EmailTemplate,
  RulesRightsRegulationsValue,
  RulesRightsRegulationsVariant,
} from 'src/appTypes'
import { RichTextAdditionalStyles } from 'src/ui/RichTextEditor'

const DISPLAYED_HREF_MAX_WIDTH = 297

const defaultValue: RulesRightsRegulationsValue = {
  variant: RulesRightsRegulationsVariant.Reminder,
  icon: 'Flag',
  boxColor: BoxColor.GoverningGray,
  reminderTitle: 'Reminder',
  reminderDescription: [
    {
      type: 'paragraph',
      children: [
        {
          text: 'You may only be eligible for this waiver if...',
          bold: true,
        },
      ],
    },
    {
      type: 'paragraph',
      children: [
        {
          bold: true,
          text: '',
        },
      ],
    },
    {
      type: 'numbered-list',
      children: [
        {
          type: 'list-item',
          children: [
            {
              bold: true,
              text: 'Overpayment was due to no fault of your own*',
            },
          ],
        },
        {
          type: 'list-item',
          children: [
            {
              bold: true,
              text: 'Repayment would be unfair and unreasonable given the context',
            },
          ],
        },
      ],
    },
    {
      type: 'paragraph',
      children: [
        {
          bold: true,
          text: '',
        },
      ],
    },
    {
      type: 'paragraph',
      children: [
        {
          text: 'This waiver is for Pandemic Unemployment Assistance (PUA), Federal Pandemic Unemployment Compensation (FPUC), Mixed Earners Unemployment Compensation (MEUC), and Pandemic Extended Unemployment Compensation (PEUC).',
          italic: true,
        },
      ],
    },
    {
      type: 'paragraph',
      children: [
        {
          text: '',
        },
      ],
    },
    {
      type: 'paragraph',
      children: [
        {
          text: '*State and federal laws, rules, and guidance will be used to make these determinations.',
          bold: true,
        },
      ],
    },
  ],
  appealRightsTitle: 'Appeal Rights',
  appealRightsSummary: [
    {
      type: 'paragraph',
      children: [
        {
          text: 'If you disagree with this determination, you have the right to file an appeal. Your appeal must be received within seven (7) days after the date you received this email.',
        },
      ],
    },
  ],
  appealRightsShowInstruction: true,
  appealRightsInstruction: [
    { type: 'paragraph', children: [{ text: 'To begin an appeal online, get started below:' }] },
  ],
  appealRightsButton: 'Get Started',
  appealRightsHref:
    'https://link.embedded-into-the-button-above.should-be-shown-here-in-order-to-give-an-alternative-way-to-access-a-link',
  appealRightsShowInfoLabel: true,
  appealRightsInfoLabel: 'For your appeal:',
  appealRightsShowInfo: true,
  appealRightsInfo: [
    {
      type: 'paragraph',
      children: [{ text: 'Program Code:', bold: true }, { text: '  ###' }],
    },
    {
      type: 'paragraph',
      children: [{ text: 'Date of Claim:', bold: true }, { text: '  00/00/0000' }],
    },
    {
      type: 'paragraph',
      children: [{ text: 'Date of Determination:', bold: true }, { text: '  00/00/0000' }],
    },
  ],
  yourRightsTitle: 'Your Rights:',
  showYourRightsDescription: true,
  yourRightsDescription: [
    {
      type: 'paragraph',
      children: [
        {
          text: 'A dependent is an unemployed spouse/civil union partner or an unemployed, unmarried child (including stepchild or legally adopted child) under the age of 19 (or 22 if the child is attending school full-time).',
          italic: true,
        },
      ],
    },
  ],
  yourRightsList: [
    {
      type: 'numbered-list',
      children: [
        {
          type: 'list-item',
          children: [
            {
              text: 'You may represent yourself or you may be represented at your own expense by an attorney or non-attorney',
            },
          ],
        },
        {
          type: 'list-item',
          children: [
            {
              text: 'You may request a postponement, if you require additional time to prepare your response to this questionnaire',
            },
          ],
        },
        {
          type: 'list-item',
          children: [
            {
              text: 'You may request that your employer produce any documents which relate to your eligibility for benefits',
            },
          ],
        },
        {
          type: 'list-item',
          children: [
            {
              text: 'You may request that statements be taken from your witnesses who have firsthand knowledge of the case',
            },
          ],
        },
        {
          type: 'list-item',
          children: [
            {
              text: 'You or your representative will have the opportunity to provide witness statements, present documents and provide a closing statement or summary',
            },
          ],
        },
        {
          type: 'list-item',
          children: [
            {
              text: 'If the reason for the questionnaire is related to your employment, any questions that you may have for your former employer may be included on the form and the reviewing claims examiner may, at his/her discretion, pose the question(s) to your former employer.',
            },
          ],
        },
      ],
    },
  ],
}

export const useRulesRightsRegulationsValue = (
  emailSubComponent: EmailTemplate.RulesRightsRegulations,
) => {
  return useEmailPartsContentFor(emailSubComponent, defaultValue)
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
          part: 'cell', style: {
            ...styles.innerContainer,
            backgroundColor: boxColorConfig.backgroundColor,
            borderLeft: Borders.large(boxColorConfig.accentColor)
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
