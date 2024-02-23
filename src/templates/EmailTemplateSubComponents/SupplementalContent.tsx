import React, { CSSProperties, FC } from 'react'
import { EmailSubComponentProps } from './shared'
import { useIsCurrentlyActiveEmailPart } from '../CurrentlyActiveEmailPart'
import { EditableElement } from 'src/ui/EditableElement'
import { useEmailPartsContentFor } from '../EmailPartsContent'
import { Borders, Spacing, SpacingCell, StyleDefaults, Text } from '../styles'
import { EmailBlock } from 'src/ui/EmailBlock'
import { useSyncSidebarAndPreviewScroll } from '../SyncSidebarAndPreviewScroll'
import { RichTextValue } from 'src/ui/RichTextEditor'
import { RichTextEditableElement } from 'src/ui/RichTextEditableElement'
import { UswdsIcon, UswdsIconVariantKey } from 'src/ui/UswdsIcon'
import { BoxColor, BoxColorConfigs } from 'src/ui/SelectBoxColor'

export const enum SupplementalContentVariant {
  BenefitAmount,
  SingleSupplementalContent,
  DoubleSupplementalContent,
}

interface SupplementalContentValue {
  variant: SupplementalContentVariant
  // All
  title: string
  description: RichTextValue
  // Double Supplemental Content
  secondTitle: string
  secondDescription: RichTextValue
  // Benefit Amount
  benefitAmountBoxColor: BoxColor
  benefitAmountIcon: UswdsIconVariantKey
  benefitAmountTitle: string
  benefitAmountDescription: RichTextValue
  benefitAmountBoxTitle: string
  benefitAmountMainBoxCopy: RichTextValue
  benefitAmountSupplementalBoxCopy: RichTextValue
  benefitAmountSupportiveInformation: RichTextValue
}

