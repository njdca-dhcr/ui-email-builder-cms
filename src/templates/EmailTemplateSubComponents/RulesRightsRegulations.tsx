import React, { CSSProperties, FC, useCallback, useMemo } from 'react'
import { EmailSubComponentProps } from './shared'
import { EmailBlock } from 'src/ui/EmailBlock'
import { EditableElement } from 'src/ui/EditableElement'
import { useEmailPartsContentFor } from '../EmailPartsContent'
import { useIsCurrentlyActiveEmailPart } from '../CurrentlyActiveEmailPart'
import { Borders, Colors, Font, Spacing, StyleDefaults, Text } from '../styles'
import { UswdsIcon } from 'src/ui/'
import { UswdsIconVariantKey } from 'src/ui/UswdsIcon'
import { EditableList, EditableListItem } from 'src/ui/EditableList'
import { EditableTerms, TableTerm } from 'src/ui/EditableTermsTable'

export const enum RulesRightsRegulationsVariant {
  Reminder,
  AppealRights,
  YourRights,
}

interface RulesRightsRegulationsValue {
  variant: RulesRightsRegulationsVariant
  icon: UswdsIconVariantKey
  // Reminder
  reminderTitle: string
  eligibilityLabel: string
  eligibilityConditionsList: string[]
  showReminderIsFor: boolean
  reminderIsFor: string
  showFootnote: boolean
  footnote: string
  // Appeal Rights
  appealRightsTitle: string
  appealRightsSummary: string
  appealRightsShowInstruction: boolean
  appealRightsInstruction: string
  appealRightsButton: string
  appealRightsHref: string
  appealRightsShowInfoLabel: boolean
  appealRightsInfoLabel: string
  appealRightsShowTerms: boolean
  appealRightsTerms: TableTerm[]
  // Your Rights
  yourRightsTitle: string
  yourRightsList: string[]
}

const defaultValue: RulesRightsRegulationsValue = {
  variant: RulesRightsRegulationsVariant.Reminder,
  icon: 'Flag',
  reminderTitle: 'Reminder',
  eligibilityLabel: 'You may only be eligible for this waiver if...',
  eligibilityConditionsList: [
    'Overpayment was due to no fault of your own*',
    'Repayment would be unfair and unreasonable given the context',
  ],
  showReminderIsFor: true,
  reminderIsFor:
    'This waiver is for Pandemic Unemployment Assistance (PUA), Federal Pandemic Unemployment Compensation (FPUC), Mixed Earners Unemployment Compensation (MEUC), and Pandemic Extended Unemployment Compensation (PEUC).',
  showFootnote: true,
  footnote:
    '*State and federal laws, rules, and guidance will be used to make these determinations.',
  appealRightsTitle: 'Appeal Rights',
  appealRightsSummary:
    'If you disagree with this determination, you have the right to file an appeal. Your appeal must be received within seven (7) days after the date you received this email.',
  appealRightsShowInstruction: true,
  appealRightsInstruction: 'To begin an appeal online, get started below:',
  appealRightsButton: 'Get Started',
  appealRightsHref: '',
  appealRightsShowInfoLabel: true,
  appealRightsInfoLabel: 'For your appeal:',
  appealRightsShowTerms: true,
  appealRightsTerms: [
    { label: 'Program Code:', value: '###' },
    { label: 'Date of Claim:', value: '00/00/0000' },
    { label: 'Date of Determination:', value: '00/00/0000' },
  ],
  yourRightsTitle: 'Your Rights:',
  yourRightsList: [
    `You may represent yourself or you may be represented at your own expense by an attorney or non-attorney`,
    `You may request a postponement, if you require additional time to prepare your response to this questionnaire`,
    `You may request that your employer produce any documents which relate to your eligibility for benefits`,
    `You may request that statements be taken from your witnesses who have firsthand knowledge of the case`,
    `You or your representative will have the opportunity to provide witness statements, present documents and provide a closing statement or summary `,
    `If the reason for the questionnaire is related to your employment, any questions that you may have for your former employer may be included on the form and the reviewing claims examiner may, at his/her discretion, pose the question(s) to your former employer.`,
  ],
}

export const useRulesRightsRegulationsValue = (id: string) => {
  return useEmailPartsContentFor(id, defaultValue)
}

const { Row, Cell, Link } = EmailBlock

