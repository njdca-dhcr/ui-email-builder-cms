import { faker } from '@faker-js/faker'
import { UseMutationResult, UseQueryResult } from '@tanstack/react-query'
import {
  BannerValue,
  DepartmentSealValue,
  DisclaimerValue,
  EmailTemplate,
  StateSealValue,
  SUBCOMPONENTS,
} from './appTypes'
import uniqueId from 'lodash.uniqueid'
import sample from 'lodash.sample'
import { EmailTemplateIndex } from './network/emailTemplates'
import { StateAbbreviation } from './utils/statesAndTerritories'
import { DEPARTMENT_SEALS } from './utils/departmentSeals'
import { UsersIndex, UserShow } from './network/users'
import { GroupsIndex, GroupShow, GroupShowUser } from './network/groups'

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

export const buildEmailTemplateSubComponent = <K extends EmailTemplate.Kinds.SubComponent>(
  options: { kind: K } & Partial<EmailTemplate.Base.SubComponent<K>>,
): EmailTemplate.Base.SubComponent => {
  return {
    required: false,
    ...options,
  }
}

export const buildUniqueEmailSubComponent = <T extends EmailTemplate.Kinds.SubComponent>(
  options: { kind: T } & Partial<EmailTemplate.Unique.SubComponent<T>>,
): EmailTemplate.Unique.SubComponent<T> => {
  return {
    required: false,
    id: uniqueId(),
    ...options,
  }
}

export const buildEmailTemplateComponent = <T extends EmailTemplate.Kinds.Component>(
  kind: T,
  options?: Partial<EmailTemplate.Base.Component<T>>,
): EmailTemplate.Base.Component<T> => {
  return {
    kind,
    required: false,
    ...options,
  }
}

export const buildUniqueEmailComponent = <T extends EmailTemplate.Kinds.Component>(
  kind: T,
  options?: Partial<EmailTemplate.Unique.Component<T>>,
): EmailTemplate.Unique.Component<T> => {
  const { subComponents, ...emailComponent } = buildEmailTemplateComponent(kind, options)
  return {
    ...emailComponent,
    id: uniqueId(),
    ...options,
  }
}

export const buildEmailTemplateConfig = (
  options?: Partial<EmailTemplate.Base.Config>,
): EmailTemplate.Base.Config => {
  return {
    name: faker.lorem.word(),
    description: faker.lorem.paragraph(),
    components: [buildEmailTemplateComponent('Header'), buildEmailTemplateComponent('Footer')],
    ...options,
  }
}

export const buildUniqueEmailConfig = (
  options?: Partial<EmailTemplate.Unique.Config>,
): EmailTemplate.Unique.Config => {
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

const buildUser = (): UserShow => ({
  id: uniqueId(),
  email: faker.internet.email(),
  role: 'member',
})

export const buildTag = () => {
  return {
    id: uniqueId(),
    name: faker.lorem.word(),
  }
}

export const buildUserShow = (options?: Partial<UserShow>): UserShow => {
  return {
    ...buildUser(),
    ...options,
  }
}

export const buildUserIndex = (options?: Partial<UsersIndex>): UsersIndex => {
  return {
    ...buildUser(),
    ...options,
  }
}

export const buildGroupUserIndex = (options?: Partial<GroupShowUser>): GroupShowUser => {
  return {
    ...buildUser(),
    membershipId: uniqueId(),
    ...options,
  }
}

export const buildUserMembershipIndex = (options?: Partial<UsersIndex>): UsersIndex => {
  return {
    ...buildUser(),
    ...options,
  }
}

const buildGroup = (): GroupsIndex => ({
  id: uniqueId(),
  name: faker.lorem.words(3),
  description: faker.lorem.paragraph(),
})

export const buildGroupIndex = (options?: Partial<GroupsIndex>): GroupsIndex => {
  return {
    ...buildGroup(),
    ...options,
  }
}

export const buildGroupShow = (options?: Partial<GroupShow>): GroupShow => {
  return {
    ...buildGroup(),
    users: [],
    ...options,
  }
}

export const buildGroupMembershipIndex = (options?: Partial<GroupsIndex>): GroupsIndex => {
  return {
    ...buildGroup(),
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
