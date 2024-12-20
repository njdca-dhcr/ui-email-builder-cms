import { randomUUID } from 'crypto'
import { buildHtmlTranslationUrl } from '../buildHtmlTranslationUrl'
import { currentTimestamp } from '../currentTimestamp'
import { mockHtmlTranslationsCdnUrl } from 'src/testHelpers'
import { faker } from '@faker-js/faker'

describe('buildHtmlTranslationUrl', () => {
  it('builds a url based on the translation info', async () => {
    const cdnUrl = faker.internet.url({ appendSlash: false })
    mockHtmlTranslationsCdnUrl(cdnUrl)
    const emailTemplateId = randomUUID()
    const versionTimestamp = currentTimestamp()
    const userId = randomUUID()

    let result = buildHtmlTranslationUrl({
      emailTemplateId,
      versionTimestamp,
      userId,
      language: 'english',
    })

    expect(result).toEqual(
      `${cdnUrl}/${emailTemplateId}/${userId}/english/${versionTimestamp}.html`,
    )

    result = buildHtmlTranslationUrl({
      emailTemplateId,
      versionTimestamp,
      userId,
      language: 'spanish',
    })

    expect(result).toEqual(
      `${cdnUrl}/${emailTemplateId}/${userId}/spanish/${versionTimestamp}.html`,
    )
  })
})
