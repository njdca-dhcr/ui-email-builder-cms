import { faker } from '@faker-js/faker'
import { UseMutationResult, UseQueryResult } from '@tanstack/react-query'
import {
  BannerValue,
  DepartmentSealValue,
  DisclaimerValue,
  EmailTemplate,
  EmailTemplateComponentsMapping,
  StateSealValue,
} from './appTypes'
import uniqueId from 'lodash.uniqueid'
import sample from 'lodash.sample'
import { EmailTemplateIndex } from './network/useEmailTemplates'
import { StateAbbreviation } from './utils/statesAndTerritories'
import { DEPARTMENT_SEALS } from './utils/departmentSeals'
import { UsersIndex } from './network/useUsers'
import { UserShow } from './network/useUser'
import { GroupsIndex, GroupShow } from './network/groups'

export const randomObject = () => {
  return { [faker.lorem.word()]: faker.lorem.words(3) }
}

export const randomBannerValue = (): BannerValue => {
  return {
    primaryLink: faker.internet.url(),
    primaryText: faker.lorem.words(3),
    backgroundColor: faker.color.rgb(),
    secondaryLink: faker.internet.url(),
  }
}

export const randomDepartmentSealValue = (): DepartmentSealValue => {
  return {
    seal: sample(DEPARTMENT_SEALS)!.imageName,
  }
}

export const randomStateSealValue = (): StateSealValue => {
  return {
    stateAbbreviation: sample(['AK', 'CA', 'NJ', 'NY']) as StateAbbreviation,
    additionalDisclaimer: faker.lorem.paragraph(),
  }
}

export const randomDisclaimerValue = (text?: string): DisclaimerValue => {
  return {
    content: [{ type: 'paragraph', children: [{ text: text ?? faker.lorem.paragraph() }] }],
  }
}

export const buildEmailTemplateSubComponent = <T extends EmailTemplate.ComponentKind>(
  component: T,
  options?: Partial<EmailTemplate.SubComponent<T, any>>,
): EmailTemplate.SubComponent<T, any> => {
  const possibleSubComponents = EmailTemplateComponentsMapping[component]

  if (possibleSubComponents.length === 0) {
    throw new Error(`Component ${component} does not have SubComponents`)
  }

  return {
    kind: sample(possibleSubComponents)!,
    required: false,
    visibleByDefault: true,
    ...options,
  }
}

export const buildUniqueEmailSubComponent = <
  T extends EmailTemplate.ComponentKind,
  K extends EmailTemplate.SubComponentKind<T>,
>(
  component: T,
  options?: Partial<EmailTemplate.UniqueSubComponent<T, K>>,
): EmailTemplate.UniqueSubComponent<T, K> => {
  return {
    ...buildEmailTemplateSubComponent(component, options),
    id: uniqueId(),
    ...options,
  }
}

export const buildEmailTemplateComponent = <T extends EmailTemplate.ComponentKind>(
  kind: T,
  options?: Partial<EmailTemplate.Component<T>>,
): EmailTemplate.Component<T> => {
  return {
    kind,
    required: false,
    visibleByDefault: true,
    ...options,
  }
}

export const buildUniqueEmailComponent = <T extends EmailTemplate.ComponentKind>(
  kind: T,
  options?: Partial<EmailTemplate.UniqueComponent<T>>,
): EmailTemplate.UniqueComponent<T> => {
  const { subComponents, ...emailComponent } = buildEmailTemplateComponent(kind, options)
  return {
    ...emailComponent,
    id: uniqueId(),
    ...options,
  }
}

export const buildEmailTemplateConfig = (
  options?: Partial<EmailTemplate.Config>,
): EmailTemplate.Config => {
  return {
    name: faker.lorem.word(),
    description: faker.lorem.paragraph(),
    components: [buildEmailTemplateComponent('Header'), buildEmailTemplateComponent('Footer')],
    ...options,
  }
}

export const buildUniqueEmailConfig = (
  options?: Partial<EmailTemplate.UniqueConfig>,
): EmailTemplate.UniqueConfig => {
  return {
    name: faker.lorem.word(),
    description: faker.lorem.paragraph(),
    components: [buildUniqueEmailComponent('Header'), buildUniqueEmailComponent('Footer')],
    ...options,
  }
}

export const buildEmailTemplateIndex = (
  options?: Partial<EmailTemplateIndex>,
): EmailTemplateIndex => {
  return {
    id: uniqueId(),
    userId: uniqueId(),
    name: faker.lorem.words(3),
    description: faker.lorem.sentence(),
    ...options,
  }
}

export const buildUserIndex = (options?: Partial<UsersIndex>): UsersIndex => {
  return {
    id: uniqueId(),
    email: faker.internet.email(),
    role: 'member',
    ...options,
  }
}

export const buildUserShow = (options?: Partial<UserShow>): UserShow => {
  return {
    id: uniqueId(),
    email: faker.internet.email(),
    role: 'member',
    ...options,
  }
}

export const buildGroupIndex = (options?: Partial<GroupsIndex>): GroupsIndex => {
  return {
    id: uniqueId(),
    name: faker.lorem.words(3),
    description: faker.lorem.paragraph(),
    ...options,
  }
}

interface Membership {
  id: string
  userId: string
  groupId: string
}

export const buildMembershipShow = (options?: Partial<Membership>): Membership => {
  return {
    id: uniqueId(),
    groupId: uniqueId(),
    userId: uniqueId(),
    ...options,
  }
}

export const buildGroupShow = (options?: Partial<GroupShow>): GroupShow => {
  return {
    id: uniqueId(),
    name: faker.lorem.words(3),
    description: faker.lorem.paragraph(),
    users: [],
    ...options,
  }
}

export const buildUseQueryResult = <T extends any>(
  options?: Partial<UseQueryResult<T>>,
): UseQueryResult<T> => {
  return {
    data: undefined as any,
    dataUpdatedAt: 0,
    error: null as any,
    errorUpdateCount: 0,
    errorUpdatedAt: 0,
    failureCount: 0,
    failureReason: null,
    fetchStatus: 'fetching',
    isError: false as any,
    isFetched: true,
    isFetchedAfterMount: true,
    isFetching: false,
    isInitialLoading: false,
    isLoading: false as any,
    isLoadingError: false as any,
    isPaused: false,
    isPending: false as any,
    isPlaceholderData: false,
    isRefetchError: false as any,
    isRefetching: false,
    isStale: false,
    isSuccess: true as any,
    refetch: jest.fn(),
    status: 'success',
    promise: new Promise(() => {}),
    ...options,
  }
}

export const buildUseMutationResult = <
  T extends UseMutationResult<D, E, V, C>,
  D = any,
  E = any,
  V = any,
  C = any,
>(
  options?: Partial<T>,
): T => {
  return {
    status: 'idle',
    data: undefined,
    variables: undefined,
    error: null,
    isError: false,
    isIdle: true,
    isPaused: false,
    isPending: false,
    isSuccess: false,
    mutate: jest.fn(),
    mutateAsync: jest.fn(),
    reset: jest.fn(),
    context: undefined,
    failureCount: 0,
    failureReason: null,
    submittedAt: 0,
    ...options,
  } as any
}
