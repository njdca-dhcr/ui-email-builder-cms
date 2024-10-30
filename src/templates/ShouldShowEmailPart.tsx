import { useCallback } from 'react'
import { useEmailPartsContentFor } from './EmailPartsContent'
import { EmailTemplate } from 'src/appTypes'

export const useShouldShowEmailPart = (
  emailPart?: EmailTemplate.Unique.Part,
): { on: boolean; off: boolean; toggle: () => void } => {
  const [value, setValue] = useEmailPartsContentFor(emailPart)
  const visible = value.visible ?? true

  const toggle = useCallback(() => {
    setValue({ ...value, visible: !visible })
  }, [value, visible, setValue])

  if (emailPart) {
    return {
      toggle,
      on: visible,
      off: !visible,
    }
  } else {
    return { on: false, off: true, toggle: () => {} }
  }
}
