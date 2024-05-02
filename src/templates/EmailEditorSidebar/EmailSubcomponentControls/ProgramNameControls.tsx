import React, { FC } from 'react'
import { Control, EmailSubComponentControlsProps } from './shared'
import { useProgramNameValue } from 'src/templates/EmailTemplateSubComponents/ProgramName'
import { ColorPicker } from 'src/ui/ColorPicker'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { ColorInput } from 'src/ui/ColorInput'
import { isAppMode } from 'src/utils/appMode'
import { Select } from 'src/ui'
import { ProgramNameNJPreset, ProgramNameValue } from 'src/appTypes'

export const ProgramNameControls: FC<EmailSubComponentControlsProps<'ProgramName'>> = ({
  emailSubComponent,
}) => {
  const presetSelectHtmlId = `program-name-preset-select-${emailSubComponent.id}`
  const colorPickerHtmlId = `program-name-background-color-${emailSubComponent.id}`
  const colorInputHtmlId = `program-name-background-color-input-${emailSubComponent.id}`
  const [value, setValue] = useProgramNameValue(emailSubComponent)
  const isCustomPreset = ProgramNameNJPreset.Custom === value.preset
  const isNJMode = isAppMode('NJ')

  return (
    <Control.Group>
      {isNJMode && (
        <Control.Container layout="column">
          <Control.Label id={presetSelectHtmlId}>Background Color Preset</Control.Label>
          <Select
            size="small"
            labelId={presetSelectHtmlId}
            options={[
              {
                label: ProgramNameNJPreset.DependencyBenefits,
                value: ProgramNameNJPreset.DependencyBenefits,
              },
              {
                label: ProgramNameNJPreset.DisasterUnemploymentAssistance,
                value: ProgramNameNJPreset.DisasterUnemploymentAssistance,
              },
              {
                label: ProgramNameNJPreset.MixedEarnersUnemploymentCompensation,
                value: ProgramNameNJPreset.MixedEarnersUnemploymentCompensation,
              },
              {
                label: ProgramNameNJPreset.PandemicUnemploymentAssistance,
                value: ProgramNameNJPreset.PandemicUnemploymentAssistance,
              },
              {
                label: ProgramNameNJPreset.PandemicUnemploymentOverpayment,
                value: ProgramNameNJPreset.PandemicUnemploymentOverpayment,
              },
              {
                label: ProgramNameNJPreset.UnemploymentInsurance,
                value: ProgramNameNJPreset.UnemploymentInsurance,
              },
              {
                label: ProgramNameNJPreset.UnemploymentInsuranceUiDependencyBenefits,
                value: ProgramNameNJPreset.UnemploymentInsuranceUiDependencyBenefits,
              },
              {
                label: ProgramNameNJPreset.UnemploymentInsuranceUiMonetaryEligibility,
                value: ProgramNameNJPreset.UnemploymentInsuranceUiMonetaryEligibility,
              },
              { label: ProgramNameNJPreset.Custom, value: ProgramNameNJPreset.Custom },
            ]}
            value={value.preset}
            onChange={(preset) => {
              setValue(programNameValueForPreset(preset as ProgramNameNJPreset, value))
            }}
          />
        </Control.Container>
      )}

      {(isCustomPreset || !isNJMode) && (
        <Control.Container className="program-name-inline-color-picker">
          <Control.Label htmlFor={colorPickerHtmlId}>Background Color</Control.Label>
          <VisuallyHidden>
            <label htmlFor={colorInputHtmlId}>Background Color Hex Code</label>
          </VisuallyHidden>
          <div className="color-input-and-picker">
            <ColorInput
              id={colorInputHtmlId}
              value={value.backgroundColor}
              onChange={(backgroundColor) => setValue({ ...value, backgroundColor })}
            />
            <ColorPicker
              id={colorPickerHtmlId}
              className="color-picker-inline"
              value={value.backgroundColor}
              onChange={(backgroundColor) => setValue({ ...value, backgroundColor })}
            />
          </div>
        </Control.Container>
      )}
    </Control.Group>
  )
}

const programNameValueForPreset = (
  preset: ProgramNameNJPreset,
  value: ProgramNameValue,
): ProgramNameValue => {
  switch (preset) {
    case ProgramNameNJPreset.DependencyBenefits:
      return { preset, name: preset, backgroundColor: '#F1DEA0' }
    case ProgramNameNJPreset.DisasterUnemploymentAssistance:
      return { preset, name: preset, backgroundColor: '#CCBDDF' }
    case ProgramNameNJPreset.MixedEarnersUnemploymentCompensation:
      return { preset, name: preset, backgroundColor: '#E1E291' }
    case ProgramNameNJPreset.PandemicUnemploymentAssistance:
      return { preset, name: preset, backgroundColor: '#F1DEA0' }
    case ProgramNameNJPreset.PandemicUnemploymentOverpayment:
      return { preset, name: preset, backgroundColor: '#F1DEA0' }
    case ProgramNameNJPreset.UnemploymentInsurance:
      return { preset, name: preset, backgroundColor: '#B9D8F3' }
    case ProgramNameNJPreset.UnemploymentInsuranceUiDependencyBenefits:
      return { preset, name: preset, backgroundColor: '#F3B9C3' }
    case ProgramNameNJPreset.UnemploymentInsuranceUiMonetaryEligibility:
      return { preset, name: preset, backgroundColor: '#F3B9C3' }
    case ProgramNameNJPreset.Custom:
      return { ...value, preset }
  }
}
