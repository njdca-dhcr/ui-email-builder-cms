import React, { FC, ReactNode } from 'react'
import { HeadFC } from 'gatsby'
import {
  Heading,
  Layout,
  PageContent,
  Paragraph,
  Sidebar,
  SidebarNavigation,
  SkipNavContent,
  SpacedContainer,
  UswdsIcon,
  UswdsIconVariantKey,
} from 'src/ui'
import { formatPageTitle } from 'src/utils/formatPageTitle'
import settingsPagePng from 'src/images/tips-and-tricks/settings-page.png'
import libraryPagePng from 'src/images/tips-and-tricks/library-page.png'
import emailEditingPageSidebarArrowsPng from 'src/images/tips-and-tricks/email-editing-page-sidebar-arrows.png'
import sidebarControlsCloseUpPng from 'src/images/tips-and-tricks/sidebar-controls-close-up.png'
import emailEditingPagePreviewTextPng from 'src/images/tips-and-tricks/email-editing-page-preview-text.png'
import emailEditingPagePreviewControlsPng from 'src/images/tips-and-tricks/email-editing-page-preview-controls.png'
import emailEditingPagePng from 'src/images/tips-and-tricks/email-editing-page-base.png'
import richTextEditingPng from 'src/images/tips-and-tricks/rich-text-editing.png'
import './tips-and-tricks.css'

