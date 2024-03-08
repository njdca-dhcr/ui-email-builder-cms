import {
  buildUniqueEmailComponent,
  buildUniqueEmailConfig,
  buildUniqueEmailSubComponent,
} from 'src/testHelpers'
import { getSubComponentByKind } from '../emailTemplateUtils'

describe('useEmailTemplateSubComponent', () => {
  it('is the sub component of the right kind in the email template config', () => {
    const directiveButton = buildUniqueEmailSubComponent('Header', { kind: 'DirectiveButton' })
    const directive = buildUniqueEmailSubComponent('Body', { kind: 'Directive' })

    const emailTemplateConfig = buildUniqueEmailConfig({
      components: [
        buildUniqueEmailComponent('Header', { subComponents: [directiveButton] }),
        buildUniqueEmailComponent('Body', { subComponents: [directive] }),
      ],
    })

    expect(getSubComponentByKind(emailTemplateConfig, 'DirectiveButton')).toEqual(directiveButton)
    expect(getSubComponentByKind(emailTemplateConfig, 'Directive')).toEqual(directive)
  })

  it('is null when the email template config lacks the subcomponent', () => {
    const emailTemplateConfig = buildUniqueEmailConfig()
    expect(getSubComponentByKind(emailTemplateConfig, 'DirectiveButton')).toBeNull()
    expect(getSubComponentByKind(emailTemplateConfig, 'Directive')).toBeNull()
  })
})
