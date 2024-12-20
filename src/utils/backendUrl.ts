import Config from '../../gatsby-config'

export const backendUrl = (): string | null => {
  return (Config.siteMetadata?.backendUrl as any) ?? null
}

export const cognitoSigninUrl = (): string | null => {
  return (Config.siteMetadata?.cognitoSigninUrl as any) ?? null
}

export const cognitoForgotPasswordUrl = (): string | null => {
  return (Config.siteMetadata?.cognitoForgotPasswordUrl as any) ?? null
}

export const htmlTranslationsCdnUrl = (): string | null => {
  return (Config.siteMetadata?.htmlTranslationsCdnUrl as any) ?? null
}
