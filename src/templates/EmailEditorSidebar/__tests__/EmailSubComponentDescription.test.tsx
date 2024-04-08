import { render } from '@testing-library/react'
import React from 'react'
import { buildEmailTemplateSubComponent } from 'src/testHelpers'
import { EmailSubComponentDescription } from '../EmailSubComponentDescription'

describe('EmailSubComponentDescription', () => {
  describe('DateRange', () => {
    it('is a simple description', () => {
      const { baseElement, queryByRole } = render(
        <EmailSubComponentDescription
          emailSubComponent={buildEmailTemplateSubComponent('Header', { kind: 'DateRange' })}
        />,
      )
      const result = baseElement.querySelector('.description')
      expect(result).not.toBeNull()
      expect(result).toHaveTextContent(
        'Using names of months is preferred over numbers (i.e. Jan 5 is clearer than 01/05)',
      )
      expect(queryByRole('button', { name: 'More information about Date Range' })).not.toBeNull()
    })
  })

  describe('Title', () => {
    it('is a simple description', () => {
      const { baseElement } = render(
        <EmailSubComponentDescription
          emailSubComponent={buildEmailTemplateSubComponent('Header', { kind: 'Title' })}
        />,
      )
      const result = baseElement.querySelector('.description')
      expect(result).not.toBeNull()
      expect(result).toHaveTextContent('Keep this short and to the point!')
    })
  })

  describe('ProgramName', () => {
    it('is a simple description', () => {
      const { baseElement, queryByRole } = render(
        <EmailSubComponentDescription
          emailSubComponent={buildEmailTemplateSubComponent('Header', { kind: 'ProgramName' })}
        />,
      )
      const result = baseElement.querySelector('.description')
      expect(result).not.toBeNull()
      expect(result).toHaveTextContent('Let people know which program this email concerns')
      expect(queryByRole('button', { name: 'More information about Program Name' })).not.toBeNull()
    })
  })

  describe('DepartmentSeal', () => {
    it('is informs the user it can be edited on the Settings page', () => {
      const { baseElement } = render(
        <EmailSubComponentDescription
          emailSubComponent={buildEmailTemplateSubComponent('Header', { kind: 'DepartmentSeal' })}
        />,
      )
      const result = baseElement.querySelector('.description')
      expect(result).not.toBeNull()
      expect(result).toHaveTextContent('Edit this in Settings')
      expect(result?.querySelector('a[href="/settings"]'))
    })
  })

  describe('Intro', () => {
    it('is a simple description', () => {
      const { baseElement } = render(
        <EmailSubComponentDescription
          emailSubComponent={buildEmailTemplateSubComponent('Body', { kind: 'Intro' })}
        />,
      )
      const result = baseElement.querySelector('.description')
      expect(result).not.toBeNull()
      expect(result).toHaveTextContent(
        `Keep it simple and clear. Don't use filler language like "please"`,
      )
    })
  })

  describe('RulesRightsRegulations', () => {
    it('is a simple description', () => {
      const { baseElement } = render(
        <EmailSubComponentDescription
          emailSubComponent={buildEmailTemplateSubComponent('Body', {
            kind: 'RulesRightsRegulations',
          })}
        />,
      )
      const result = baseElement.querySelector('.description')
      expect(result).not.toBeNull()
      expect(result).toHaveTextContent('Rights? Regulations? Appeals? Reminders?')
    })
  })

  describe('Status', () => {
    it('is a simple description with a more info button', () => {
      const { baseElement, queryByRole } = render(
        <EmailSubComponentDescription
          emailSubComponent={buildEmailTemplateSubComponent('Body', { kind: 'Status' })}
        />,
      )
      const result = baseElement.querySelector('.description')
      expect(result).not.toBeNull()
      expect(result).toHaveTextContent('Make it obvious what the current state is')
      expect(queryByRole('button', { name: 'More information about Status' })).not.toBeNull()
    })
  })

  describe('SupplementalContent', () => {
    it('is a simple description', () => {
      const { baseElement } = render(
        <EmailSubComponentDescription
          emailSubComponent={buildEmailTemplateSubComponent('Body', {
            kind: 'SupplementalContent',
          })}
        />,
      )
      const result = baseElement.querySelector('.description')
      expect(result).not.toBeNull()
      expect(result).toHaveTextContent(
        "Add other resources that will help color the message you're sending",
      )
    })
  })

  describe('Directive', () => {
    it('is nothing', () => {
      const { baseElement } = render(
        <EmailSubComponentDescription
          emailSubComponent={buildEmailTemplateSubComponent('Body', { kind: 'Directive' })}
        />,
      )
      const result = baseElement.querySelector('.description')
      expect(result).toBeNull()
    })
  })

  describe('DirectiveButton', () => {
    it('is a simple description', () => {
      const { baseElement, queryByRole } = render(
        <EmailSubComponentDescription
          emailSubComponent={buildEmailTemplateSubComponent('Header', { kind: 'DirectiveButton' })}
        />,
      )
      const result = baseElement.querySelector('.description')
      expect(result).not.toBeNull()
      expect(result).toHaveTextContent(
        'This button is always the same as the one that appears in the Directive',
      )
      expect(
        queryByRole('button', { name: 'More information about Directive Button' }),
      ).not.toBeNull()
    })
  })

  describe('LoginDetails', () => {
    it('is a simple description', () => {
      const { baseElement } = render(
        <EmailSubComponentDescription
          emailSubComponent={buildEmailTemplateSubComponent('Body', {
            kind: 'LoginDetails',
          })}
        />,
      )
      const result = baseElement.querySelector('.description')
      expect(result).not.toBeNull()
      expect(result).toHaveTextContent('Just in case they need to reset their password')
    })
  })

  describe('InformationalBox', () => {
    it('is nothing', () => {
      const { baseElement } = render(
        <EmailSubComponentDescription
          emailSubComponent={buildEmailTemplateSubComponent('Body', { kind: 'InformationalBox' })}
        />,
      )
      const result = baseElement.querySelector('.description')
      expect(result).toBeNull()
    })
  })

  describe('AdditionalContent', () => {
    it('is a simple description', () => {
      const { baseElement, queryByRole } = render(
        <EmailSubComponentDescription
          emailSubComponent={buildEmailTemplateSubComponent('Body', {
            kind: 'AdditionalContent',
          })}
        />,
      )
      const result = baseElement.querySelector('.description')
      expect(result).not.toBeNull()
      expect(result).toHaveTextContent(
        'A great place to add links to find out more about programs and other state offerings. Do not use "click here"!',
      )
      expect(
        queryByRole('button', { name: 'More information about Additional Content' }),
      ).not.toBeNull()
    })
  })
})
