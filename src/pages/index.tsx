import React, { FC, ReactElement } from 'react'
import { Link, type HeadFC } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import { SkipNavContent } from '@reach/skip-nav'
import { VisuallyHidden } from '@reach/visually-hidden'
import { Heading, Layout, PageContent, Paragraph, Sidebar, SpacedContainer } from 'src/ui/Layout'
import { List } from 'src/ui/List'
import 'src/styles/app.css'
import './index.css'
import { SidebarNavigation } from 'src/ui/SidebarNavigation'

const IndexPage: FC = () => {
  return (
    <Layout element="div">
      <Sidebar>
        <SidebarNavigation />
      </Sidebar>
      <SkipNavContent />
      <PageContent element="main">
        <SpacedContainer>
          <VisuallyHidden>
            <h1>Email Builder (Beta)</h1>
          </VisuallyHidden>
          <section>
            <div className="heading-and-actions">
              <Heading element="h2">Start with a template</Heading>
              <div>
                <Link to="/library">See All Templates</Link>
              </div>
            </div>
            <Paragraph>
              You can edit and change everything—it just gives you a starting place.
            </Paragraph>
            <List className="index-list">
              <EmailTemplateListItem
                title="Waiver Application"
                description="Often used for campaigns, or general registration announcements."
                linkTo="/email-templates/waiver-application/"
                image={
                  <StaticImage
                    src="../images/overpayment-waiver-email.png"
                    alt=""
                    placeholder="blurred"
                  />
                }
              />
              <EmailTemplateListItem
                title="Status Update"
                description="Confirmations, updates, determinations, and any other status related messaging."
                linkTo="/email-templates/status-update/"
                image={
                  <StaticImage
                    src="../images/status-update-email.png"
                    alt=""
                    placeholder="blurred"
                  />
                }
              />
              <EmailTemplateListItem
                title="Status Update + 1, 2, 3, step"
                description="Confirmations, updates, determinations, and any other status related messaging."
                linkTo="/email-templates/status-update-1-2-3-step/"
                image={
                  <StaticImage
                    src="../images/status-update-email-with-steps.png"
                    alt=""
                    placeholder="blurred"
                  />
                }
              />
            </List>
          </section>
          <section className="index-or">--or--</section>
          <section>
            <Heading element="h2">Build your own email</Heading>
            <Paragraph>You know what you want so make it happen.</Paragraph>
            <Link to="/email-templates/build-from-scratch/" className="link-button">
              Build from scratch
            </Link>
          </section>
        </SpacedContainer>
      </PageContent>
    </Layout>
  )
}

interface EmailTemplateListItemProps {
  title: string
  description: string
  linkTo: string
  image: ReactElement
}

const EmailTemplateListItem: FC<EmailTemplateListItemProps> = ({
  title,
  description,
  linkTo,
  image,
}) => {
  return (
    <li className="index-list-item">
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="preview">
        <div className="image-container">{image}</div>
        <div className="mask" />
        <Link to={linkTo}>Get Started</Link>
      </div>
    </li>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Email Builder (Beta)</title>
