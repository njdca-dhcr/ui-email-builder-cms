import React, { CSSProperties, FC } from 'react'
import { EmailSubComponentProps } from './shared'
import { EditableElement } from 'src/ui/EditableElement'
import { useIsCurrentlyActiveEmailPart } from '../CurrentlyActiveEmailPart'
import { useEmailPartsContentFor } from '../EmailPartsContent'
import { Borders, Spacing, StyleDefaults, Text, Font } from '../styles'
import { EmailBlock } from 'src/ui/EmailBlock'
import { BoxColor, BoxColorConfigs } from 'src/ui/SelectBoxColor'
import { UswdsIcon, UswdsIconVariantKey } from 'src/ui/UswdsIcon'
import { useSyncSidebarAndPreviewScroll } from '../SyncSidebarAndPreviewScroll'

interface BenefitAmountValue {
  title: string
  description: string
  boxColor: BoxColor
  icon: UswdsIconVariantKey
  boxTitle: string
  weeklyRateLabel: string
  weeklyRateValue: string
  partialWeeklyRateLabel: string
  partialWeeklyRateValue: string
  rateExplanation: string
  rateSupportiveInformation: string
  benefitSupportiveInformation: string
}

const defaultValue: BenefitAmountValue = {
  title: 'Your Benefit Details',
  description:
    'A detailed breakdown of your benefit and how we got to that number will be mailed to you. If you disagree with it, appeal rights and processes are available.',
  boxColor: BoxColor.GrantedGreen,
  icon: 'CreditCard',
  boxTitle: 'Benefit Amount',
  weeklyRateLabel: 'Weekly Rate:',
  weeklyRateValue: '$400',
  partialWeeklyRateLabel: 'Partial Weekly Rate:',
  partialWeeklyRateValue: '$480',
  rateExplanation: 'This rate includes an increase for dependency benefits',
  rateSupportiveInformation:
    'This amount is subject to change based on the submitted tax record or dependency documents you send in',
  benefitSupportiveInformation:
    'If you&rsquo;re working part-time, a partial weekly rate (which is 20% higher than your weekly rate) will be used to calculate your benefit amount.',
}

export const useBenefitAmountValue = (id: string) => {
  return useEmailPartsContentFor(id, defaultValue)
}

const { Row, Cell } = EmailBlock

