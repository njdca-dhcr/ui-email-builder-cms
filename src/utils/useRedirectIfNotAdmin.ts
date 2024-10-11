import { useEffect } from 'react'
import { useCurrentRole } from './useCurrentRole'
import { navigate } from 'gatsby'

export const useRedirectIfNotAdmin = () => {
  const { isAdmin, isLoading } = useCurrentRole()

  useEffect(() => {
    if (!isAdmin && !isLoading) {
      navigate('/')
    }
  }, [isAdmin, isLoading])
}
