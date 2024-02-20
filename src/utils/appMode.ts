import Config from '../../gatsby-config'

export const appMode = (): 'NJ' | 'ALL' => {
  return (Config.siteMetadata?.appMode as any) ?? 'NJ'
}

export const isNJMode = (): boolean => {
  return appMode() === 'NJ'
}
export const isAllStatesMode = (): boolean => {
  return appMode() === 'ALL'
}
