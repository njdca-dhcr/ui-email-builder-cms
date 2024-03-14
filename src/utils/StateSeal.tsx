import { StateAbbreviation } from 'src/utils/statesAndTerritories'

interface StateSeal {
  readonly darkModeImage?: string
  readonly image: string
  readonly state: StateAbbreviation
}

export const STATE_SEALS: ReadonlyArray<StateSeal> = [
  { state: 'AK', image: 'Alaska' },
  { state: 'AL', image: 'Alabama' },
  { state: 'AZ', image: 'Arizona' },
  { state: 'AR', image: 'Arkansas' },
  { state: 'CA', image: 'California' },
  { state: 'CO', image: 'Colorado' },
  { state: 'CT', image: 'Connecticut' },
  { state: 'DE', image: 'Delaware' },
  { state: 'DC', image: 'District-of-Columbia' },
  { state: 'FL', image: 'Florida' },
  { state: 'GA', image: 'Georgia' },
  { state: 'GU', image: 'Guam' },
  { state: 'HI', image: 'Hawaii' },
  { state: 'ID', image: 'Idaho' },
  { state: 'IL', image: 'Illinois' },
  { state: 'IN', image: 'Indiana' },
  { state: 'IA', image: 'Iowa' },
  { state: 'KS', image: 'Kansas' },
  { state: 'KY', image: 'Kentucky' },
  { state: 'LA', image: 'Louisiana' },
  { state: 'ME', image: 'Maine' },
  { state: 'MD', image: 'Maryland' },
  { state: 'MA', image: 'Massachusetts' },
  { state: 'MI', image: 'Michigan' },
  { state: 'MN', image: 'Minnesota' },
  { state: 'MS', image: 'Mississippi' },
  { state: 'MO', image: 'Missouri' },
  { state: 'MT', image: 'Montana' },
  { state: 'NE', image: 'Nebraska' },
  { state: 'NV', image: 'Nevada' },
  { state: 'NH', image: 'New-Hampshire' },
  { state: 'NJ', image: 'New-Jersey', darkModeImage: 'New-Jersey-White' },
  { state: 'NM', image: 'New-Mexico' },
  { state: 'NY', image: 'New-York' },
  { state: 'NC', image: 'North-Carolina' },
  { state: 'ND', image: 'North-Dakota' },
  { state: 'OH', image: 'Ohio' },
  { state: 'OK', image: 'Oklahoma' },
  { state: 'OR', image: 'Oregon' },
  { state: 'PA', image: 'Pennsylvania' },
  { state: 'PR', image: 'Puerto-Rico' },
  { state: 'RI', image: 'Rhode-Island' },
  { state: 'SC', image: 'South-Carolina' },
  { state: 'SD', image: 'South-Dakota' },
  { state: 'TN', image: 'Tennessee' },
  { state: 'TX', image: 'Texas' },
  { state: 'US', image: 'US-Seal' },
  { state: 'VI', image: 'US-Virgin-Islands' },
  { state: 'UT', image: 'Utah' },
  { state: 'VT', image: 'Vermont' },
  { state: 'VA', image: 'Virginia' },
  { state: 'WA', image: 'Washington' },
  { state: 'WV', image: 'West-Virginia' },
  { state: 'WI', image: 'Wisconsin' },
  { state: 'WY', image: 'Wyoming' },
]

export const stateSealFor = (stateId: StateAbbreviation): StateSeal | null => {
  return STATE_SEALS.find(({ state }) => state === stateId) ?? null
}
