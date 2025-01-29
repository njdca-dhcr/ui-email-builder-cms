import React, { FC } from 'react'
import { Link, navigate } from 'gatsby'
import { BackArrowIcon } from 'src/ui'

interface Props {
  to: string
}

export const BackLink: FC<Props> = ({ to }) => {
  return (
    <Link to={to} className="back-link">
      <BackArrowIcon />
      <span className="back-link-text">Back</span>
    </Link>
  )
}
