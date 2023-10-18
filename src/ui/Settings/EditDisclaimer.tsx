import React, { FC, useMemo } from 'react'
import { Heading, Paragraph } from 'src/ui/Layout'
import { EditableElement, EmailBlock } from 'src/ui'
import {
  useDisclaimerValue,
  styles as disclaimerStyles,
} from 'src/templates/EmailTemplateComponents/Disclaimer'

export const EditDisclaimer: FC = () => {
  const [disclaimer, setDisclaimer] = useDisclaimerValue()
  const initialDisclaimer = useMemo(() => disclaimer, [])

  return (
    <>
      <Heading element="h2" subheading>
        Disclaimer
      </Heading>
      <Paragraph>
        Below every email, there is a disclaimer that is used for confidentiality purposes as well
        as security purposes.
      </Paragraph>
      <EmailBlock.Table elements={['row']}>
        <EditableElement
          label="Disclaimer"
          element="td"
          value={disclaimer}
          onValueChange={setDisclaimer}
          initialValue={initialDisclaimer}
          style={disclaimerStyles}
        />
      </EmailBlock.Table>
    </>
  )
}
