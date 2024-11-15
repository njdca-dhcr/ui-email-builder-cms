import {
  buildEmailTranslation,
  buildUniqueEmailComponent,
  buildUniqueEmailSubComponent,
} from 'src/testHelpers'
import { getSubComponentByKind } from '../emailTemplateUtils'

describe('useEmailTemplateSubComponent', () => {
  it('is the sub component of the right kind in the email template config', () => {
    const directiveButton = buildUniqueEmailSubComponent({ kind: 'DirectiveButton' })
    const directive = buildUniqueEmailSubComponent({ kind: 'Directive' })

    const emailTranslation = buildEmailTranslation({
      components: [
        buildUniqueEmailComponent('Header', { subComponents: [directiveButton] }),
        buildUniqueEmailComponent('Body', { subComponents: [directive] }),
      ],
    })

    expect(getSubComponentByKind(emailTranslation, 'DirectiveButton')).toEqual(directiveButton)
    expect(getSubComponentByKind(emailTranslation, 'Directive')).toEqual(directive)
  })

  it('is null when the email template config lacks the subcomponent', () => {
    const emailTranslation = buildEmailTranslation({ components: [] })
    expect(getSubComponentByKind(emailTranslation, 'DirectiveButton')).toBeNull()
    expect(getSubComponentByKind(emailTranslation, 'Directive')).toBeNull()
  })
})
