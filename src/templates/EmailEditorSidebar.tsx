import React, { FC } from 'react'
import { Link } from 'gatsby'
import { SkipNavContent } from '@reach/skip-nav'
import { EmailTemplate } from 'src/appTypes'
import { BackArrowIcon } from 'src/ui/BackArrowIcon'
import { Sidebar } from 'src/ui/Layout'
import { EmailEditorHeadingAndSelect } from './EmailEditorHeadingAndSelect'
import {
  EmailEditorToggle,
  EmailEditorToggleSection,
  EmailEditorToggles,
} from './EmailEditorToggles'

interface Props {
  emailTemplate: EmailTemplate.Config
}

export const EmailEditorSidebar: FC<Props> = ({ emailTemplate }) => {
  return (
    <Sidebar>
      <Link to="/" className="back-link">
        <BackArrowIcon />
        <span className="back-link-text">Back to Home</span>
      </Link>
      <SkipNavContent />
      <EmailEditorHeadingAndSelect emailTemplate={emailTemplate} />
      <EmailEditorToggles>
        <EmailEditorToggleSection
          label="Banner"
          topLevelCanToggle
          onChange={() => {}}
          value={true}
        />
        <EmailEditorToggleSection label="Header" topLevelCanToggle onChange={() => {}} value={true}>
          <EmailEditorToggle label="Title" onChange={() => {}} value={true} disabled />
          <EmailEditorToggle label="Label" onChange={() => {}} value={true} />
          <EmailEditorToggle label="Button" onChange={() => {}} value={false} />
        </EmailEditorToggleSection>

        <EmailEditorToggleSection
          label="Name"
          description="Adding a name is highly encouraged"
          topLevelCanToggle
          onChange={() => {}}
          value={true}
        />

        <EmailEditorToggleSection label="Body" topLevelCanToggle={false}>
          <EmailEditorToggle label="Intro" onChange={() => {}} value={true} disabled />
          <EmailEditorToggle label="Status" onChange={() => {}} value={false} />
          <EmailEditorToggle label="Directive" onChange={() => {}} value={true} />
          <EmailEditorToggle label="Supplemental Content" onChange={() => {}} value={true} />
          <EmailEditorToggle label="Appeal/Rights/etc." onChange={() => {}} value={false} />
          <EmailEditorToggle label="Login" onChange={() => {}} value={false} />
        </EmailEditorToggleSection>
        <EmailEditorToggleSection label="Footer" topLevelCanToggle={false}>
          <EmailEditorToggle
            label="Additional Content"
            onChange={() => {}}
            value={false}
            disabled
          />
          <EmailEditorToggle label="State Seal" onChange={() => {}} value={true} disabled />
        </EmailEditorToggleSection>
      </EmailEditorToggles>
    </Sidebar>
  )
}