export const RulesRightsRegulations: FC<EmailSubComponentProps> = ({ emailSubComponent }) => {
  const { activate } = useIsCurrentlyActiveEmailPart(emailSubComponent.id)
  const [value, setValue] = useRulesRightsRegulationsValue(emailSubComponent.id)
  const isReminder = value.variant === RulesRightsRegulationsVariant.Reminder
  const isAppealRights = value.variant === RulesRightsRegulationsVariant.AppealRights
  const isYourRights = value.variant === RulesRightsRegulationsVariant.YourRights
  const setEligibilityConditionsList = useCallback(
    (eligibilityConditionsList: string[]) => setValue({ ...value, eligibilityConditionsList }),
    [value, setValue],
  )
  const setAppealRightsTerms = useCallback(
    (appealRightsTerms: TableTerm[]) => setValue({ ...value, appealRightsTerms }),
    [value, setValue],
  )
  const setYourRightsList = useCallback(
    (yourRightsList: string[]) => setValue({ ...value, yourRightsList }),
    [value, setValue],
  )

  return (
    <Row
      key={value.variant}
      className="rules-rights-regulations"
      elements={[
        { part: 'cell', style: styles.outerContainer, className: StyleDefaults.layout.wide },
        'table',
        'row',
        { part: 'cell', style: styles.innerContainer },
        'table',
      ]}
      onClick={activate}
    >
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
            style={styles.title}
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
            style={styles.title}
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
            style={styles.title}
          />
        )}
      </Row>
      <Row>
        {(isReminder || isAppealRights) && <Cell>{null}</Cell>}
        <Cell elements={['table']} condition={isReminder}>
          <Row>
            <EditableElement
              element="td"
              value={value.eligibilityLabel}
              label="Eligibility label"
              onValueChange={(eligibilityLabel) => setValue({ ...value, eligibilityLabel })}
              style={styles.eligibilityLabel}
            />
          </Row>
          <Row elements={['cell']}>
            <EditableList
              collection={value.eligibilityConditionsList}
              element="ol"
              setCollection={setEligibilityConditionsList}
              style={styles.eligibilityConditions}
            >
              {value.eligibilityConditionsList.map((eligibilityCondition, index) => (
                <EditableListItem
                  key={index}
                  label={`Eligibility condition ${index + 1}`}
                  index={index}
                  value={eligibilityCondition}
                  style={styles.eligibilityCondition}
                />
              ))}
            </EditableList>
          </Row>
          <Row condition={value.showReminderIsFor}>
            <EditableElement
              element="td"
              value={value.reminderIsFor}
              label="Reminder is for"
              onValueChange={(reminderIsFor) => setValue({ ...value, reminderIsFor })}
              style={styles.reminderIsFor}
            />
          </Row>
          <Row condition={value.showFootnote}>
            <EditableElement
              element="td"
              value={value.footnote}
              label="Reminder footnote"
              onValueChange={(footnote) => setValue({ ...value, footnote })}
              style={styles.footnote}
            />
          </Row>
        </Cell>
        <Cell elements={['table']} condition={isAppealRights}>
          <Row>
            <EditableElement
              element="td"
              value={value.appealRightsSummary}
              label="Appeal Rights summary"
              onValueChange={(appealRightsSummary) => setValue({ ...value, appealRightsSummary })}
              style={styles.appealSummary}
            />
          </Row>
          <Row condition={value.appealRightsShowInstruction}>
            <EditableElement
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
              { part: 'table', width: 'unset' },
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
              { part: 'table', maxWidth: 297 },
              'row',
              { part: 'cell', style: styles.appealHref },
            ]}
          >
            {value.appealRightsHref ||
              'https://link.embedded-into-the-button-above.should-be-shown-here-in-order-to-give-an-alternative-way-to-access-a-link'}
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
          <Row elements={['cell']} condition={value.appealRightsShowTerms}>
            <EditableTerms.Table
              collection={value.appealRightsTerms}
              setCollection={setAppealRightsTerms}
              style={styles.appealLabelAndValue}
            >
              {value.appealRightsTerms.map((_item, index) => (
                <EditableTerms.Row
                  key={index}
                  index={index}
                  label={(props) => (
                    <EditableElement
                      {...props}
                      label={`Appeal Rights row label ${index + 1}`}
                      style={styles.appealLabel}
                    />
                  )}
                  value={(props) => (
                    <EditableElement
                      {...props}
                      label={`Appeal Rights row value ${index + 1}`}
                      style={styles.appealText}
                    />
                  )}
                />
              ))}
            </EditableTerms.Table>
          </Row>
        </Cell>
        <Cell condition={isYourRights} style={styles.yourRightsListContainer}>
          <EditableList
            collection={value.yourRightsList}
            element="ol"
            setCollection={setYourRightsList}
            style={styles.yourRightsList}
          >
            {value.yourRightsList.map((right, index) => (
              <EditableListItem
                key={index}
                label={`Your Rights ${index + 1}`}
                index={index}
                value={right}
                style={styles.yourRightsListItem}
              />
            ))}
          </EditableList>
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
    paddingLeft: Spacing.size.large,
    paddingRight: Spacing.size.extraLarge,
    paddingBottom: Spacing.size.extraLarge,
    paddingTop: 0,
  } as CSSProperties,
  iconContainer: {
    paddingRight: Spacing.size.medium,
    paddingTop: Spacing.size.extraLarge,
  } as CSSProperties,
  title: {
    ...Text.header.h3.bold,
    paddingTop: Spacing.size.large,
  } as CSSProperties,
  eligibilityLabel: {
    ...Text.body.main.semibold,
    paddingBottom: Spacing.size.extraLarge,
  } as CSSProperties,
  eligibilityConditions: {
    margin: 0,
    padding: 0,
    paddingLeft: Spacing.size.large,
  } as CSSProperties,
  eligibilityCondition: {
    ...Text.body.main.semibold,
  } as CSSProperties,
  reminderIsFor: {
    ...Text.body.secondary.italic,
    paddingTop: Spacing.size.extraLarge,
  } as CSSProperties,
  footnote: {
    ...Text.body.secondary.boldItalic,
    paddingTop: Spacing.size.extraLarge,
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
    paddingTop: Spacing.size.small,
    paddingBottom: Spacing.size.small,
    paddingLeft: 44,
    paddingRight: 44,
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
  } as CSSProperties,
  appealLabelAndValue: {
    paddingTop: Spacing.size.small,
  } as CSSProperties,
  appealLabel: {
    ...Text.body.secondary.semibold,
    paddingRight: Spacing.size.small,
  } as CSSProperties,
  appealInfoLabel: {
    ...Text.header.h4.bold,
    paddingTop: Spacing.size.extraLarge,
  } as CSSProperties,
  yourRightsListContainer: {
    paddingLeft: Spacing.size.medium,
    paddingTop: Spacing.size.large,
  } as CSSProperties,
  yourRightsList: {
    margin: 0,
    padding: 0,
  } as CSSProperties,
  yourRightsListItem: {
    ...Text.body.list.small,
    marginBottom: Font.size.small,
  } as CSSProperties,
} as const
