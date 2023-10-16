import React, { FC, useMemo } from 'react'
import { HeadFC } from 'gatsby'
import { SkipNavContent } from '@reach/skip-nav'
import { Heading, Layout, PageContent, Paragraph, Sidebar, SpacedContainer } from 'src/ui/Layout'
import { SidebarNavigation } from 'src/ui/SidebarNavigation'
import { EditableElement, EmailBlock } from 'src/ui'
import {
  useDisclaimerValue,
  styles as disclaimerStyles,
} from 'src/templates/EmailTemplateComponents/Disclaimer'

const SettingsPage: FC = () => {
  const [disclaimer, setDisclaimer] = useDisclaimerValue()
  const initialDisclaimer = useMemo(() => disclaimer, [])

  return (
    <Layout element="div">
      <Sidebar>
        <SidebarNavigation />
      </Sidebar>
      <SkipNavContent />
      <PageContent element="main">
        <SpacedContainer>
          <Heading element="h1">Settings</Heading>
          <Paragraph>Setup your state's disclaimer here. More coming soon.</Paragraph>
          <div>
            <Heading element="h2" subheading>
              Disclaimer
            </Heading>
            <Paragraph>
              Below every email, there is a disclaimer that is used for confidentiality purposes as
              well as security purposes.
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
          </div>
        </SpacedContainer>
      </PageContent>
    </Layout>
  )
}

export default SettingsPage

export const Head: HeadFC = () => <title>Settings</title>