const defaultValue: SupplementalContentValue = {
  variant: SupplementalContentVariant.SingleSupplementalContent,
  title: 'Supplemental Content Title 1',
  description: [
    {
      type: 'paragraph',
      children: [
        {
          text: 'Aenean lacinia bibendum nulla sed consectetur. Cras mattis consectetur purus sit amet fermentum. Curabitur blandit tempus porttitor. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
      ],
    },
  ],
  secondTitle: 'Supplemental Content Title 2',
  secondDescription: [
    {
      type: 'paragraph',
      children: [
        {
          text: 'Aenean lacinia bibendum nulla sed consectetur. Cras mattis consectetur purus sit amet fermentum. Curabitur blandit tempus porttitor. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
      ],
    },
  ],
  benefitAmountBoxColor: BoxColor.GrantedGreen,
  benefitAmountIcon: 'CreditCard',
  benefitAmountTitle: 'Your Benefit Details',
  benefitAmountDescription: [
    {
      type: 'paragraph',
      children: [
        {
          text: 'A detailed breakdown of your benefit amount and how we got to that number will be mailed to you. If you disagree with it, appeal rights and processes are available.',
        },
      ],
    },
  ],
  benefitAmountBoxTitle: 'Benefit Amount',
  benefitAmountMainBoxCopy: [
    {
      type: 'paragraph',
      children: [
        {
          text: 'Weekly Rate:   ',
          bold: true,
        },
        { text: '$400', bold: true },
      ],
    },
    {
      type: 'paragraph',
      children: [
        {
          text: 'Partial Weekly Rate:   ',
          bold: true,
        },
        { text: '$200', bold: true },
      ],
    },
  ],
  benefitAmountSupplementalBoxCopy: [
    {
      type: 'paragraph',
      children: [
        {
          text: 'This rate includes an increase for dependency benefits',
          bold: true,
          italic: true,
        },
      ],
    },
    {
      type: 'paragraph',
      children: [{ text: ' ' }],
    },
    {
      type: 'paragraph',
      children: [
        {
          text: 'This amount is subject to change based on the submitted tax record or dependency documents you send in.',
          italic: true,
        },
      ],
    },
  ],
  benefitAmountSupportiveInformation: [
    {
      type: 'paragraph',
      children: [
        {
          text: "If you're working part-time, a partial weekly rate (which is 20% higher than your weekly rate) will be used to calculate your benefit amount.",
          italic: true,
        },
      ],
    },
  ],
}

const { Row, Cell } = EmailBlock

export const useSupplementalContentValue = (id: string) => useEmailPartsContentFor(id, defaultValue)

export const SupplementalContent: FC<EmailSubComponentProps> = ({ emailSubComponent }) => {
  const { activate } = useIsCurrentlyActiveEmailPart(emailSubComponent.id)
  const [value, setValue] = useEmailPartsContentFor(emailSubComponent.id, defaultValue)
  const { previewRef, scrollSidebar } = useSyncSidebarAndPreviewScroll(emailSubComponent.id)
  const boxColorConfig = BoxColorConfigs[value.benefitAmountBoxColor]

  return (
    <Row
      className="supplemental-content"
      onClick={(event) => {
        activate(event)
        scrollSidebar()
      }}
      onFocus={(event) => {
        activate(event)
        scrollSidebar()
      }}
      elements={[{ part: 'cell', style: styles.outerCell }, 'table']}
    >
      {[SupplementalContentVariant.BenefitAmount].includes(value.variant) && (
        <Row
          elements={[
            { part: 'cell', className: StyleDefaults.layout.narrow },
            'table',
            'row',
            { part: 'cell', style: {} },
            'table',
          ]}
        >
          <Row>
            <EditableElement
              value={value.benefitAmountTitle}
              element="td"
              label="Benefit amount title"
              onValueChange={(benefitAmountTitle) => setValue({ ...value, benefitAmountTitle })}
              style={styles.benefitAmountTitle}
            />
          </Row>
          <Row>
            <RichTextEditableElement
              element="td"
              label="Benefit amount description"
              onValueChange={(benefitAmountDescription) =>
                setValue({ ...value, benefitAmountDescription })
              }
              value={value.benefitAmountDescription}
              style={styles.benefitAmountDescription}
            />
          </Row>
          <Row
            elements={[
              {
                part: 'cell',
                style: {
                  ...styles.benefitAmountBox,
                  backgroundColor: boxColorConfig.backgroundColor,
                  borderLeft: Borders.large(boxColorConfig.accentColor),
                },
              },
              'table',
            ]}
          >
            <Row>
              <Cell style={styles.benefitAmountIconContainer}>
                <UswdsIcon icon={value.benefitAmountIcon} />
              </Cell>
              <EditableElement
                aria-level={2}
                value={value.benefitAmountBoxTitle}
                element="td"
                label="Benefit amount box title"
                onValueChange={(benefitAmountBoxTitle) =>
                  setValue({ ...value, benefitAmountBoxTitle })
                }
                role="heading"
                style={styles.benefitAmountBoxTitle}
              />
            </Row>
            <Row>
              <Cell>{null}</Cell>
              <Cell elements={['table']}>
                <Row>
                  <RichTextEditableElement
                    element="td"
                    label="Benefit amount box copy"
                    onValueChange={(benefitAmountMainBoxCopy) =>
                      setValue({ ...value, benefitAmountMainBoxCopy })
                    }
                    value={value.benefitAmountMainBoxCopy}
                    style={styles.benefitAmountMainBoxCopy}
                  />
                </Row>
                <Row>
                  <RichTextEditableElement
                    element="td"
                    label="Benefit amount supplemental box copy"
                    onValueChange={(benefitAmountSupplementalBoxCopy) =>
                      setValue({ ...value, benefitAmountSupplementalBoxCopy })
                    }
                    value={value.benefitAmountSupplementalBoxCopy}
                    style={styles.benefitAmountSupplementalBoxCopy}
                  />
                </Row>
              </Cell>
            </Row>
          </Row>
          <Row>
            <RichTextEditableElement
              element="td"
              label="Benefit amount box supportive information"
              onValueChange={(benefitAmountSupportiveInformation) =>
                setValue({ ...value, benefitAmountSupportiveInformation })
              }
              value={value.benefitAmountSupportiveInformation}
              style={styles.benefitAmountSupportiveInformation}
            />
          </Row>
          <Row>
            <SpacingCell size="large" />
          </Row>
        </Row>
      )}

      <Row elements={[{ part: 'cell', className: StyleDefaults.layout.narrow }, 'table']}>
        <Row>
          <EditableElement
            ref={previewRef}
            aria-level={3}
            element="td"
            label="Supplemental content title"
            onValueChange={(title) => setValue({ ...value, title })}
            role="heading"
            style={styles.supplementalContentTitle}
            value={value.title}
          />
        </Row>
        <Row>
          <RichTextEditableElement
            element="td"
            label="Supplemental content description"
            onValueChange={(description) => setValue({ ...value, description })}
            style={styles.supplementContentDescription}
            value={value.description}
          />
        </Row>
        {[SupplementalContentVariant.DoubleSupplementalContent].includes(value.variant) && (
          <>
            <Row>
              <SpacingCell size="large" />
            </Row>
            <Row>
              <EditableElement
                ref={previewRef}
                aria-level={3}
                element="td"
                label="Supplemental content title 2"
                onValueChange={(secondTitle) => setValue({ ...value, secondTitle })}
                role="heading"
                style={styles.supplementalContentTitle}
                value={value.secondTitle}
              />
            </Row>
            <Row>
              <RichTextEditableElement
                element="td"
                label="Supplemental content description 2"
                onValueChange={(secondDescription) => setValue({ ...value, secondDescription })}
                style={styles.supplementContentDescription}
                value={value.secondDescription}
              />
            </Row>
          </>
        )}
      </Row>
    </Row>
  )
}

const styles = {
  outerCell: { ...StyleDefaults.inline.colors },
  benefitAmountTitle: { ...Text.header.h3.bold, paddingBottom: Spacing.size.small },
  benefitAmountDescription: { ...Text.body.secondary.regular, paddingBottom: Spacing.size.medium },
  benefitAmountBox: {
    paddingLeft: Spacing.informationalBox.horizontal.left,
    paddingRight: Spacing.informationalBox.horizontal.right,
    paddingBottom: Spacing.informationalBox.vertical,
    paddingTop: Spacing.informationalBox.vertical,
  },
  benefitAmountIconContainer: { paddingRight: Spacing.size.medium },
  benefitAmountBoxTitle: {
    ...Text.header.h3.bold,
    paddingBottom: Spacing.size.medium,
    lineHeight: '1',
  },
  benefitAmountMainBoxCopy: {
    ...Text.body.main.regular,
    paddingBottom: Spacing.size.medium,
  },
  benefitAmountSupplementalBoxCopy: {
    ...Text.body.secondary.regular,
    lineHeight: '1.2',
  },
  benefitAmountSupportiveInformation: {
    ...Text.body.tertiary.regular,
    paddingTop: Spacing.size.medium,
  },
  supplementalContentTitle: { ...Text.header.h3.bold, paddingBottom: Spacing.size.small },
  supplementContentDescription: { ...Text.body.secondary.regular },
} as const satisfies Record<string, CSSProperties>
