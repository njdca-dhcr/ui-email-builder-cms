import React, {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import isEqual from 'lodash.isequal'
import { z } from 'zod'
import { CurrentUserEmailConfig } from 'src/network/users'
import { useLocalStorageJSON } from './useLocalStorage'

const UserInfoContext = createContext<
  [CurrentUserEmailConfig, Dispatch<SetStateAction<CurrentUserEmailConfig>>]
>([{ id: '' }, () => null])

const OriginalUserInfoContext = createContext<CurrentUserEmailConfig>({ id: '' })

export const UserInfoProvider: FC<{ children: ReactNode; userInfo: CurrentUserEmailConfig }> = ({
  children,
  userInfo,
}) => {
  const value = useState<CurrentUserEmailConfig>(userInfo)

  return (
    <UserInfoContext.Provider value={value}>
      <OriginalUserInfoContext.Provider value={userInfo}>
        {children}
      </OriginalUserInfoContext.Provider>
    </UserInfoContext.Provider>
  )
}

export const useUserInfo = () => useContext(UserInfoContext)

export const useUserInfoValue = <T extends object>(
  key: keyof Omit<CurrentUserEmailConfig, 'id'>,
  defaultValue: T,
  schema?: z.ZodObject<any>,
): [T, (value: T) => void, { hasChanges: boolean }] => {
  const [userInfo, setUserInfo] = useUserInfo()
  const originalUserInfo = useContext(OriginalUserInfoContext)

  const [localValue, setLocalValue] = useLocalStorageJSON<T>(key, defaultValue, schema)

  const userInfoSpecificValue = userInfo[key]

  const value: T = useMemo(() => {
    return { ...localValue, ...userInfoSpecificValue }
  }, [localValue, userInfoSpecificValue])

  const setValue = useCallback(
    (value: T) => {
      setLocalValue(value)
      setUserInfo({ ...userInfo, [key]: value })
    },
    [userInfo, setUserInfo, setLocalValue],
  )

  const hasChanges = !isEqual(value, originalUserInfo[key])

  return [value, setValue, { hasChanges }]
}
