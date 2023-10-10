import React from 'react'
import { Directive } from '../Directive'
import { render } from '@testing-library/react'
import { EmailTemplate } from 'src/appTypes'
import { faker } from '@faker-js/faker'
import {
  buildEmailTemplateSubComponent,
  emailPartWrapper,
  expectActiveEmailPartToBe,
  expectActiveEmailPartToNotBe,
  expectEmailPartContentFor,
} from 'src/testHelpers'
import { buildSubComponentKey } from 'src/utils/emailPartKeys'

describe('Directive', () => {
  let id: string
  let emailComponent: EmailTemplate.SubComponent<'Body'>

  it("contains a test", () => {
    expect(true).toBe(true)
  })
})
