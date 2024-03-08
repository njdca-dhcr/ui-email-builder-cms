import React from 'react'
import {
  buildUniqueEmailComponent,
  buildUniqueEmailConfig,
  buildUniqueEmailSubComponent,
} from 'src/testHelpers'
import { render } from '@testing-library/react'
import { faker } from '@faker-js/faker'
import { EmailPartsContent } from 'src/templates/EmailPartsContent'
import { EmailTemplateConfig } from 'src/templates/EmailTemplateConfig'
import { DirectiveValue } from 'src/appTypes'
import { DirectiveButton } from '../DirectiveButton'
import { ShouldShowEmailPart } from 'src/templates/ShouldShowEmailPart'

describe('DirectiveButton', () => {
  it('displays the directive button', () => {
    const emailSubComponent = buildUniqueEmailSubComponent('Header', { kind: 'DirectiveButton' })
    const directive = buildUniqueEmailSubComponent('Body', { kind: 'Directive' })
    const emailTemplateConfig = buildUniqueEmailConfig({
      components: [
        buildUniqueEmailComponent('Header', { subComponents: [emailSubComponent] }),
        buildUniqueEmailComponent('Body', { subComponents: [directive] }),
      ],
    })
    const directiveValue: Partial<DirectiveValue> = {
      buttonColor: 'rgb(223, 159, 4)',
      buttonLabel: faker.lorem.words(3),
      linkHref: faker.internet.url({ appendSlash: true }),
    }

    const { getByRole, baseElement } = render(
      <EmailTemplateConfig emailTemplateConfig={emailTemplateConfig}>
        <EmailPartsContent initialData={{ [directive.id]: directiveValue }}>
          <table>
            <tbody>
              <DirectiveButton emailSubComponent={emailSubComponent} />
            </tbody>
          </table>
        </EmailPartsContent>
      </EmailTemplateConfig>,
    )

    const link: HTMLAnchorElement = getByRole('link') as any
    expect(link).toHaveTextContent(directiveValue.buttonLabel!)
    expect(link.href).toEqual(directiveValue.linkHref)
    expect(link.style.color).toEqual('rgb(27, 27, 27)')
    const styledCell: HTMLElement | null = baseElement.querySelector('td[style]') as any
    expect(styledCell?.style.backgroundColor).toEqual(directiveValue.buttonColor)
  })

  it('does not render if the directive is not rendering', () => {
    const emailSubComponent = buildUniqueEmailSubComponent('Header', { kind: 'DirectiveButton' })
    const directive = buildUniqueEmailSubComponent('Body', { kind: 'Directive' })
    const emailTemplateConfig = buildUniqueEmailConfig({
      components: [
        buildUniqueEmailComponent('Header', { subComponents: [emailSubComponent] }),
        buildUniqueEmailComponent('Body', { subComponents: [directive] }),
      ],
    })

    const { queryByRole } = render(
      <EmailTemplateConfig emailTemplateConfig={emailTemplateConfig}>
        <ShouldShowEmailPart initialData={{ [directive.id]: false }}>
          <table>
            <tbody>
              <DirectiveButton emailSubComponent={emailSubComponent} />
            </tbody>
          </table>
        </ShouldShowEmailPart>
      </EmailTemplateConfig>,
    )
    expect(queryByRole('link')).toBeNull()
  })
})
