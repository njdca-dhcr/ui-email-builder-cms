import React, { FC, ReactElement, useEffect, useState } from 'react'
import { Link, type HeadFC } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import {
  Heading,
  Layout,
  List,
  PageContent,
  Paragraph,
  Sidebar,
  SidebarNavigation,
  SkipNavContent,
  SpacedContainer,
} from 'src/ui'
import { formatPageTitle } from 'src/utils/formatPageTitle'
import { isRestricted } from 'src/utils/appMode'
import { useRedirectIfNotSignedIn } from 'src/utils/useRedirectIfNotSignedIn'
import {
  AnimatePresence,
  motion,
  useAnimate,
  useInstantTransition,
  usePresence,
} from 'motion/react'
import 'src/styles/app.css'
import './dashboard.css'

const Dummy = () => {
  const [isPresent, safeToRemove] = usePresence()
  const [scope, animate] = useAnimate()

  useEffect(() => {
    if (isPresent) {
      const enterAnimation = async () => {
        await animate(scope.current, { opacity: 1 })
        await animate('div', { opacity: 1, x: 0 })
      }
      enterAnimation()
    } else {
      const exitAnimation = async () => {
        await animate('div', { opacity: 0, x: -100 })
        await animate(scope.current, { opacity: 0 })
        safeToRemove()
      }

      exitAnimation()
    }
  }, [isPresent])

  return (
    <div ref={scope}>
      <div
        // animate={{ rotate: 360, translateX: 400, transition: { delay: 0.2, duration: 2 } }}
        style={{
          backgroundColor: 'lightblue',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: 100,
          height: 100,
          borderRadius: '50%',
          opacity: 0,
        }}
      >
        hello
      </div>
    </div>
  )
}

const DashboardPage: FC = () => {
  useRedirectIfNotSignedIn()
  const [show, setShow] = useState(false)

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

          <AnimatePresence>
            <button onClick={() => setShow(!show)}>{show ? 'hide' : 'show'}</button>
            {show ? <Dummy key="foo" /> : null}
          </AnimatePresence>
          <section className="home-page-section">
            <Heading element="h2">Create from scratch</Heading>
            <Paragraph>Build custom emails that you are ready to test/deploy</Paragraph>
            <List className="index-create-from-scratch-list">
              <CreateFromScratchListItem
                label="Blank Slate"
                description="Start with nothing in the email and add on the elements you need"
                linkTo="/email-templates/blank-slate/"
              />
              {!isRestricted() && (
                <CreateFromScratchListItem
                  label="Everything Bagel"
                  description="Start with all the options added and take away what you don’t want"
                  linkTo="/email-templates/everything-bagel/"
                />
              )}
            </List>
          </section>
          <section className="index-or">--or--</section>
          <section className="home-page-section">
            <div className="heading-and-actions">
              <Heading element="h2">Use a template</Heading>
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
        </SpacedContainer>
      </PageContent>
    </Layout>
  )
}

interface CreateFromScratchListItemProps {
  label: string
  description: string
  linkTo: string
}

const CreateFromScratchListItem: FC<CreateFromScratchListItemProps> = ({
  label,
  description,
  linkTo,
}) => {
  return (
    <li className="index-list-item create-from-scratch-list-item">
      <h3>
        <Link to={linkTo}>{label}</Link>
      </h3>
      <p>{description}</p>
      <Link to={linkTo} className="link-button">
        Get Started
      </Link>
    </li>
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
      <h3>
        <Link to={linkTo}>{title}</Link>
      </h3>
      <p>{description}</p>
      <div className="preview">
        <div className="image-container">{image}</div>
        <div className="mask" />
        <Link to={linkTo}>Get Started</Link>
      </div>
    </li>
  )
}

export default DashboardPage

export const Head: HeadFC = () => <title>{formatPageTitle('Home')}</title>
