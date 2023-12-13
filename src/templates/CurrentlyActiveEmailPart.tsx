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
import { EmailTemplate } from 'src/appTypes'

type CurrentlyActiveEmailPartContextType = [string, (value: string) => void]

export const CurrentlyActiveEmailPartContext = createContext<CurrentlyActiveEmailPartContextType>([
  '',
  () => {},
])

interface CurrentlyActiveEmailPartProps {
  children: ReactNode
  initiallyActiveEmailPartId?: string
}

export const CurrentlyActiveEmailPart: FC<CurrentlyActiveEmailPartProps> = ({
  children,
  initiallyActiveEmailPartId,
}) => {
  const value = useState(initiallyActiveEmailPartId ?? '')

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

export const useIsCurrentlyActiveEmailComponent = (
  emailComponent: EmailTemplate.UniqueComponent,
): {
  isActive: boolean
  isComponentActive: boolean
  isSubComponentActive: boolean
  activate: ReactEventHandler<HTMLOrSVGElement>
} => {
  const { isActive: isComponentActive, activate } = useIsCurrentlyActiveEmailPart(emailComponent.id)
  const [activeId] = useCurrentlyActiveEmailPartData()
  const subComponentIds = (emailComponent.subComponents ?? []).map(({ id }) => id)
  const isSubComponentActive = subComponentIds.includes(activeId)

  return {
    activate,
    isComponentActive,
    isSubComponentActive,
    isActive: isComponentActive || isSubComponentActive,
  }
}
