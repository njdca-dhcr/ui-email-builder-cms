import { useEmailPartsContentData } from 'src/templates/EmailPartsContent'
import { usePreviewText } from 'src/templates/PreviewText'
import { areEmailTranslationsEqual } from 'src/utils/emailPartsComparators'
import { useCurrentTranslation } from 'src/utils/EmailTemplateState'
import { mergeTranslationValues } from './emailTemplateMergeDefaultValues'

export const useTranslationHasChanges = () => {
  const translation = useCurrentTranslation()
  const [previewText] = usePreviewText()
  const [data] = useEmailPartsContentData()

  const changedTranslation = mergeTranslationValues({ translation, previewText, data })

  return !areEmailTranslationsEqual(translation, changedTranslation)
}
