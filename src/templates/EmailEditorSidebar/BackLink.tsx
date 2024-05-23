import React, { FC } from 'react'
import { Link, navigate } from 'gatsby'
import { BackArrowIcon } from 'src/ui'

export const BackLink: FC = () => {
  return (
    <Link to="#" onClick={() => navigate(-1)} className="back-link">
      <BackArrowIcon />
      <span className="back-link-text">Back</span>
    </Link>
  )
}
