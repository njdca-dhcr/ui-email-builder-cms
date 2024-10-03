import { navigate } from 'gatsby'
import { useEffect } from 'react'
import { useAuth } from './AuthContext'

export const useRedirectIfNotSignedIn = () => {
  const [auth] = useAuth()

  useEffect(() => {
    if (!auth) {
      navigate('/')
    }
  }, [auth])
}
