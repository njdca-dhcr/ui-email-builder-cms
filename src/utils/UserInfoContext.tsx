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
import { UserShow } from 'src/network/useUser'
import { useLocalStorageJSON } from './useLocalStorage'

const UserInfoContext = createContext<[UserShow, Dispatch<SetStateAction<UserShow>>]>([
  {},
  () => null,
])

const OriginalUserInfoContext = createContext<UserShow>({})

export const UserInfoProvider: FC<{ children: ReactNode; userInfo: UserShow }> = ({
  children,
  userInfo,
}) => {
  const value = useState<UserShow>(userInfo)

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
  key: keyof UserShow,
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
