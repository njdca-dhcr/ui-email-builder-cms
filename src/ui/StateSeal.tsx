import React, { FC } from 'react'
import startCase from 'lodash.startcase'
import Config from '../../gatsby-config'

export type StateSealKey = keyof typeof StateSeals

interface StateSealProps {
  state: StateSealKey
}

export const StateSeal: FC<StateSealProps> = ({ state }) => {
  return (
    <img
      src={`${Config.siteMetadata?.siteUrl}/state-seals/${StateSeals[state]}.png`}
      alt={startCase(state.toString())}
    />
  )
}

export const StateSeals = {
  Alabama: 'Alabama',
  Alaska: 'Alaska',
  Arizona: 'Arizona',
  Arkansas: 'Arkansas',
  California: 'California',
  Colorado: 'Colorado',
  Connecticut: 'Connecticut',
  Delaware: 'Delaware',
  DistrictOfColumbia: 'District-of-Columbia',
  Florida: 'Florida',
  Georgia: 'Georgia',
  Guam: 'Guam',
  Hawaii: 'Hawaii',
  Idaho: 'Idaho',
  Illinois: 'Illinois',
  Iowa: 'Iowa',
  Indiana: 'Indiana',
  Kansas: 'Kansas',
  Kentucky: 'Kentucky',
  Louisiana: 'Louisiana',
  Maine: 'Maine',
  Maryland: 'Maryland',
  Massachusetts: 'Massachusetts',
  Michigan: 'Michigan',
  Minnesota: 'Minnesota',
  Mississippi: 'Mississippi',
  Missouri: 'Missouri',
  Montana: 'Montana',
  Nebraska: 'Nebraska',
  NewYork: 'New-York',
  NorthCarolina: 'North-Carolina',
  Nevada: 'Nevada',
  NewHampshire: 'New-Hampshire',
  NewJersey: 'New-Jersey',
  NewMexico: 'New-Mexico',
  NorthDakota: 'North-Dakota',
  Ohio: 'Ohio',
  Oklahoma: 'Oklahoma',
  Oregon: 'Oregon',
  Pennsylvania: 'Pennsylvania',
  PuertoRico: 'Puerto-Rico',
  RhodeIsland: 'Rhode-Island',
  SouthCarolina: 'South-Carolina',
  SouthDakota: 'South-Dakota',
  Tennessee: 'Tennessee',
  Texas: 'Texas',
  US: 'US-Seal',
  USVirginIslands: 'US-Virgin-Islands',
  Utah: 'Utah',
  Vermont: 'Vermont',
  Virginia: 'Virginia',
  Washington: 'Washington',
  WestVirginia: 'West-Virginia',
  Wisconsin: 'Wisconsin',
  Wyoming: 'Wyoming',
} as const
