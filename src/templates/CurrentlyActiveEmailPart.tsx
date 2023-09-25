import React, {
  FC,
  ReactEventHandler,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useState,
} from 'react'
import { buildComponentKey, buildSubComponentKey } from 'src/utils/emailPartKeys'

type CurrentlyActiveEmailPartContextType = [string, (value: string) => void]

const CurrentlyActiveEmailPartContext = createContext<CurrentlyActiveEmailPartContextType>([
  '',
  () => {},
])

export const CurrentlyActiveEmailPart: FC<{ children: ReactNode }> = ({ children }) => {
  const value = useState('')

  return (
    <CurrentlyActiveEmailPartContext.Provider value={value}>
      {children}
    </CurrentlyActiveEmailPartContext.Provider>
  )
}

export const useClearCurrentlyActiveEmailPart = (): (() => void) => {
  const [_currentlyActive, setCurrentlyActive] = useContext(CurrentlyActiveEmailPartContext)
  return useCallback(() => {
    setCurrentlyActive('')
  }, [setCurrentlyActive])
}

export const ClearCurrentlyActiveEmailPart: FC = () => {
  const clearCurrentlyActiveEmailPart = useClearCurrentlyActiveEmailPart()

  useLayoutEffect(() => {
    document.body.addEventListener('click', clearCurrentlyActiveEmailPart)
    return () => document.body.removeEventListener('click', clearCurrentlyActiveEmailPart)
  }, [clearCurrentlyActiveEmailPart])

  return null
}

export const useIsCurrentlyActiveEmailComponent = (
  id: string,
): { isActive: boolean; focus: ReactEventHandler<HTMLElement> } => {
  const [currentlyActive, setCurrentlyActive] = useContext(CurrentlyActiveEmailPartContext)
  const key = buildComponentKey(id)

  const isActive = currentlyActive === key
  const focus: ReactEventHandler<HTMLElement> = useCallback(
    (event) => {
      event.preventDefault()
      event.stopPropagation()
      setCurrentlyActive(key)
    },
    [key, setCurrentlyActive],
  )

  return { isActive, focus }
}

export const useIsCurrentlyActiveEmailSubComponent = (
  componentId: string,
  id: string,
): { isActive: boolean; focus: ReactEventHandler<HTMLElement> } => {
  const [currentlyActive, setCurrentlyActive] = useContext(CurrentlyActiveEmailPartContext)
  const key = buildSubComponentKey(componentId, id)

  const isActive = currentlyActive === key

  const focus: ReactEventHandler<HTMLElement> = useCallback(
    (event) => {
      event.preventDefault()
      event.stopPropagation()
      setCurrentlyActive(key)
    },
    [key, setCurrentlyActive],
  )

  return { isActive, focus }
}