export const BenefitAmount: FC<EmailSubComponentProps> = ({ emailSubComponent }) => {
  const { activate } = useIsCurrentlyActiveEmailPart(emailSubComponent.id)
  const [value, setValue] = useBenefitAmountValue(emailSubComponent.id)
  const { previewRef, scrollSidebar } = useSyncSidebarAndPreviewScroll(emailSubComponent.id)

  const boxColorConfig = BoxColorConfigs[value.boxColor]

  return (
    <Row
      className="benefit-amount"
      elements={['cell', 'table']}
      onClick={(event) => {
        activate(event)
        scrollSidebar()
      }}
      onFocus={(event) => {
        activate(event)
        scrollSidebar()
      }}
    >
      <Row
        elements={[
          { part: 'cell', style: styles.outerCell, className: StyleDefaults.layout.wide },
          'table',
        ]}
      >
        <Row>
          <EditableElement
            ref={previewRef}
            aria-level={2}
            element="td"
            value={value.title}
            label="Benefit Amount title"
            onValueChange={(title) => setValue({ ...value, title })}
            role="heading"
            style={styles.title}
          />
        </Row>

        <Row>
          <EditableElement
            element="td"
            value={value.description}
            label="Benefit Amount description"
            onValueChange={(description) => setValue({ ...value, description })}
            style={styles.description}
          />
        </Row>

        <Row
          elements={[
            {
              part: 'cell',
              style: {
                ...styles.innerCell,
                backgroundColor: boxColorConfig.backgroundColor,
                borderLeft: Borders.large(boxColorConfig.accentColor),
              },
            },
            'table',
          ]}
        >
          <Row>
            <Cell style={styles.iconContainer} align="left">
              <UswdsIcon icon={value.icon} />
            </Cell>
            <Cell align="left">
              <EditableElement
                aria-level={3}
                element="div"
                value={value.boxTitle}
                label="Benefit Amount box title"
                onValueChange={(boxTitle) => setValue({ ...value, boxTitle })}
                role="heading"
                style={styles.boxTitle}
              />
            </Cell>
          </Row>
          <Row>
            <Cell>{null}</Cell>
            <Cell align="left" elements={['table']} style={{ fontFamily: Font.family.default }}>
              <Row>
                <Cell>
                  <EditableElement
                    element="span"
                    value={value.weeklyRateLabel}
                    label="Benefit Amount weekly rate label"
                    onValueChange={(weeklyRateLabel) => setValue({ ...value, weeklyRateLabel })}
                    style={{ fontWeight: 'bold', fontFamily: Font.family.default }}
                  />
                  &nbsp;&nbsp;&nbsp;
                  <EditableElement
                    element="span"
                    value={value.weeklyRateValue}
                    label="Benefit Amount weekly rate value"
                    onValueChange={(weeklyRateValue) => setValue({ ...value, weeklyRateValue })}
                    style={{ fontWeight: 'bold', fontFamily: Font.family.default }}
                  />
                </Cell>
              </Row>
              <Row>
                <Cell style={{ fontWeight: 'bold', paddingBottom: Spacing.size.medium }}>
                  <EditableElement
                    element="span"
                    value={value.partialWeeklyRateLabel}
                    label="Benefit Amount partial weekly rate label"
                    onValueChange={(partialWeeklyRateLabel) =>
                      setValue({ ...value, partialWeeklyRateLabel })
                    }
                    style={{ fontWeight: 'bold', fontFamily: Font.family.default }}
                  />
                  &nbsp;&nbsp;&nbsp;
                  <EditableElement
                    element="span"
                    value={value.partialWeeklyRateValue}
                    label="Benefit Amount partial weekly rate value"
                    onValueChange={(partialWeeklyRateValue) =>
                      setValue({ ...value, partialWeeklyRateValue })
                    }
                    style={{ fontWeight: 'bold', fontFamily: Font.family.default }}
                  />
                </Cell>
              </Row>
              <Row>
                <Cell style={{ paddingBottom: Spacing.size.medium }}>
                  <EditableElement
                    element="span"
                    value={value.rateExplanation}
                    label="Benefit Amount rate explanation"
                    onValueChange={(rateExplanation) => setValue({ ...value, rateExplanation })}
                    style={styles.rateExplanation}
                  />
                </Cell>
              </Row>
              <Row>
                <EditableElement
                  element="td"
                  value={value.rateSupportiveInformation}
                  label="Benefit Amount rate supportive information"
                  onValueChange={(rateSupportiveInformation) =>
                    setValue({ ...value, rateSupportiveInformation })
                  }
                  style={styles.rateSupportiveInformation}
                />
              </Row>
            </Cell>
          </Row>
        </Row>

        <Row>
          <EditableElement
            element="td"
            value={value.benefitSupportiveInformation}
            label="Benefit Amount supportive information"
            onValueChange={(benefitSupportiveInformation) =>
              setValue({ ...value, benefitSupportiveInformation })
            }
            style={{
              paddingTop: Spacing.size.medium,
              ...Text.body.tertiary.italic,
            }}
          />
        </Row>
      </Row>
    </Row>
  )
}

const styles = {
  outerCell: {
    ...StyleDefaults.inline.colors,
  } as CSSProperties,
  innerCell: {
    paddingLeft: Spacing.informationalBox.horizontal.left,
    paddingRight: Spacing.informationalBox.horizontal.right,
    paddingBottom: Spacing.informationalBox.vertical,
    paddingTop: Spacing.informationalBox.vertical,
  } as CSSProperties,
  title: {
    ...Text.header.h3.bold,
    paddingBottom: Spacing.size.small,
  } as CSSProperties,
  description: {
    ...Text.body.secondary.regular,
    paddingBottom: Spacing.size.medium,
  } as CSSProperties,
  iconContainer: {
    paddingRight: Spacing.size.medium,
  } as CSSProperties,
  boxTitle: {
    ...Text.header.h3.bold,
    paddingBottom: Spacing.size.medium,
    lineHeight: '1',
  } as CSSProperties,
  rateExplanation: {
    ...Text.body.secondary.boldItalic,
  } as CSSProperties,
  rateSupportiveInformation: {
    ...Text.body.secondary.italic,
    lineHeight: '1.2',
  } as CSSProperties,
}
