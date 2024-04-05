import React, { FC } from 'react'
import { MoreInfo } from 'src/ui/MoreInfo'
import { MoreInfoImage } from './Shared'
import dateRangeOriginalSentOnPng from './images/date-range-original-sent-on.png'
import dateRangeSimplePng from './images/date-range-simple.png'

export const MoreInfoAboutDateRange: FC = () => {
  const dateRange = <strong>Date Range</strong>
  return (
    <MoreInfo title="Date Range">
      <p>
        The {dateRange} can provide a timeframe for the relevance of the email. Prefer using names
        (even abbreviated ones) over numbers when representing months.
      </p>
      <MoreInfoImage
        alt={`A date range that reads "[December 1 - 21, 2023]"`}
        src={dateRangeSimplePng}
      />
      <p>
        Another good use of the {dateRange} is to reference previously sent versions of the email.
      </p>
      <MoreInfoImage
        alt={`A date range that reads "[Original email sent on January 5, 2024]"`}
        src={dateRangeOriginalSentOnPng}
      />
    </MoreInfo>
  )
}
