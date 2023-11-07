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

export const useCurrentlyActiveEmailPartData = () => useContext(CurrentlyActiveEmailPartContext)

export const useClearCurrentlyActiveEmailPart = (): (() => void) => {
  const [_currentlyActive, setCurrentlyActive] = useCurrentlyActiveEmailPartData()
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

export const useIsCurrentlyActiveEmailPart = (
  id: string,
): { isActive: boolean; activate: ReactEventHandler<HTMLOrSVGElement> } => {
  const [currentlyActive, setCurrentlyActive] = useCurrentlyActiveEmailPartData()

  const isActive = currentlyActive === id
  const activate: ReactEventHandler<HTMLOrSVGElement> = useCallback(
    (event) => {
      event.preventDefault()
      event.stopPropagation()
      setCurrentlyActive(id)
    },
    [id, setCurrentlyActive],
  )

  return { isActive, activate }
}