const TipsAndTricksPage: FC = () => {
  return (
    <Layout element="div">
      <Sidebar>
        <SidebarNavigation />
      </Sidebar>
      <SkipNavContent />
      <PageContent element="main" className="tips-and-tricks">
        <SpacedContainer>
          <Heading element="h1">Tips & Tricks</Heading>
          <Paragraph>Check'em out</Paragraph>

          <nav aria-labelledby="contents">
            <h2 id="contents">Contents</h2>
            <ol>
              <li>
                <InternalLink to="#before-you-begin">
                  <Icon icon="Directions" /> Before you begin
                </InternalLink>
                <ol>
                  <li>
                    <InternalLink to="#configure-settings">
                      <Icon icon="Settings" /> Configure Settings
                    </InternalLink>
                  </li>
                  <li>
                    <InternalLink to="#not-seeing-settings-changes">
                      <Icon icon="Report" /> Not seeing changes from settings?
                    </InternalLink>
                  </li>
                </ol>
              </li>
              <li>
                <InternalLink to="#selecting-a-template">
                  <Icon icon="LocalLibrary" /> Selecting a Template
                </InternalLink>
              </li>
              <li>
                <InternalLink to="#editing-an-email-template">
                  <Icon icon="Edit" /> Editing an Email Template
                </InternalLink>
                <ol>
                  <li>
                    <InternalLink to="#sidebar-controls">
                      <Icon icon="SupportAgent" /> Sidebar Controls
                    </InternalLink>
                  </li>
                  <li>
                    <InternalLink to="#preview-text">
                      <Icon icon="Chat" /> Preview Text
                    </InternalLink>
                  </li>
                  <li>
                    <InternalLink to="#email-preview-controls">
                      <Icon icon="ToggleOff" /> Email Preview Controls
                    </InternalLink>
                  </li>
                  <li>
                    <InternalLink to="#email-preview-editing">
                      <Icon icon="ToggleOn" /> Email Preview Editing
                    </InternalLink>
                    <ol>
                      <li>
                        <InternalLink to="#accessibility">
                          <Icon icon="AccessibleForward" /> Accessibility
                        </InternalLink>
                      </li>
                    </ol>
                  </li>
                </ol>
              </li>
              <li>
                <InternalLink to="#exporting-your-email">
                  <Icon icon="Share" /> Exporting Your Email
                </InternalLink>
                <ol>
                  <li>
                    <InternalLink to="#copying-the-html">
                      <Icon icon="ContentCopy" /> Copying the HTML
                    </InternalLink>
                  </li>
                  <li>
                    <InternalLink to="#downloading-the-html">
                      <Icon icon="FileDownload" /> Downloading the HTML
                    </InternalLink>
                  </li>
                </ol>
              </li>
            </ol>
          </nav>

          <section>
            <h2 id="before-you-begin">
              <Icon icon="Directions" /> Before you begin
            </h2>
            <h3 id="configure-settings">
              <Icon icon="Settings" /> Configure Settings
            </h3>
            <p>
              Make sure you visit the <SettingsPageLink /> and set up the Banner, Department Seal,
              State Seal, and Disclaimer. Leaving the editing page will reset the email you're
              working on! (For now)
            </p>
            <Illustration
              src={settingsPagePng}
              alt="The settings page of the Email builder, featuring the banner and department seal configuration options above the fold"
            />
            <h3 id="not-seeing-settings-changes">
              <Icon icon="Report" /> Not seeing changes from settings?
            </h3>
            <p>
              If you already configured the settings to your liking but you're not seeing those
              changes on the email editing page you either
            </p>
            <ul>
              <li>Cleared your cookies</li>
              <li>
                Are using a different browser or computer than the one you changed the settings on
              </li>
              <li>Or are in an incognito window</li>
            </ul>
          </section>

          <section>
            <h2 id="selecting-a-template">
              <Icon icon="LocalLibrary" /> Selecting a Template
            </h2>
            <p>
              Visit the{' '}
              <InternalLink to="/library">
                <Icon icon="FolderOpen" /> Library page
              </InternalLink>{' '}
              to see all of the available email templates. You can even filter the list if you know
              what kind of email you're looking for. Try narrowing the list down with "DUA" or
              "Certification".
            </p>
            <p>
              If you require more flexibility, try selecting the "Blank Slate" or "Everything Bagel"
              templates to build your email up from scratch.
            </p>
            <Illustration
              src={libraryPagePng}
              alt="The library page of the Email builder, featuring a variety of templates and a filter"
            />
          </section>

          <section>
            <h2 id="editing-an-email-template">
              <Icon icon="Edit" /> Editing an Email Template
            </h2>
            <p>
              Selecting an email template will bring you to a page that is similar to the following.
            </p>
            <Illustration
              src={emailEditingPagePng}
              alt="The email editing page of an email concerning DUA eligibility"
            />
            <p>It's divided into several parts:</p>
            <ul>
              <li>
                <InternalLink to="#sidebar-controls">
                  <Icon icon="SupportAgent" /> Sidebar Controls
                </InternalLink>
              </li>
              <li>
                <InternalLink to="#preview-text">
                  <Icon icon="Chat" /> Preview Text
                </InternalLink>
              </li>
              <li>
                <InternalLink to="#email-preview-controls">
                  <Icon icon="ToggleOff" /> Email Preview Controls
                </InternalLink>
              </li>
              <li>
                <InternalLink to="#email-preview-editing">
                  <Icon icon="ToggleOn" /> Email Preview
                </InternalLink>
              </li>
            </ul>
            <h3 id="sidebar-controls">
              <Icon icon="SupportAgent" /> Sidebar Controls
            </h3>
            <p>
              The <strong>Sidebar Controls</strong> on the left side of the email editing page allow
              you to toggle different parts or the email on and off (via <Icon icon="Visibility" />{' '}
              and <Icon icon="VisibilityOff" />) and provide specifications for how you want that
              part of the email to look.
            </p>
            <Illustration
              src={emailEditingPageSidebarArrowsPng}
              alt="The email editing page with three New Jersey blue arrows pointing at the sidebar"
            />
            <p>
              For example, in the <strong>Supplemental Content</strong> controls you can select{' '}
              <strong>"Single"</strong> (one title, one paragraph), <strong>"Double"</strong> (two
              titles, two paragraphs), <strong>"Triple"</strong> (three titles, three paragraphs),
              or <strong>"Benefit Amount"</strong> (one title, one paragraph, and an informational
              box) depending on how much content the current email requires.
            </p>
            <Illustration
              src={sidebarControlsCloseUpPng}
              alt="A close up of the sidebar controls for Directive, Supplemental Content, and Informational Box"
            />
            <p>
              Additionally, keep an eye out for the information icons <Icon icon="InfoOutline" /> to
              get more information about a specific part of the email and what it's meant for.
            </p>

            <h3 id="preview-text">
              <Icon icon="Chat" /> Preview Text
            </h3>
            <p>
              Located above the <strong>Email Preview</strong> on the email editing page, the{' '}
              <strong>Preview Text</strong> determines what recipients of the email see in their
              inbox <em>before</em> they open the email. It should be short and descriptive in order
              to get people to open the email.
            </p>
            <p>
              <strong>Note:</strong> this information won't be displayed in the email once the
              recipient has opened it. It is only ever visible in people's inbox.
            </p>
            <Illustration
              src={emailEditingPagePreviewTextPng}
              alt="The email editing page with a New Jersey Blue arrow pointing at the preview text area"
            />
            <h3 id="email-preview-controls">
              <Icon icon="ToggleOff" /> Email Preview Controls
            </h3>
            <p>
              In between the <strong>Email Preview</strong> and <strong>Preview Text</strong> on the
              email editing page are the <strong>Email Preview Controls</strong>.
            </p>
            <Illustration
              src={emailEditingPagePreviewControlsPng}
              alt="The email editing page with a New Jersey Blue arrow pointing at the preview controls"
            />
            <p>
              By default, "Desktop" will be selected and the <strong>Email Preview</strong> will be
              styled as it will appear on a laptop, desktop, or tablet. Select "Mobile" to seed what
              the email will look like on a phone.
            </p>

            <p>
              <strong>Note:</strong> the email may look slightly different when sent and viewed in
              an actual email client (Gmail, Outlook, etc.) since different email clients support
              different levels of styling content. For example, some won't support the font while
              others may style links slightly differently.
            </p>

            <p>
              As for the "Copy HTML" and "Download HTML" buttons, we'll discuss those in the{' '}
              <InternalLink to="#exporting-your-email">
                <Icon icon="Share" /> Exporting Your Email
              </InternalLink>{' '}
              section of this page.
            </p>

            <h3 id="email-preview-editing">
              <Icon icon="ToggleOn" /> Email Preview Editing
            </h3>
            <p>
              While the <strong>Sidebar Controls</strong> can toggle or tweak the content of your
              email, the <strong>Email Preview</strong> is where you'll do most of your editing.
              Simply click on the text you'd like to change to start editing!
            </p>
            <p>
              Often times when you're editing a rich text editor toolbar will appear. You can click
              on the buttons in the toolbar to adjust the text (bold, italics, underline), add
              numbered or bulleted lists, and add links. There are even keyboard shortcuts for some
              of these, like cmd + b on Mac or ctrl + b on Windows to bold or unbold text.
            </p>
            <Illustration
              src={richTextEditingPng}
              alt="A close up of editing rich text on the email editing page"
            />
            <p>
              <strong>Note:</strong> some text cannot be changed through the{' '}
              <strong>Email Preview</strong>, like the <strong>Disclaimer</strong>. These can only
              be edited on the <SettingsPageLink />.
            </p>

            <h4 id="accessibility">
              <Icon icon="AccessibleForward" /> Accessibility
            </h4>
            <p>
              Avoid using links that say "click here" or just "here" as{' '}
              <ExternalLink to="https://usability.yale.edu/web-accessibility/articles/links#link-text">
                they can damage the overall accessibility of your email
              </ExternalLink>
              .
            </p>
          </section>

          <section>
            <h2 id="exporting-your-email">
              <Icon icon="Share" /> Exporting Your Email
            </h2>
            <p>
              Once you're done writing and editing your email you can retrieve its markup through
              the buttons above the <strong>Email Preview</strong>. This markup will be in the form
              of an{' '}
              <ExternalLink to="https://developer.mozilla.org/en-US/docs/Web/HTML">
                HTML document
              </ExternalLink>{' '}
              that you can add to an email service like AWS Pinpoint.
            </p>
            <h3 id="copying-the-html">
              <Icon icon="ContentCopy" /> Copying the HTML
            </h3>
            <p>
              Clicking the "Copy HTML" button will put the full HTML document of your email into
              your computer's pasteboard, allowing you to paste it into any file or website you
              want.
            </p>
            <h3 id="downloading-the-html">
              <Icon icon="FileDownload" /> Downloading the HTML
            </h3>
            <p>
              Clicking the "Download HTML" button will download an HTML document of your email to
              your computer. You can upload this to another service, open it in a text editor to see
              the markup, or open the file with your browser to see a more accurate preview of the
              email.
            </p>
          </section>
        </SpacedContainer>
      </PageContent>
    </Layout>
  )
}

const ExternalLink: FC<{ children: ReactNode; to: string }> = ({ children, to }) => {
  return (
    <a href={to} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  )
}

const InternalLink: FC<{ children: ReactNode; to: string }> = ({ children, to }) => {
  return <a href={to}>{children}</a>
}

const Icon: FC<{ icon: UswdsIconVariantKey }> = ({ icon }) => {
  return (
    <span className="icon">
      <UswdsIcon icon={icon} />
    </span>
  )
}

const SettingsPageLink: FC = () => {
  return (
    <InternalLink to="/settings">
      <Icon icon="Settings" /> Settings page
    </InternalLink>
  )
}

const Illustration: FC<{ src: string; alt: string }> = ({ src, alt }) => {
  return <img className="illustration" src={src} alt={alt} />
}

export default TipsAndTricksPage

export const Head: HeadFC = () => <title>{formatPageTitle('Tips & Tricks')}</title>
