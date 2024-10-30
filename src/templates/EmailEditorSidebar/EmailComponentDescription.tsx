import React, { FC } from 'react'
import { Link } from 'gatsby'
import { EmailTemplate } from 'src/appTypes'

interface Props {
  emailComponent: EmailTemplate.Base.Part<EmailTemplate.Kinds.Component>
}

export const EmailComponentDescription: FC<Props> = ({ emailComponent }) => {
  switch (emailComponent.kind) {
    case 'Name':
      return (
        <p className="description">
          Adding a name is highly encouraged. Avoid using "Dear" before the name
        </p>
      )
    case 'Banner':
    case 'StateSeal':
    case 'Disclaimer':
      return (
        <p className="description">
          Edit this in <Link to="/settings">Settings</Link>
        </p>
      )
    case 'Header':
    case 'Body':
    case 'Footer':
      return null
  }
}
