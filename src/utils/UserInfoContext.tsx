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
import { CurrentUser } from 'src/network/useCurrentUser'
import { useLocalStorageJSON } from './useLocalStorage'

const UserInfoContext = createContext<[CurrentUser, Dispatch<SetStateAction<CurrentUser>>]>([
  {},
  () => null,
])

const OriginalUserInfoContext = createContext<CurrentUser>({})

export const UserInfoProvider: FC<{ children: ReactNode; userInfo: CurrentUser }> = ({
  children,
  userInfo,
}) => {
  const value = useState<CurrentUser>(userInfo)

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
  key: keyof Omit<CurrentUser, 'role'>,
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
