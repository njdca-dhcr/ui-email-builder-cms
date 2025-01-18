export * from './EmailParts'
export * from './EmailTemplate'
export * from './EmailTemplateValues'
export * from './EmailTranslation'
export * from './Languages'

export const USER_ROLES = ['admin', 'member'] as const
export type UserRole = (typeof USER_ROLES)[number]
