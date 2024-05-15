import React, { FC } from 'react'
import { Heading, Paragraph } from 'src/ui/Layout'
import { EmailBlock } from 'src/ui'
import {
  useDisclaimerValue,
  styles as disclaimerStyles,
} from 'src/templates/EmailTemplateComponents/Disclaimer'
import { Spacing } from 'src/templates/styles'
import { RichTextEditableElement } from '../RichTextEditableElement'
import { useUpdateDisclaimer } from 'src/network/useUpdateDisclaimer'
import { SaveButton } from './SaveButton'
import { LoadingOverlay } from '../LoadingOverlay'
import { Alert } from '../Alert'

export const EditDisclaimer: FC = () => {
  const [disclaimer, setDisclaimer, { hasChanges }] = useDisclaimerValue()
  const { error, mutate, isPending } = useUpdateDisclaimer()

  return (
    <form
      className="edit-disclaimer"
      onSubmit={(event) => {
        event.preventDefault()
        mutate(disclaimer)
      }}
    >
      <Heading element="h2" subheading>
        Disclaimer
      </Heading>
      <Paragraph>
        Below every email, there is a disclaimer that is used for confidentiality purposes as well
        as security purposes.
      </Paragraph>
      {error && <Alert>{error.message}</Alert>}
      <EmailBlock.Table elements={['row']} className="desktop" maxWidth={Spacing.layout.maxWidth}>
        <RichTextEditableElement
          label="Disclaimer"
          element="td"
          value={disclaimer.content}
          onValueChange={(content) => setDisclaimer({ content })}
          style={disclaimerStyles}
        />
      </EmailBlock.Table>
      <SaveButton hasChanges={hasChanges} isPending={isPending} />
      {isPending && <LoadingOverlay description="Saving disclaimer" />}
    </form>
  )
}
