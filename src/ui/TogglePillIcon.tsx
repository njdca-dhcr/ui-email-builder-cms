import React, { FC } from 'react'

export const TogglePillIcon: FC = () => {
  return (
    <svg
      aria-hidden
      className="toggle-pill"
      xmlns="http://www.w3.org/2000/svg"
      width="38"
      height="22"
      fill="none"
    >
      <rect className="pill" width="36" height="20" x="1" y="1" fill="#E7EAEB" rx="10" />
      <rect className="pill-border" width="36" height="20" x="1" y="1" stroke="#617275" rx="10" />
    </svg>
  )
}
