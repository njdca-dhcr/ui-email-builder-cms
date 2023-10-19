import React, { CSSProperties, FC, useMemo } from 'react'
import { EmailSubComponentProps } from './shared'
import { EmailBlock } from 'src/ui/EmailBlock'
import { EditableElement } from 'src/ui/EditableElement'
import { useEmailPartsContentForSubComponent } from '../EmailPartsContent'
import { useIsCurrentlyActiveEmailSubComponent } from '../CurrentlyActiveEmailPart'
import { FlagIcon } from 'src/ui/FlagIcon'
import { Colors, Font, Spacing, SpacingCell, StyleDefaults } from '../styles'

export const enum RulesRightsRegulationsVariant {
  Reminder,
  AppealRights,
}

interface RulesRightsRegulationsValue {
  variant: RulesRightsRegulationsVariant
  // Reminder
  reminderTitle: string
  eligibilityLabel: string
  eligibilityCondition1: string
  eligibilityCondition2: string
  reminderIsFor: string
  footnote: string
  // Appeal Rights
  appealRightsTitle: string
  appealRightsSummary: string
  appealRightsInstruction: string
  appealRightsButton: string
  appealRightsHref: string
  appealRightsInfoLabel: string
  appealRightsProgramCodeLabel: string
  appealRightsProgramCodeValue: string
  appealRightsClaimDateLabel: string
  appealRightsClaimDateValue: string
  appealRightsDeterminationDateLabel: string
  appealRightsDeterminationDateValue: string
}

const defaultValue: RulesRightsRegulationsValue = {
  variant: RulesRightsRegulationsVariant.Reminder,
  reminderTitle: 'Reminder',
  eligibilityLabel: 'You may only be eligible for this waiver if...',
  eligibilityCondition1: 'Overpayment was due to no fault of your own*',
  eligibilityCondition2: 'Repayment would be unfair and unreasonable given the context',
  reminderIsFor:
    'This waiver is for Pandemic Unemployment Assistance (PUA), Federal Pandemic Unemployment Compensation (FPUC), Mixed Earners Unemployment Compensation (MEUC), and Pandemic Extended Unemployment Compensation (PEUC).',
  footnote:
    '*State and federal laws, rules, and guidance will be used to make these determinations.',
  appealRightsTitle: 'Appeal Rights',
  appealRightsSummary:
    'If you disagree with this determination, you have the right to file an appeal. Your appeal must be received within seven (7) days after the date you received this email.',
  appealRightsInstruction: 'To begin an appeal online, get started below:',
  appealRightsButton: 'Get Started',
  appealRightsHref: '',
  appealRightsInfoLabel: 'For your appeal:',
  appealRightsProgramCodeLabel: 'Program Code:',
  appealRightsProgramCodeValue: '###',
  appealRightsClaimDateLabel: 'Date of Claim:',
  appealRightsClaimDateValue: '00/00/0000',
  appealRightsDeterminationDateLabel: 'Date of Determination:',
  appealRightsDeterminationDateValue: '00/00/0000',
}

export const useRulesRightsRegulationsValue = (componentId: string, id: string) => {
  return useEmailPartsContentForSubComponent(componentId, id, defaultValue)
}

const { Row, Cell, Link } = EmailBlock

