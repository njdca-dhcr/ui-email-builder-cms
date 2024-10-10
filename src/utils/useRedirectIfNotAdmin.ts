import { useEffect } from 'react'
import { useCurrentRole } from './useCurrentRole'
import { navigate } from 'gatsby'

export const useRedirectIfNotAdmin = () => {
  const { isAdmin } = useCurrentRole()

  useEffect(() => {
    if (!isAdmin) {
      navigate('/')
    }
  }, [isAdmin])
}
