import React, { CSSProperties, FC, useMemo } from 'react'
import { EmailSubComponentProps } from './shared'
import { EmailBlock } from 'src/ui/EmailBlock'
import { EditableElement } from 'src/ui/EditableElement'
import { useEmailPartsContentForSubComponent } from '../EmailPartsContent'
import { useIsCurrentlyActiveEmailSubComponent } from '../CurrentlyActiveEmailPart'
import { FlagIcon } from 'src/ui/FlagIcon'
import { Colors, DefaultStyles, Font, Spacing } from '../styles'

export const enum RulesRightsRegulationsVariant {
  Reminder,
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
}

export const useRulesRightsRegulationsValue = (componentId: string, id: string) => {
  return useEmailPartsContentForSubComponent(componentId, id, defaultValue)
}

const { Table, Row, Cell } = EmailBlock

export const RulesRightsRegulations: FC<EmailSubComponentProps> = ({ componentId, id }) => {
  const { activate } = useIsCurrentlyActiveEmailSubComponent(componentId, id)
  const [value, setValue] = useRulesRightsRegulationsValue(componentId, id)

  const initialValue = useMemo(() => value, [value.variant])

  return (
    <Row
      key={value.variant}
      elements={[
        { part: 'cell', style: styles.outerContainer },
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
        <EditableElement
          element="td"
          initialValue={initialValue.reminderTitle}
          label="Reminder title"
          onValueChange={(reminderTitle) => setValue({ ...value, reminderTitle })}
          style={styles.reminderTitle}
        />
      </Row>
      <Row>
        <Cell>{null}</Cell>
        <Cell elements={['table']}>
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
      </Row>
    </Row>
  )
}

const styles = {
  outerContainer: {
    ...DefaultStyles,
    paddingBottom: Spacing.size.extraLarge,
  } as CSSProperties,
  innerContainer: {
    backgroundColor: Colors.grayLight,
    borderLeft: `8px solid ${Colors.grayDark}`,
    padding: Spacing.size.large,
    paddingRight: Spacing.size.extraLarge,
    paddingBottom: Spacing.size.extraLarge,
  } as CSSProperties,
  iconContainer: {
    paddingRight: Spacing.size.medium,
    paddingTop: Spacing.size.extraLarge,
  } as CSSProperties,
  reminderTitle: {
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
} as const
