import Config from '../../gatsby-config'

export const backendUrl = (): string | null => {
  return (Config.siteMetadata?.backendUrl as any) ?? null
}

export const backendFlag = (): boolean => {
  return (Config.siteMetadata?.backendFlag as any) ?? false
}
