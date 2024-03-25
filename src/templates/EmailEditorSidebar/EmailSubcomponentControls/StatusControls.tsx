import React, { FC } from 'react'
import { Control, EmailSubComponentControlsProps, SELECT_VARIANT_CLASSNAME } from './shared'
import { VisuallyHidden } from '@reach/visually-hidden'
import { useSubComponentControlOptions } from '.'
import { useStatusValue } from 'src/templates/EmailTemplateSubComponents/Status'
import { Select } from 'src/ui/Select'
import { SubComponentControlToggle } from './SubComponentControlToggle'
import { SelectBoxColor } from 'src/ui/SelectBoxColor'
import { UswdsIconSelect } from 'src/ui'
import { StatusVariant } from 'src/appTypes'

export const StatusControls: FC<EmailSubComponentControlsProps<'Status'>> = ({
  emailSubComponent,
}) => {
  const variantHtmlId = `select-variant-${emailSubComponent.id}`
  const boxColorHtmlId = `select-box-color-${emailSubComponent.id}`
  const iconHtmlId = `select-icon-${emailSubComponent.id}`
  const [value, setValue] = useStatusValue(emailSubComponent)

  useSubComponentControlOptions(emailSubComponent, value, setValue)

  return (
    <Control.Group className="status-control-group">
      <VisuallyHidden>
        <span id={variantHtmlId}>Status variant</span>
      </VisuallyHidden>
      <Select
        className={SELECT_VARIANT_CLASSNAME}
        labelId={variantHtmlId}
        options={[
          { label: 'Overview', value: StatusVariant.Overview },
          { label: 'Overview w/ Reason', value: StatusVariant.OverviewWithReason },
          { label: 'Missing Document Specifics', value: StatusVariant.MissingDocument },
          {
            label: 'Overview w/ Reason + Amount Due',
            value: StatusVariant.OverviewWithReasonAndAmountDue,
          },
          {
            label: 'Overview w/ Reason + Amount Breakdown',
            value: StatusVariant.OverviewWithReasonAndAmountBreakdown,
          },
        ]}
        onChange={(newValue) => setValue({ ...value, variant: newValue as StatusVariant })}
        value={value.variant}
        size="small"
      />
      {[
        StatusVariant.OverviewWithReasonAndAmountDue,
        StatusVariant.OverviewWithReasonAndAmountBreakdown,
      ].includes(value.variant) && (
        <>
          <Control.Container layout="column">
            <Control.Label id={boxColorHtmlId} size="small">
              Box Color
            </Control.Label>
            <SelectBoxColor
              labelId={boxColorHtmlId}
              value={value.boxColor}
              onChange={(boxColor) => setValue({ ...value, boxColor })}
            />
          </Control.Container>
          <Control.Container layout="column">
            <Control.Label id={iconHtmlId} size="small">
              Icon
            </Control.Label>
            <UswdsIconSelect
              labelId={iconHtmlId}
              onChange={(icon) => setValue({ ...value, icon })}
              value={value.icon}
            />
          </Control.Container>
        </>
      )}
      {[StatusVariant.Overview].includes(value.variant) && (
        <SubComponentControlToggle
          subComponentId={emailSubComponent.id}
          label="+ Description"
          onChange={(showDescription) => setValue({ ...value, showDescription })}
          value={value.showDescription}
        />
      )}
      <SubComponentControlToggle
        className="status-supportive-information-toggle"
        subComponentId={emailSubComponent.id}
        label="+ Supportive Information"
        onChange={(showSupportiveInformation) => setValue({ ...value, showSupportiveInformation })}
        value={value.showSupportiveInformation}
      />
      {[StatusVariant.MissingDocument].includes(value.variant) && (
        <SubComponentControlToggle
          subComponentId={emailSubComponent.id}
          label="+ Missing Document Deadline"
          onChange={(showMissingDocumentDeadline) =>
            setValue({ ...value, showMissingDocumentDeadline })
          }
          value={value.showMissingDocumentDeadline}
        />
      )}
    </Control.Group>
  )
}
