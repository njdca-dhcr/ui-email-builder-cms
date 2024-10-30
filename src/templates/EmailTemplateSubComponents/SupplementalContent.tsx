import React, { CSSProperties, FC } from 'react'
import { EmailSubComponentProps } from './shared'
import { useIsCurrentlyActiveEmailPart } from '../CurrentlyActiveEmailPart'
import {
  BoxColorConfigs,
  EditableElement,
  EmailBlock,
  RichTextEditableElement,
  UswdsIcon,
} from 'src/ui'
import { useEmailPartsContentFor } from '../EmailPartsContent'
import { Borders, Spacing, SpacingCell, StyleDefaults, Text } from '../styles'
import { useSyncSidebarAndPreviewScroll } from '../SyncSidebarAndPreviewScroll'
import { EmailTemplate, SupplementalContentVariant } from 'src/appTypes'

const { Row, Cell } = EmailBlock

export const useSupplementalContentValue = (
  emailSubComponent: EmailTemplate.SupplementalContent,
) => {
  return useEmailPartsContentFor(emailSubComponent)
}

export const SupplementalContent: FC<EmailSubComponentProps<'SupplementalContent'>> = ({
  emailSubComponent,
}) => {
  const { activate } = useIsCurrentlyActiveEmailPart(emailSubComponent.id)
  const [value, setValue] = useSupplementalContentValue(emailSubComponent)
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
        {[
          SupplementalContentVariant.DoubleSupplementalContent,
          SupplementalContentVariant.TripleSupplementalContent,
        ].includes(value.variant) && (
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
        {[SupplementalContentVariant.TripleSupplementalContent].includes(value.variant) && (
          <>
            <Row>
              <SpacingCell size="large" />
            </Row>
            <Row>
              <EditableElement
                ref={previewRef}
                aria-level={3}
                element="td"
                label="Supplemental content title 3"
                onValueChange={(thirdTitle) => setValue({ ...value, thirdTitle })}
                role="heading"
                style={styles.supplementalContentTitle}
                value={value.thirdTitle}
              />
            </Row>
            <Row>
              <RichTextEditableElement
                element="td"
                label="Supplemental content description 3"
                onValueChange={(thirdDescription) => setValue({ ...value, thirdDescription })}
                style={styles.supplementContentDescription}
                value={value.thirdDescription}
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
