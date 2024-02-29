import React, { CSSProperties, FC } from 'react'
import { EmailSubComponentProps } from './shared'
import { useIsCurrentlyActiveEmailPart } from '../CurrentlyActiveEmailPart'
import { useEmailPartsContentFor } from '../EmailPartsContent'
import { Colors, Spacing, StyleDefaults, Text } from '../styles'
import { EditableElement } from 'src/ui/EditableElement'
import { EmailBlock } from 'src/ui'
import { textColorForBackground } from 'src/utils/textColorForBackground'
import { useSyncSidebarAndPreviewScroll } from '../SyncSidebarAndPreviewScroll'
import { isNJMode } from 'src/utils/appMode'

export enum ProgramNameNJPreset {
  DependencyBenefits = 'Dependency Benefits',
  DisasterUnemploymentAssistance = 'Disaster Unemployment Assistance (DUA)',
  MixedEarnersUnemploymentCompensation = 'Mixed Earners Unemployment Compensation (MEUC)',
  PandemicUnemploymentAssistance = 'Pandemic Unemployment Assistance (PUA)',
  PandemicUnemploymentOverpayment = 'Pandemic Unemployment Overpayment',
  UnemploymentInsurance = 'Unemployment Insurance (UI)',
  UnemploymentInsuranceUiDependencyBenefits = 'Unemployment Insurance (UI) Dependency Benefits',
  UnemploymentInsuranceUiMonetaryEligibility = 'Unemployment Insurance (UI) Monetary Eligibility',
  Custom = 'Custom',
}

export interface ProgramNameValue {
  preset: ProgramNameNJPreset
  name: string
  backgroundColor: string
}

const defaultValue = (): ProgramNameValue => {
  if (isNJMode()) {
    return {
      preset: ProgramNameNJPreset.DependencyBenefits,
      name: 'Dependency Benefits',
      backgroundColor: '#E1E291',
    }
  } else {
    return {
      preset: ProgramNameNJPreset.DependencyBenefits,
      name: 'Program Name',
      backgroundColor: '#CCBDDF',
    }
  }
}

const { Table, Row } = EmailBlock

export const useProgramNameValue = (id: string) => {
  return useEmailPartsContentFor(id, defaultValue())
}

export const ProgramName: FC<EmailSubComponentProps> = ({ emailSubComponent }) => {
  const { activate } = useIsCurrentlyActiveEmailPart(emailSubComponent.id)
  const [value, setValue] = useProgramNameValue(emailSubComponent.id)
  const { previewRef, scrollSidebar } = useSyncSidebarAndPreviewScroll(emailSubComponent.id)

  const color = textColorForBackground(value.backgroundColor, {
    dark: Colors.black,
    light: Colors.white,
  })

  return (
    <Row
      className="program-name"
      elements={[
        {
          part: 'cell',
          style: StyleDefaults.inline.colors,
          className: StyleDefaults.layout.narrow,
        },
      ]}
    >
      <Table width="unset" elements={['row']}>
        <EditableElement
          valueKey={value.preset}
          ref={previewRef}
          aria-level={2}
          element="td"
          label="Program name"
          onClick={(event) => {
            activate(event)
            scrollSidebar()
          }}
          onFocus={(event) => {
            activate(event)
            scrollSidebar()
          }}
          onValueChange={(name) => setValue({ ...value, name })}
          role="heading"
          style={{ ...styles, color, backgroundColor: value.backgroundColor }}
          value={value.name}
        />
      </Table>
    </Row>
  )
}

const styles: CSSProperties = {
  ...Text.header.h6.bold,
  borderRadius: '3px',
  paddingBottom: Spacing.size.tiny,
  paddingTop: Spacing.size.tiny,
  paddingLeft: Spacing.size.small,
  paddingRight: Spacing.size.small,
}