export const RulesRightsRegulations: FC<EmailSubComponentProps> = ({ componentId, id }) => {
  const { activate } = useIsCurrentlyActiveEmailSubComponent(componentId, id)
  const [value, setValue] = useRulesRightsRegulationsValue(componentId, id)
  const isReminder = value.variant === RulesRightsRegulationsVariant.Reminder
  const isAppealRights = value.variant === RulesRightsRegulationsVariant.AppealRights

  const initialValue = useMemo(() => value, [value.variant])

  return (
    <>
      <Row
        key={value.variant}
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
          <Cell style={styles.iconContainer}>
            <FlagIcon />
          </Cell>
          {isReminder && (
            <EditableElement
              element="td"
              initialValue={initialValue.reminderTitle}
              label="Reminder title"
              onValueChange={(reminderTitle) => setValue({ ...value, reminderTitle })}
              style={styles.title}
            />
          )}
          {isAppealRights && (
            <EditableElement
              element="td"
              initialValue={initialValue.appealRightsTitle}
              label="Appeal Rights title"
              onValueChange={(appealRightsTitle) => setValue({ ...value, appealRightsTitle })}
              style={styles.title}
            />
          )}
        </Row>
        <Row>
          <Cell>{null}</Cell>
          <Cell elements={['table']} condition={isReminder}>
            <Row>
              <EditableElement
                element="td"
                initialValue={initialValue.eligibilityLabel}
                label="Eligibility label"
                onValueChange={(eligibilityLabel) => setValue({ ...value, eligibilityLabel })}
                style={styles.eligibilityLabel}
              />
            </Row>
            <Row elements={['cell']}>
              <ol style={styles.eligibilityConditions}>
                <EditableElement
                  element="li"
                  initialValue={initialValue.eligibilityCondition1}
                  label="Eligibility condition 1"
                  onValueChange={(eligibilityCondition1) =>
                    setValue({ ...value, eligibilityCondition1 })
                  }
                  style={styles.eligibilityCondition}
                />
                <EditableElement
                  element="li"
                  initialValue={initialValue.eligibilityCondition2}
                  label="Eligibility condition 2"
                  onValueChange={(eligibilityCondition2) =>
                    setValue({ ...value, eligibilityCondition2 })
                  }
                  style={styles.eligibilityCondition}
                />
              </ol>
            </Row>
            <Row>
              <EditableElement
                element="td"
                initialValue={initialValue.reminderIsFor}
                label="Reminder is for"
                onValueChange={(reminderIsFor) => setValue({ ...value, reminderIsFor })}
                style={styles.reminderIsFor}
              />
            </Row>
            <Row>
              <EditableElement
                element="td"
                initialValue={initialValue.footnote}
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
                initialValue={initialValue.appealRightsSummary}
                label="Appeal Rights summary"
                onValueChange={(appealRightsSummary) => setValue({ ...value, appealRightsSummary })}
                style={styles.appealSummary}
              />
            </Row>
            <Row>
              <EditableElement
                element="td"
                initialValue={initialValue.appealRightsInstruction}
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
                  initialValue={initialValue.appealRightsButton}
                  label="Appeal Rights button"
                  onValueChange={(appealRightsButton) => setValue({ ...value, appealRightsButton })}
                  style={styles.appealButtonText}
                />
              </Link>
            </Row>
            <Row
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
            <Row>
              <EditableElement
                element="td"
                initialValue={initialValue.appealRightsInfoLabel}
                label="Appeal Rights information label"
                onValueChange={(appealRightsInfoLabel) =>
                  setValue({ ...value, appealRightsInfoLabel })
                }
                style={styles.appealInfoLabel}
              />
            </Row>
            <Row
              elements={[
                { part: 'cell', style: styles.appealLabelAndValue },
                { part: 'table', width: 'unset' },
                'row',
              ]}
            >
              <EditableElement
                element="td"
                initialValue={initialValue.appealRightsProgramCodeLabel}
                label="Appeal Rights program code label"
                onValueChange={(appealRightsProgramCodeLabel) =>
                  setValue({ ...value, appealRightsProgramCodeLabel })
                }
                style={styles.appealLabel}
              />
              <EditableElement
                element="td"
                initialValue={initialValue.appealRightsProgramCodeValue}
                label="Appeal Rights program code value"
                onValueChange={(appealRightsProgramCodeValue) =>
                  setValue({ ...value, appealRightsProgramCodeValue })
                }
                style={styles.appealText}
              />
            </Row>
            <Row
              elements={[
                { part: 'cell', style: styles.appealLabelAndValue },
                { part: 'table', width: 'unset' },
                'row',
              ]}
            >
              <EditableElement
                element="td"
                initialValue={initialValue.appealRightsClaimDateLabel}
                label="Appeal Rights claim date label"
                onValueChange={(appealRightsClaimDateLabel) =>
                  setValue({ ...value, appealRightsClaimDateLabel })
                }
                style={styles.appealLabel}
              />
              <EditableElement
                element="td"
                initialValue={initialValue.appealRightsClaimDateValue}
                label="Appeal Rights claim date value"
                onValueChange={(appealRightsClaimDateValue) =>
                  setValue({ ...value, appealRightsClaimDateValue })
                }
                style={styles.appealText}
              />
            </Row>
            <Row
              elements={[
                { part: 'cell', style: styles.appealLabelAndValue },
                { part: 'table', width: 'unset' },
                'row',
              ]}
            >
              <EditableElement
                element="td"
                initialValue={initialValue.appealRightsDeterminationDateLabel}
                label="Appeal Rights determination date label"
                onValueChange={(appealRightsDeterminationDateLabel) =>
                  setValue({ ...value, appealRightsDeterminationDateLabel })
                }
                style={styles.appealLabel}
              />
              <EditableElement
                element="td"
                initialValue={initialValue.appealRightsDeterminationDateValue}
                label="Appeal Rights determination date value"
                onValueChange={(appealRightsDeterminationDateValue) =>
                  setValue({ ...value, appealRightsDeterminationDateValue })
                }
                style={styles.appealText}
              />
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
    ...StyleDefaults.inline.fontAndColors,
  } as CSSProperties,
  innerContainer: {
    backgroundColor: Colors.grayLight,
    borderLeft: `8px solid ${Colors.grayDark}`,
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
    fontSize: Font.size.large,
    fontWeight: Font.weight.bold,
    paddingTop: Spacing.size.medium,
  } as CSSProperties,
  eligibilityLabel: {
    fontWeight: 600,
    paddingBottom: Spacing.size.extraLarge,
  } as CSSProperties,
  eligibilityConditions: {
    margin: 0,
    padding: 0,
    paddingLeft: Spacing.size.large,
  } as CSSProperties,
  eligibilityCondition: {
    fontWeight: 600,
  } as CSSProperties,
  reminderIsFor: {
    fontStyle: 'italic',
    paddingBottom: Spacing.size.extraLarge,
    paddingTop: Spacing.size.extraLarge,
  } as CSSProperties,
  footnote: {
    fontWeight: Font.weight.bold,
    fontSize: Font.size.small,
    fontStyle: 'italic',
  } as CSSProperties,
  appealSummary: {
    fontSize: Font.size.small,
    paddingBottom: Spacing.size.large,
    paddingTop: Spacing.size.small,
  } as CSSProperties,
  appealInstruction: {
    fontSize: Font.size.small,
    paddingBottom: Spacing.size.medium,
  } as CSSProperties,
  appealText: {
    fontSize: Font.size.small,
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
    color: Colors.white,
    fontWeight: Font.weight.bold,
    textDecoration: 'none',
  } as CSSProperties,
  appealHref: {
    color: Colors.gray,
    fontSize: Font.size.tiny,
    paddingBottom: Spacing.size.extraLarge,
    paddingTop: Spacing.size.medium,
    textDecoration: 'underline',
  } as CSSProperties,
  appealLabelAndValue: {
    paddingTop: Spacing.size.tiny,
  } as CSSProperties,
  appealLabel: {
    fontWeight: Font.weight.bold,
    fontSize: Font.size.small,
    paddingRight: Spacing.size.small,
  } as CSSProperties,
  appealInfoLabel: {
    fontWeight: Font.weight.bold,
    paddingBottom: Font.size.tiny,
  } as CSSProperties,
} as const
