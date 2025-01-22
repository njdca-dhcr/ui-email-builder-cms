import React, { FC } from 'react'

export const UncheckedIcon: FC = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" aria-hidden>
      <g clipPath="url(#a)">
        <rect width="19" height="19" x="2.5" y="2.5" fill="#fff" stroke="#BBB" rx="6.535" />
        <path
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="m9 12 2 2 4-4"
        />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h24v24H0z" />
        </clipPath>
      </defs>
    </svg>
  )
}
